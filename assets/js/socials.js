document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('social-buttons');
  if (!container) return;

  // initial accessibility state and loader
  container.setAttribute('role', 'region');
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-busy', 'true');
  container.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Carregando...</span></div></div>';

  fetch('assets/data/socials.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(function (socials) {
      container.setAttribute('aria-busy', 'false');
      if (!Array.isArray(socials) || socials.length === 0) {
        container.innerHTML = '<p>Nenhuma rede social encontrada.</p>';
        return;
      }
      container.innerHTML = '';
      socials.forEach(function (s, idx) {
        const a = document.createElement('a');
        a.className = 'social-button';
        a.href = s.url;
        a.target = s.target || '_blank';
        a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', (s.label || '') + ' (abre em nova aba)');
        a.setAttribute('title', s.label || '');
        a.setAttribute('tabindex', '0');

        const icon = document.createElement('i');
        
        icon.className = 'bi ' + 'bi-' + (s.icon || 'link-45deg');
        a.appendChild(icon);

        const span = document.createElement('span');
        span.textContent = s.label || '';
        a.appendChild(span);

        container.appendChild(a);
      });
    })
    .catch(function (err) {
      console.error('Erro ao carregar assets/data/socials.json:', err);
      container.setAttribute('aria-busy', 'false');
      container.innerHTML = '<p>Erro ao carregar links. Tente novamente mais tarde.</p>';
    });
});
