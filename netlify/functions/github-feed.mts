// Live GitHub feed for the portfolio: recent public activity, repositories
// and articles (Markdown files stored in the `articles/` folder of the repo).
// Responses are cached briefly on the CDN so new commits / articles show up
// within a few minutes without hitting GitHub's rate limits.

const GITHUB_USER = "oscarnkfutu";
const ARTICLES_REPO = "oscarnkfutu/Oscar-NKFUTU-MAKANGA";
const ARTICLES_DIR = "articles";

type Article = {
  slug: string;
  title: string;
  date: string | null;
  summary: string;
  tags: string[];
  url: string;
};

export default async (req: Request) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get("article");

  try {
    if (slug) {
      const article = await getArticle(slug);
      if (!article) return json({ error: "Article introuvable" }, 404);
      return json(article);
    }

    const [events, repos, articles] = await Promise.all([
      getEvents().catch(() => []),
      getRepos().catch(() => []),
      getArticles().catch(() => []),
    ]);

    return json({ updatedAt: new Date().toISOString(), events, repos, articles });
  } catch (error) {
    console.error(error);
    return json({ error: "Impossible de joindre GitHub" }, 502, false);
  }
};

export const config = {
  path: "/api/github",
};

function json(body: unknown, status = 200, cache = true) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate",
  };
  if (cache) {
    headers["Netlify-CDN-Cache-Control"] =
      "public, durable, max-age=120, stale-while-revalidate=600";
  }
  return new Response(JSON.stringify(body), { status, headers });
}

async function gh(path: string, accept = "application/vnd.github+json") {
  const headers: Record<string, string> = {
    Accept: accept,
    "User-Agent": "nkfutu-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub ${res.status} on ${path}`);
  return accept.includes("raw") ? res.text() : res.json();
}

async function getEvents() {
  const data = (await gh(`/users/${GITHUB_USER}/events/public?per_page=30`)) ?? [];
  return data.slice(0, 15).map((e: any) => ({
    id: e.id,
    type: e.type,
    repo: e.repo?.name,
    repoUrl: `https://github.com/${e.repo?.name}`,
    createdAt: e.created_at,
    description: describeEvent(e),
  }));
}

function describeEvent(e: any): string {
  const p = e.payload ?? {};
  switch (e.type) {
    case "PushEvent": {
      const n = p.size ?? p.commits?.length ?? 1;
      const msg = p.commits?.[p.commits.length - 1]?.message?.split("\n")[0];
      const branch = (p.ref ?? "").replace("refs/heads/", "");
      return `${n} commit${n > 1 ? "s" : ""} poussé${n > 1 ? "s" : ""}${branch ? ` sur ${branch}` : ""}${msg ? ` — « ${msg} »` : ""}`;
    }
    case "CreateEvent":
      return p.ref_type === "repository"
        ? "Nouveau dépôt créé"
        : `Création ${p.ref_type === "tag" ? "du tag" : "de la branche"} ${p.ref}`;
    case "DeleteEvent":
      return `Suppression ${p.ref_type === "tag" ? "du tag" : "de la branche"} ${p.ref}`;
    case "WatchEvent":
      return "A ajouté une étoile";
    case "ForkEvent":
      return "A forké le dépôt";
    case "IssuesEvent":
      return `Issue ${p.action} : ${p.issue?.title ?? ""}`;
    case "IssueCommentEvent":
      return `Commentaire sur : ${p.issue?.title ?? ""}`;
    case "PullRequestEvent":
      return `Pull request ${p.action} : ${p.pull_request?.title ?? ""}`;
    case "ReleaseEvent":
      return `Nouvelle version : ${p.release?.name || p.release?.tag_name || ""}`;
    case "PublicEvent":
      return "Dépôt rendu public";
    default:
      return e.type.replace(/Event$/, "");
  }
}

async function getRepos() {
  const data = (await gh(`/users/${GITHUB_USER}/repos?sort=pushed&per_page=12`)) ?? [];
  return data
    .filter((r: any) => !r.fork)
    .map((r: any) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
    }));
}

async function getArticles(): Promise<Article[]> {
  const files = (await gh(`/repos/${ARTICLES_REPO}/contents/${ARTICLES_DIR}`)) ?? [];
  const md = files.filter(
    (f: any) => f.type === "file" && /\.md$/i.test(f.name) && !/^readme\.md$/i.test(f.name),
  );

  const articles = await Promise.all(
    md.map(async (f: any) => {
      const raw = (await gh(
        `/repos/${ARTICLES_REPO}/contents/${encodeURIComponent(f.path).replace(/%2F/g, "/")}`,
        "application/vnd.github.raw",
      )) as string | null;
      if (!raw) return null;
      const { meta, body } = parseFrontMatter(raw);
      const slug = f.name.replace(/\.md$/i, "");
      return {
        slug,
        title: meta.title || firstHeading(body) || slug,
        date: meta.date || dateFromName(f.name),
        summary: meta.summary || meta.description || excerpt(body),
        tags: parseTags(meta.tags),
        url: `/article?slug=${encodeURIComponent(slug)}`,
      } as Article;
    }),
  );

  return articles
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

async function getArticle(slug: string) {
  if (!/^[\w.-]+$/.test(slug)) return null;
  const raw = (await gh(
    `/repos/${ARTICLES_REPO}/contents/${ARTICLES_DIR}/${encodeURIComponent(slug)}.md`,
    "application/vnd.github.raw",
  )) as string | null;
  if (!raw) return null;
  const { meta, body } = parseFrontMatter(raw);
  return {
    slug,
    title: meta.title || firstHeading(body) || slug,
    date: meta.date || dateFromName(slug),
    tags: parseTags(meta.tags),
    sourceUrl: `https://github.com/${ARTICLES_REPO}/blob/main/${ARTICLES_DIR}/${slug}.md`,
    markdown: meta.title ? body : body.replace(/^#\s+.+\n/, ""),
  };
}

function parseFrontMatter(raw: string) {
  const meta: Record<string, string> = {};
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta, body: raw };
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+)\s*:\s*(.*)$/);
    if (m) meta[m[1].toLowerCase()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: raw.slice(match[0].length) };
}

function parseTags(value?: string) {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function firstHeading(body: string) {
  return body.match(/^#\s+(.+)$/m)?.[1]?.trim();
}

function dateFromName(name: string) {
  return name.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? null;
}

function excerpt(body: string) {
  const text = body
    .replace(/^#.*$/gm, "")
    .replace(/[`*_>\[\]()!#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 180 ? `${text.slice(0, 180).trim()}…` : text;
}
