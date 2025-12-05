# paulowh.github.io

Portfólio/landing pessoal que exibe projetos do GitHub, destaques na home e um hub rápido de redes sociais.

## Visão rápida
- `index.html`: hero com preloader FLIP, retrato/tema aleatórios (`assets/js/theme.js`), vitrine automática dos 4 repositórios mais recentes via `assets/data/repos.json`.
- `projetos.html`: grade Semantic UI com todos os repositórios; usa o JSON estático e faz lazy-load das linguagens (fallback direto na API do GitHub com limite de concorrência e cache em `sessionStorage`).
- `contato.html`: botões de redes sociais carregados de `assets/data/socials.json` (Semantic UI).
- Estilos principais em `assets/css/style.css` e `assets/css/projetos.css`; animação FLIP em `assets/js/loading.js`.

## Atualizar a lista de repositórios
`assets/data/repos.json` é gerado a partir da API do GitHub. Para atualizar:
1) Defina um token com leitura pública (sessão atual):
```
set GITHUB_TOKEN=seu_token
```
2) Execute o gerador Node:
```
node assets/js/generate-repos.js
```
3) O script grava o JSON com `name`, `description`, `languages`, `stars` e `updated_at`, usado pela home e por `projetos.html`.

## Ajustar dados de contato
Edite `assets/data/socials.json` para adicionar/remover links (rótulo, URL, ícone do Semantic UI e cor).