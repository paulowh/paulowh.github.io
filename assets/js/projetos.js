// projetos.js - movido de projetos.html
// Bloco original da página de projetos (usa jQuery).
if (window.jQuery) {
  $(document).ready(function () {
    // ---------- Configurações para reduzir consumo da API ----------
    const MAX_CONCURRENT = 4; // máximo de requisições simultâneas
    let activeRequests = 0;
    const requestQueue = [];

    function enqueueRequest(resolver) { requestQueue.push(resolver); }

    function dequeueNext() {
      if (requestQueue.length > 0 && activeRequests < MAX_CONCURRENT) {
        const next = requestQueue.shift();
        next();
      }
    }

    // Faz a chamada AJAX respeitando o limite de concorrência e cache em sessionStorage
    async function limitedAjax(url) {
      const cacheKey = 'langs:' + url;
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) return JSON.parse(cached);
      } catch (e) { /* ignore cache errors */ }

      if (activeRequests >= MAX_CONCURRENT) {
        await new Promise(res => enqueueRequest(res));
      }

      activeRequests++;
      try {
        const langs = await new Promise((resolve, reject) => {
          $.ajax({ url: url, method: 'GET', success: resolve, error: reject });
        });
        const keys = Object.keys(langs);
        try { sessionStorage.setItem(cacheKey, JSON.stringify(keys)); } catch (e) { }
        return keys;
      } catch (err) {
        console.log('Erro ao buscar linguagens:', err);
        return [];
      } finally {
        activeRequests--;
        dequeueNext();
      }
    }

    // Retorna as linguagens (usando limitedAjax)
    async function getLanguages(url) { if (!url) return []; return await limitedAjax(url); }

    // Mostrar a tela de loading
    $('#loading-overlay').show();

    // Helper: adiciona labels ao elemento jQuery $field
    function appendLabels($field, list) {
      // remove placeholder 'markdown' se existir antes de adicionar as reais
      $field.find('.no-languages').remove();
      if (!list || list.length === 0) return;
      list.forEach(element => {
        const label = createLabelHtml(element);
        $field.append(label);
      });
    }

    // Converte nome de tecnologia em slug seguro para classe
    function techSlug(name) {
      if (!name) return 'unknown';
      return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // Gera uma cor consistente a partir de uma string (fallback)
    function hashColor(str) {
      let h = 0;
      for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
      const hue = Math.abs(h) % 360;
      return `hsl(${hue} 65% 45%)`;
    }

    // Mapa manual para cores de tecnologias comuns (hex ou css color)
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

    // Retorna estilos (background + color) para a tecnologia
    function getTechStyles(name) {
      if (!name) return { background: '#555', color: '#fff' };
      const slug = techSlug(name);
      let key = slug;
      // normalizar alguns nomes comuns
      if (key === 'c' || key === 'c-sharp') key = 'csharp';
      if (key === 'js') key = 'javascript';
      if (key === 'html5') key = 'html';
      if (key === 'node-js' || key === 'node.js') key = 'node';

      let background = TECH_COLORS[key] || null;
      if (!background) background = hashColor(name);
      // escolhe cor do texto para contraste (para amarelos usar preto)
      const darkTextFor = ['javascript', 'js', 'typescript'];
      const color = darkTextFor.includes(key) ? '#111' : '#fff';
      return { background, color };
    }

    // Cria HTML de uma label com cor padronizada
    function createLabelHtml(name) {
      const slug = techSlug(name);
      const styles = getTechStyles(name);
      const safe = escapeHtml(name);
      // adiciona classes para facilitar customização via CSS se quiser
      return `<span class="ui label tech-label tech-${slug}" style="background:${styles.background};color:${styles.color};">${safe}</span>`;
    }

    // Carrega linguagens para um card (usado pelo observer)
    async function loadLanguagesForCard($card) {
      const url = $card.data('langs-url');
      const $field = $card.find('.field');
      if (!$field.data('langs-loaded')) {
        const langs = await getLanguages(url);
        appendLabels($field, langs);
        $field.data('langs-loaded', true);
      }
    }

    // Primeiro tenta carregar o JSON gerado em /assets/data/repos.json (gerado pela Action)
    async function tryLoadFromJson() {
      try {
        const res = await fetch('/assets/data/repos.json', { cache: 'no-cache' });
        if (!res.ok) return null;
        const json = await res.json();
        if (!json || !Array.isArray(json.repos)) return null;
        return json;
      } catch (e) { return null; }
    }

    // Monta cards a partir do objeto JSON gerado pela Action
    function buildFromJson(json) {
      const repos = json.repos || [];
      // ordenar por última atualização (mais recente primeiro)
      repos.sort(function (a, b) { return new Date(b.updated_at) - new Date(a.updated_at); });

      repos.forEach(item => {
        // Usar apenas item.languages para evitar duplicar a exibição da linguagem primária
        // Se não houver linguagens, mostra 'Markdown' (placeholder que será removido quando houver lazy-load)
        const labels = (item.languages && item.languages.length)
          ? item.languages.map(l => createLabelHtml(l)).join('')
          : createLabelHtml('Markdown');

        // Se este for o repositório especial 'paulowh' e tiver README, renderiza como Markdown
        const isPaulowh = item.name && item.name.toLowerCase() === 'paulowh';
        let descriptionHtml = '';
        if (isPaulowh && item.readme) {
          try { descriptionHtml = marked.parse(item.readme); } catch (e) { descriptionHtml = item.description != null ? item.description : 'Projeto desenvolvido para estudos lógicos'; }
        } else if (isPaulowh && !item.readme) {
          // Se o JSON não continha README para 'paulowh', tenta buscar esse README apenas no cliente
          descriptionHtml = item.description != null ? escapeHtml(item.description) : 'Projeto desenvolvido para estudos lógicos';
          fetchReadmeClient('paulowh', item.name).then(txt => {
            if (txt) {
              try {
                const md = marked.parse(txt);
                $(`#cards-container .card .header`).filter(function () { return $(this).text() === item.name; })
                  .closest('.card')
                  .find('.description')
                  .removeClass('card-description')
                  .addClass('card-readme')
                  .html(md);
              } catch (err) { console.error('Erro ao renderizar README no cliente:', err); }
            }
          }).catch(err => { console.error('Erro ao buscar README no cliente:', err); });
        } else {
          // sanitização mínima: se description for nulo, usar texto padrão
          descriptionHtml = item.description != null ? escapeHtml(item.description) : 'Projeto desenvolvido para estudos lógicos';
        }

        // Para conteúdo de README não limitamos o número de linhas; caso contrário usar 'card-description' para truncar
        const descClass = (isPaulowh && item.readme) ? 'card-readme' : 'card-description';
        const cardHtml = `
            <a class="green card" href="${item.html_url}" target="_blank" data-langs-url="${item.languages_url || ''}">
                <div class="content">
                    <div class="header">${escapeHtml(item.name)}</div>
                    <div class="meta">${item.language ? escapeHtml(item.language) : ''}</div>
                    <div class="description ${descClass}">
                        ${isPaulowh && item.readme ? descriptionHtml : descriptionHtml}
                    </div>
                </div>
                <div class="content content-body">
                    <div class="field">
                        ${labels}
                    </div>
                </div>
                <div class="extra content">
                    <div class="extra-meta" >
                        <span>
                            <i class="star icon"></i> 
                            ${getStarsFromItem(item)}
                        </span>
                        <span class="updated">${formatUpdated(item.updated_at)}</span>
                    </div>
                </div>
            </a>
            `;

        $('#cards-container').append(cardHtml);
      });
    }

    // Retorna o número de estrelas presente no item (procura por chaves comuns)
    function getStarsFromItem(item) {
      if (!item) return 0;
      return item.stargazers_count || item.stars || item.stargazers || 0;
    }

    // Formata data updated_at para visualização amigável
    function formatUpdated(dateStr) {
      if (!dateStr) return '';
      try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
      } catch (e) { return dateStr; }
    }

    // Minimal HTML escape for plain descriptions
    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // Busca o README (raw) para um repo específico via API GitHub (somente para fallback do 'paulowh')
    async function fetchReadmeClient(owner, repo) {
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
        const res = await fetch(url, { headers: { Accept: 'application/vnd.github.v3.raw' } });
        if (!res.ok) {
          console.error('Resposta não OK ao buscar README:', res.status);
          return null;
        }
        const text = await res.text();
        return text;
      } catch (e) {
        console.error('Erro ao buscar README via cliente:', e);
        return null;
      }
    }

    (async () => {
      const json = await tryLoadFromJson();
      if (json) {
        // Usar o JSON estático — evita chamadas à API do GitHub em runtime
        buildFromJson(json);
        $('#cards-container').show();
        $('#loading-overlay').fadeOut();
        return;
      }

      // Se não encontrou JSON, fallback para o comportamento anterior (consulta GitHub com lazy-load)
      $.ajax({
        url: 'https://api.github.com/users/paulowh/repos',
        method: 'GET',
        success: function (data) {
          data.sort(function (a, b) { return new Date(b.updated_at) - new Date(a.updated_at); });

          // Monta os cards sem fazer muitas requisições ainda
          data.forEach(item => {
            // usa item.language (linguagem primária) como label inicial se existir, senão mostra placeholder

            const primaryLang = item.language ? createLabelHtml(item.language) : createLabelHtml('Markdown');

            const cardHtml = `
                    <a class="card" href="${item.html_url}" target="_blank" data-langs-url="${item.languages_url}">
                        <div class="content">
                            <div class="header">${item.name}</div>
                            <div class="meta">${item.language ? item.language : ''}</div>
                            <div class="description card-description">
                                ${item.description != null ? escapeHtml(item.description) : 'Projeto desenvolvido para estudos lógicos'}
                            </div>
                        </div>
                        <div class="content content-body">
                            <div class="field">
                                ${primaryLang}
                            </div>
                        </div>
                        <div class="extra content">
                            <div class="extra-meta" style="width:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
                                <span class="likes"><i class="star icon neutral-star"></i> <span class="likes-count">${getStarsFromItem(item)}</span></span>
                                <span class="updated">${formatUpdated(item.updated_at)}</span>
                            </div>
                        </div>
                    </a>
                    `;

            $('#cards-container').append(cardHtml);
          });

          $('#cards-container').show();
          $('#loading-overlay').fadeOut();

          // Lazy-load das linguagens quando o card estiver visível
          const cards = document.querySelectorAll('#cards-container .card');
          if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const cardEl = entry.target;
                  loadLanguagesForCard($(cardEl));
                  obs.unobserve(cardEl);
                }
              });
            }, { rootMargin: '200px' });

            cards.forEach(c => observer.observe(c));
          } else {
            // Fallback: carregar linguagens apenas para os primeiros 8 cards
            for (let i = 0; i < Math.min(8, cards.length); i++) { loadLanguagesForCard($(cards[i])); }
          }
        },
        error: function () { alert('Erro ao carregar os dados da API'); $('#loading-overlay').fadeOut(); }
      });
    })();
  });
}

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
      title.textContent = repo.name || 'Projeto';

      const desc = document.createElement('p');
      const safeDescription = repo.description ? escapeHtml(repo.description) : 'Projeto desenvolvido para estudos.';
      desc.innerHTML = safeDescription;

      card.appendChild(title);
      card.appendChild(desc);
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Erro ao carregar projetos do repos.json', err);
  }
});
