<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NKFUTU MAKANGA OSCAR - Portfolio</title>
    <link rel="stylesheet" href="style.scss"> <!-- Ou style.css si vous le compilez -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <!-- Bouton mode sombre / clair -->
    <button id="theme-toggle" aria-label="Changer de thème">
        <i class="fa-solid fa-moon"></i>
    </button>

    <div class="">
        <!-- En-tête / Profil -->
        <header class="">
            <h1>👨‍💻 NKFUTU MAKANGA OSCAR</h1>
            <p class="role">Data Manager & Spécialiste en Data Center | Chercheur en Data Science | Développeur Web et Mobile</p>
            
            <div class="contact-info">
                <span><i class="fa-solid fa-location-dot"></i> Kinshasa, RDC</span>
                <span><i class="fa-solid fa-envelope"></i> <a href="mailto:oscarnkfutu@gmail.com">oscarnkfutu@gmail.com</a></span>
                <span><i class="fa-solid fa-phone"></i> <a href="tel:+243822009500">+243 822 009 500</a></span>
                <span><i class="fa-brands fa-github"></i> <a href="https://github.com/oscarnkfutu" target="_blank">GitHub</a></span>
                <span><i class="fa-brands fa-linkedin"></i> <a href="https://linkedin.com/in/oscar-nkfutu" target="_blank">LinkedIn</a></span>
            </div>
        </header>

        <!-- Citation / À propos -->
        <section class="card">
            <h2><i class="fa-solid fa-rocket"></i> À Propos de Moi</h2>
            <blockquote class="quote">
                « Anticiper les évolutions informatiques et proposer des solutions technologiques adaptées au service de la science et de la société. »
            </blockquote>
            <p>
                Ingénieur Informaticien, Data Manager (The Mitchell Group / INRB) et Chef de Travaux dans l’enseignement supérieur, je suis spécialisé dans la gestion, la sécurisation et l’analyse des données massives et complexes (données cliniques, épidémiologiques et institutionnelles).
            </p>
            <p>
                Fort d’un parcours académique solide en Sciences Informatiques (UNIKIN) et en Data Science / Ingénierie Mathématique (Master DSIM - Université de Dschang / AUF), j’allie la recherche scientifique appliquée, l’architecture Data et le développement de solutions applicatives adaptées aux enjeux sanitaires et technologiques locaux.
            </p>
        </section>

        <!-- Parcours Académique -->
        <section class="card">
            <h2><i class="fa-solid fa-graduation-cap"></i> Parcours Académique</h2>
            <div class="timeline-item">
                <h3>Master en Data Science et Ingénierie Mathématique (DSIM) - <em>En Cours</em></h3>
                <p>Université de Dschang (Cameroun) en partenariat avec l’AUF</p>
            </div>
            <div class="timeline-item">
                <h3>Licence (Bac+5) en Sciences Informatiques (2017)</h3>
                <p>Université de Kinshasa (UNIKIN)</p>
                <p class="sub-text"><strong>Mémoire :</strong> Conception et mise en œuvre d’une interconnexion de réseaux distants via la technologie radio HF/UHF (Ubiquiti NanoStation M5).</p>
            </div>
        </section>

        <!-- Compétences & Technologies -->
        <section class="card">
            <h2><i class="fa-solid fa-tools"></i> Compétences & Technologies</h2>
            
            <div class="skill-category">
                <h3>📊 Data Management & Data Engineering</h3>
                <p><strong>Bases de Données :</strong> PostgreSQL, MongoDB, SQL Server, MySQL, Oracle Database, TinyDB.</p>
                <p><strong>Langages & Libs :</strong> Python (Pandas, NumPy, SciPy, Scikit-Learn, PySpark, SQLAlchemy, psycopg2, PyMongo), R, SQL.</p>
                <p><strong>Pratiques & Processus :</strong> Modélisation MERISE (MCD/MLD), Normalisation, DataOps, Pipelines CI/CD (GitHub Actions, GitLab CI), Gouvernance et Intégrité des données biomédicales.</p>
            </div>

            <div class="skill-category">
                <h3>💻 Développement & Mobile</h3>
                <p><strong>Web & Backend :</strong> PHP, JavaScript, HTML5/CSS3, APIs RESTful, WordPress.</p>
                <p><strong>Mobile & UI/UX :</strong> Prototypage & Wireframing (Figma, Pencil Project), Développement mobile d’urgence & suivi (MIT App Inventor).</p>
            </div>

            <div class="skill-category">
                <h3>🖥️ Systèmes, Réseaux & Sécurité</h3>
                <p><strong>Réseaux & Infrastructures :</strong> Interconnexion distante sans fil (Ubiquiti NanoStation M5), Administration Data Center.</p>
                <p><strong>Systèmes & Maintenance :</strong> Linux (Ubuntu Server), Windows Server, Infogérance et maintenance informatique.</p>
                <p><strong>Normes & Conformité :</strong> Bonnes Pratiques Cliniques (BPC / GCP), Sécurité de l’information médicale.</p>
            </div>
        </section>

        <!-- Projets Majeurs -->
        <section class="card">
            <h2><i class="fa-solid fa-briefcase"></i> Projets Majeurs & Expériences</h2>
            
            <div class="project-item">
                <h3>🧪 Recherche Clinique & Data Management (INRB / NIH / The Mitchell Group)</h3>
                <p><strong>Monkeypox Clinical Trial Data Management & Mapping :</strong> Collecte, contrôle qualité, traitement et sécurisation des données d’essais cliniques sur la variole du singe (Mpox). Alignement sur les normes internationales de confidentialité et d’éthique de la recherche biomédicale.</p>
            </div>

            <div class="project-item">
                <h3>🚀 Innovation Software & Startups</h3>
                <p><strong>Benda Photo (ProxyTech) — Lauréat Seedstars RDC :</strong> Co-conception et architecture de l’application de traitement et gestion de flux photo numérique.</p>
                <p><strong>Mobile Tracker 1.0 & KoleDet / Inbiens :</strong> Spécification fonctionnelle et prototypage d’applications mobiles basées sur le suivi GPS/SMS et la gestion d’inventaires locaux via TinyDB.</p>
            </div>

            <div class="project-item">
                <h3>🏦 Systèmes Institutionnels & Finance</h3>
                <p><strong>Projets Transbank, Criic & Dégis Solutions (Sintel Sarl & Proxyteam) :</strong> Conception et administration de modules logiciels dédiés à la gestion bancaire, financière et au suivi du personnel institutionnel.</p>
            </div>

            <div class="project-item">
                <h3>🌐 Infrastructure & Enseignement (ISP Kole & UNIKIN)</h3>
                <p><strong>Système Web & Infrastructure ISP-Kole :</strong> Administration, maintenance technique, optimisation des performances et branding digital de la plateforme institutionnelle.</p>
                <p><strong>Gestion du Personnel UNIKIN :</strong> Modélisation et déploiement de la base de données relationnelle pour la gestion des ressources humaines de la Faculté des Sciences.</p>
            </div>
        </section>

        <!-- Certifications -->
        <section class="card">
            <h2><i class="fa-solid fa-certificate"></i> Certifications & Formations Continues</h2>
            <ul class="cert-list">
                <li>Bonnes Pratiques Cliniques (GCP / BPC) — <strong>Certifié (2026)</strong></li>
                <li>Information Security and Management Refresher — <strong>National Institutes of Health (NIH) (2026)</strong></li>
                <li>Business Analysis & Process Management — <strong>Formation certifiante (2026)</strong></li>
                <li>Build a Free Website with WordPress — <strong>Coursera Project Network (2026)</strong></li>
                <li>Programme D-CLIC / OIF — <strong>Spécialisation Développement Mobile & UI/UX Figma</strong></li>
            </ul>
        </section>

        <!-- Pied de page -->
        <footer>
            <p>Statistiques du profil : <span class="badge">Très bonne</span></p>
            <p>Maintenu par <a href="https://github.com/oscarnkfutu" target="_blank">oscarnkfutu</a> | Hébergé sur GitHub Pages</p>
        </footer>
    </div>

    <!-- Script JavaScript interactif -->
    <script>
        // Gestion du mode sombre / clair
        const toggleBtn = document.getElementById('theme-toggle');
        const body = document.body;

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            toggleBtn.innerHTML = isDarkMode ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    </script>
</body>
</html>
