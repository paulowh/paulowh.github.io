// Script Node para gerar assets/data/repos.json para o GitHub Pages
// Uso: GITHUB_TOKEN deve ser fornecido nas variáveis de ambiente (a Action já define automaticamente)

const fs = require('fs');
const path = require('path');

const OWNER = 'paulowh';
const OUT_DIR = path.join(__dirname, '..', 'assets', 'data');
const OUT_FILE = path.join(OUT_DIR, 'repos.json');
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error('GITHUB_TOKEN não foi fornecido nas variáveis de ambiente');
  process.exit(1);
}

const HEADERS = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'generate-repos-json-script',
  'Authorization': `token ${TOKEN}`
};

async function fetchAllRepos() {
  const per_page = 100;
  let page = 1;
  const repos = [];

  while (true) {
    const url = `https://api.github.com/users/${OWNER}/repos?per_page=${per_page}&page=${page}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`Falha ao buscar repositórios: ${res.status}`);
    const data = await res.json();
    repos.push(...data);
    if (data.length < per_page) break;
    page++;
  }

  return repos;
}

async function fetchLanguages(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return [];
    const obj = await res.json();
    return Object.keys(obj || {});
  } catch (e) {
    console.error('Erro ao buscar linguagens em', url, e.message);
    return [];
  }
}

// OBS: fetchReadme removido — o README não é incluído no JSON estático para reduzir chamadas à API.

(async () => {
  try {
    console.log('Buscando repositórios de', OWNER);
    const repos = await fetchAllRepos();
    console.log(`Encontrados ${repos.length} repositórios`);

    const out = {
      generated_at: new Date().toISOString(),
      repos: []
    };

    for (const r of repos) {
      const languages = await fetchLanguages(r.languages_url);
      // não buscamos README aqui para manter o gerador rápido e leve
      out.repos.push({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        languages_url: r.languages_url,
        language: r.language,
        stargazers_count: r.stargazers_count,
        languages: languages,
        updated_at: r.updated_at
      });
    }

    // Garante que o diretório de saída exista
    try { fs.mkdirSync(OUT_DIR, { recursive: true }); } catch (e) { }

    fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), 'utf8');
    console.log('Arquivo gravado em', OUT_FILE);
  } catch (err) {
    console.error('Falha ao gerar JSON:', err);
    process.exit(1);
  }
})();
