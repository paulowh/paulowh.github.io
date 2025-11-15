// Node script to generate data/repos.json for GitHub Pages
// Usage: GITHUB_TOKEN must be provided in env (the Action sets it automatically)

const fs = require('fs');
const path = require('path');

const OWNER = 'paulowh';
const OUT_DIR = path.join(__dirname, '..', 'data');
const OUT_FILE = path.join(OUT_DIR, 'repos.json');
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error('GITHUB_TOKEN not provided in env');
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
    if (!res.ok) throw new Error(`Failed to fetch repos: ${res.status}`);
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
    console.error('Error fetching languages for', url, e.message);
    return [];
  }
}

(async () => {
  try {
    console.log('Fetching repos for', OWNER);
    const repos = await fetchAllRepos();
    console.log(`Found ${repos.length} repos`);

    const out = {
      generated_at: new Date().toISOString(),
      repos: []
    };

    for (const r of repos) {
      const languages = await fetchLanguages(r.languages_url);
      out.repos.push({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        language: r.language,
        languages: languages,
        updated_at: r.updated_at
      });
    }

    // Ensure out dir exists
    try { fs.mkdirSync(OUT_DIR, { recursive: true }); } catch (e) { }

    fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), 'utf8');
    console.log('Wrote', OUT_FILE);
  } catch (err) {
    console.error('Failed to generate JSON:', err);
    process.exit(1);
  }
})();
