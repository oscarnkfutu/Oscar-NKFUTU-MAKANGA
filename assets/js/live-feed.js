/**
* Live GitHub activity, repositories and articles for the iPortfolio page.
* Data comes from the /api/github Netlify Function and is refreshed
* periodically so new commits and articles appear without reloading.
*/

(function() {
  "use strict";

  const REFRESH_MS = 2 * 60 * 1000;
  const reposEl = document.querySelector('#github-repos');
  const eventsEl = document.querySelector('#github-events');
  const articlesEl = document.querySelector('#articles-list');
  const updatedEl = document.querySelector('#feed-updated');

  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const EVENT_ICONS = {
    PushEvent: 'bi-arrow-up-circle',
    CreateEvent: 'bi-plus-circle',
    DeleteEvent: 'bi-trash',
    WatchEvent: 'bi-star',
    ForkEvent: 'bi-diagram-2',
    IssuesEvent: 'bi-exclamation-circle',
    IssueCommentEvent: 'bi-chat-left-text',
    PullRequestEvent: 'bi-git',
    ReleaseEvent: 'bi-tag',
    PublicEvent: 'bi-unlock'
  };

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }

  function formatDate(value, withTime) {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date)) return escapeHtml(value);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (withTime) Object.assign(options, { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString('fr-FR', options);
  }

  function timeAgo(value) {
    const seconds = Math.round((Date.now() - new Date(value)) / 1000);
    const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });
    const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
    for (const [unit, size] of units) {
      if (seconds >= size) return rtf.format(-Math.floor(seconds / size), unit);
    }
    return 'à l’instant';
  }

  function renderEvents(events) {
    if (!eventsEl) return;
    if (!events.length) {
      eventsEl.innerHTML = '<div class="feed-placeholder">Aucune activité publique récente.</div>';
      return;
    }
    eventsEl.innerHTML = events.map(e => `
      <div class="resume-item github-event">
        <h4><i class="bi ${EVENT_ICONS[e.type] || 'bi-github'}"></i>
          <a href="${escapeHtml(e.repoUrl)}" target="_blank" rel="noopener">${escapeHtml(e.repo)}</a></h4>
        <h5 title="${formatDate(e.createdAt, true)}">${timeAgo(e.createdAt)}</h5>
        <p>${escapeHtml(e.description)}</p>
      </div>`).join('');
  }

  function renderRepos(repos) {
    if (!reposEl) return;
    if (!repos.length) {
      reposEl.innerHTML = '<div class="col-12 feed-placeholder">Aucun dépôt public pour le moment.</div>';
      return;
    }
    reposEl.innerHTML = repos.map(r => `
      <div class="col-lg-4 col-md-6">
        <a class="project-card repo-card" href="${escapeHtml(r.url)}" target="_blank" rel="noopener">
          <h4><i class="bi bi-journal-code"></i> ${escapeHtml(r.name)}</h4>
          <p>${escapeHtml(r.description || 'Pas de description.')}</p>
          <div class="repo-meta">
            ${r.language ? `<span><i class="bi bi-circle-fill"></i> ${escapeHtml(r.language)}</span>` : ''}
            <span><i class="bi bi-star"></i> ${r.stars}</span>
            <span><i class="bi bi-diagram-2"></i> ${r.forks}</span>
            <span><i class="bi bi-clock-history"></i> ${timeAgo(r.pushedAt)}</span>
          </div>
        </a>
      </div>`).join('');
  }

  function renderArticles(articles) {
    if (!articlesEl) return;
    if (!articles.length) {
      articlesEl.innerHTML = '<div class="col-12 feed-placeholder">Aucun article publié pour le moment. Revenez bientôt !</div>';
      return;
    }
    articlesEl.innerHTML = articles.map(a => `
      <div class="col-lg-4 col-md-6">
        <article class="article-card">
          ${a.date ? `<p class="article-date"><i class="bi bi-calendar3"></i> ${formatDate(a.date)}</p>` : ''}
          <h4><a href="${escapeHtml(a.url)}">${escapeHtml(a.title)}</a></h4>
          <p>${escapeHtml(a.summary)}</p>
          ${a.tags.length ? `<div class="article-tags">${a.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>` : ''}
          <a class="read-more" href="${escapeHtml(a.url)}">Lire l’article <i class="bi bi-arrow-right"></i></a>
        </article>
      </div>`).join('');
  }

  function setStat(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  async function loadFeed() {
    try {
      const res = await fetch('/api/github', { cache: 'no-store' });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      renderEvents(data.events || []);
      renderRepos(data.repos || []);
      renderArticles(data.articles || []);
      setStat('stat-repos', (data.repos || []).length);
      setStat('stat-events', (data.events || []).length);
      setStat('stat-articles', (data.articles || []).length);
      if (updatedEl) updatedEl.textContent = `Dernière synchronisation : ${formatDate(data.updatedAt, true)}`;
    } catch (err) {
      console.error('Flux GitHub indisponible', err);
      [eventsEl, reposEl, articlesEl].forEach(el => {
        if (el && el.querySelector('.feed-placeholder')) {
          el.querySelector('.feed-placeholder').textContent = 'Impossible de charger les données GitHub pour le moment.';
        }
      });
    }
  }

  loadFeed();
  setInterval(() => {
    if (document.visibilityState === 'visible') loadFeed();
  }, REFRESH_MS);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') loadFeed();
  });

  /**
   * Contact form (Netlify Forms, AJAX submission)
   */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const loading = form.querySelector('.loading');
      const error = form.querySelector('.error-message');
      const sent = form.querySelector('.sent-message');
      loading.style.display = 'block';
      error.style.display = 'none';
      sent.style.display = 'none';

      const body = new URLSearchParams(new FormData(form));
      if (!body.has('form-name')) body.set('form-name', 'contact');

      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString()
        });
        if (!res.ok) throw new Error(res.status);
        sent.style.display = 'block';
        form.reset();
      } catch (err) {
        error.textContent = 'Une erreur est survenue lors de l’envoi. Merci de réessayer ou de m’écrire par email.';
        error.style.display = 'block';
      } finally {
        loading.style.display = 'none';
      }
    });
  }

})();
