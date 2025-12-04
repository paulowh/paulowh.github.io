document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('social-buttons');
    if (!container) return;

    // initial accessibility state and loader
    container.setAttribute('role', 'region');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-busy', 'true');
    container.innerHTML = '<div class="loader-row"><div class="ui active inline loader" aria-hidden="true"></div><span class="loader-text">Carregando...</span></div>';

    fetch('data/socials.json')
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
                const color = s.colorClass || 'black';
                a.className = 'ui fluid ' + color + ' button';
                a.href = s.url;
                a.target =   s.target || '_blank';
                a.rel = 'noopener noreferrer';
                a.setAttribute('aria-label', (s.label || '') + ' (abre em nova aba)');
                a.setAttribute('title', s.label || '');
                a.setAttribute('tabindex', '0');

                const icon = document.createElement('i');
                icon.className = (s.icon || '') + ' icon';
                a.appendChild(icon);

                const span = document.createElement('span');
                span.textContent = ' ' + (s.label || '');
                a.appendChild(span);

                // enter with a small fade/translate animation
                a.style.opacity = '0';
                a.style.transform = 'translateY(6px)';
                a.style.transition = 'opacity 220ms ease, transform 200ms ease';

                container.appendChild(a);
                setTimeout(function () {
                    a.style.opacity = '1';
                    a.style.transform = 'translateY(0)';
                }, 60 + idx * 70);
            });
        })
        .catch(function (err) {
            console.error('Erro ao carregar data/socials.json:', err);
            container.setAttribute('aria-busy', 'false');
            container.innerHTML = '<p>Erro ao carregar links. Tente novamente mais tarde.</p>';
        });
});
