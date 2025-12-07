document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('cards-container');
  const loading = document.getElementById('loading-overlay');

  if (!container || !loading) return;

  const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const formatUpdated = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  const techSlug = (name) => {
    if (!name) return 'unknown';
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const hashColor = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h |= 0;
    }
    const hue = Math.abs(h) % 360;
    return `hsl(${hue} 65% 45%)`;
  };

  const TECH_COLORS = {
    html: '#e34f26',
    css: '#264de4',
    javascript: '#f0db4f',
    java: '#b07219',
    python: '#3572A5',
    php: '#787CB5',
    'c#': '#178600',
    csharp: '#178600',
    react: '#61dafb',
    node: '#3C873A',
    twig: '#8A4F8D',
    typescript: '#3178c6'
  };

  const getTechStyles = (name) => {
    if (!name) return { background: '#555', color: '#fff' };
    const slug = techSlug(name);
    let key = slug;

    if (key === 'c' || key === 'c-sharp') key = 'csharp';
    if (key === 'js') key = 'javascript';
    if (key === 'html5') key = 'html';
    if (key === 'node-js' || key === 'node.js') key = 'node';

    let background = TECH_COLORS[key] || hashColor(name);
    const darkTextFor = ['javascript', 'js', 'typescript'];
    const color = darkTextFor.includes(key) ? '#111' : '#fff';

    return { background, color };
  };

  const createLanguageBadge = (name) => {
    const styles = getTechStyles(name);
    const safe = escapeHtml(name);
    return `<span class="language-badge" style="background:${styles.background};color:${styles.color};">${safe}</span>`;
  };

  try {
    const res = await fetch('/assets/data/repos.json', { cache: 'no-cache' });

    if (!res.ok) throw new Error('JSON não encontrado');

    const data = await res.json();
    const repos = Array.isArray(data?.repos) ? data.repos : [];

    // Ordenar por última atualização
    repos.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));

    container.innerHTML = '';

    repos.forEach(repo => {
      // Criar o card
      const card = document.createElement('div');
      card.className = 'projeto-card';

      // Criar link wrapper
      const link = document.createElement('a');
      link.href = repo.html_url || '#';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'projeto-link';

      // Título
      const title = document.createElement('h3');
      title.textContent = repo.name || 'Projeto';

      // Descrição
      const description = document.createElement('p');
      description.textContent = repo.description || 'Projeto desenvolvido para estudos lógicos';

      // Linguagens
      const languagesDiv = document.createElement('div');
      languagesDiv.className = 'projeto-languages';

      if (repo.languages && repo.languages.length > 0) {
        repo.languages.forEach(lang => {
          languagesDiv.innerHTML += createLanguageBadge(lang);
        });
      } else if (repo.language) {
        languagesDiv.innerHTML = createLanguageBadge(repo.language);
      }

      // Montar o card
      link.appendChild(title);
      link.appendChild(description);
      card.appendChild(link);
      card.appendChild(languagesDiv);

      container.appendChild(card);
    });

    // Mostrar container e esconder loading
    container.style.display = 'grid';
    loading.style.display = 'none';

  } catch (err) {
    console.error('Erro ao carregar projetos:', err);

    // Fallback: tentar carregar diretamente da API do GitHub
    try {
      const apiRes = await fetch('https://api.github.com/users/paulowh/repos');

      if (!apiRes.ok) throw new Error('API GitHub falhou');

      const repos = await apiRes.json();

      repos.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));

      container.innerHTML = '';

      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'projeto-card';

        const link = document.createElement('a');
        link.href = repo.html_url || '#';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'projeto-link';

        const title = document.createElement('h3');
        title.textContent = repo.name || 'Projeto';

        const description = document.createElement('p');
        description.textContent = repo.description || 'Projeto desenvolvido para estudos lógicos';

        const languagesDiv = document.createElement('div');
        languagesDiv.className = 'projeto-languages';

        if (repo.language) {
          languagesDiv.innerHTML = createLanguageBadge(repo.language);
        }

        link.appendChild(title);
        link.appendChild(description);
        card.appendChild(link);
        card.appendChild(languagesDiv);

        container.appendChild(card);
      });

      container.style.display = 'grid';
      loading.style.display = 'none';

    } catch (apiErr) {
      console.error('Erro ao carregar da API GitHub:', apiErr);
      loading.innerHTML = '<p style="color: var(--fg-primary);">Erro ao carregar projetos. Tente novamente mais tarde.</p>';
    }
  }
});

// Bloco para a home: preenche o grid .grid-projects usando /assets/data/repos.json.
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.grid-projects .projects-container');
  if (!container) return;

  const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  try {
    const res = await fetch('/assets/data/repos.json', { cache: 'no-cache' });
    if (!res.ok) return;

    const data = await res.json();
    const repos = Array.isArray(data?.repos) ? data.repos : [];

    const filtered = repos.filter((repo) => {
      const name = (repo.name || '').toLowerCase();
      if (name === 'paulowh.github.io') return false;
      if (name === 'paulowh') return false;
      if (name.startsWith('ti')) return false;
      return true;
    });

    filtered.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
    const latest = filtered.slice(0, 4);

    container.innerHTML = '';
    latest.forEach((repo) => {
      const card = document.createElement('a');
      card.className = 'project-card';
      if (repo.html_url) {
        card.href = repo.html_url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
      }

      const title = document.createElement('h3');
      title.textContent = repo.name.toUpperCase() || 'Projeto';

      const desc = document.createElement('p');
      const safeDescription = repo.description
        ? escapeHtml(repo.description)
        : 'Projeto desenvolvido para estudos.';
      desc.innerHTML = safeDescription;

      card.appendChild(title);
      card.appendChild(desc);
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Erro ao carregar projetos do repos.json', err);
  }
});
