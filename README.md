# Portfolio Paulo Santos
Portfólio para divugação de projetos pessoais

## 🎨 Características

- **Design Responsivo**: Interface moderna que se adapta a todos os dispositivos
- **Tema Dinâmico**: Sistema de temas com 9 variações de cores diferentes, sorteadas aleatoriamente a cada carregamento
- **Galeria de Projetos**: Integração com API GitHub para exibir repositórios em tempo real
- **Redes Sociais**: Links para LinkedIn, GitHub, Instagram e outras plataformas
- **Otimização de Performance**: Lazy loading, cache em sessionStorage e controle de requisições simultâneas

## 📁 Estrutura do Projeto

```
paulowh.github.io/
├── index.html              # Página principal do portfólio
├── projetos.html           # Página de projetos (integrado com GitHub API)
├── contato.html            # Página de contato com redes sociais
├── README.md               # Este arquivo
├── LICENSE                 # Licença MIT
│
├── assets/
│   ├── css/
│   │   ├── style.css       # Estilos principais com temas personalizados
│   │   └── projetos.css    # Estilos específicos da página de projetos
│   │
│   ├── js/
│   │   ├── theme.js        # Gerenciamento de temas aleatórios
│   │   ├── projetos.js     # Renderização dinâmica de projetos (GitHub API)
│   │   ├── socials.js      # Carregamento de botões de redes sociais
│   │   ├── loading.js      # Controle de telas de carregamento
│   │   └── generate-repos.js # Script Node para gerar JSON com repositórios
│   │
│   ├── data/
│   │   ├── repos.json      # Dados dos repositórios (gerado automaticamente)
│   │   └── socials.json    # Dados das redes sociais
│   │
│   ├── img/
│   │   ├── favicon/        # Favicons em múltiplas resoluções
│   │   └── retrato-*.JPEG  # 9 imagens de portfólio (uma sorteada por tema)
│   │
│   └── font/
│       └── Gilroy-*.ttf    # Fontes personalizadas (Light, Medium, Bold)
│

```

## 🚀 Como Executar o Projeto

### Requisitos Mínimos

- XAMPP instalado
- Node.js instalado
- Git (opcional, para atualizações)

### Passo 1: Configurar o XAMPP

1. Abra o arquivo `httpd.conf` do XAMPP (geralmente em `C:\xampp\apache\conf\httpd.conf`)

2. Localize a linha `DocumentRoot` e altere para:
   ```conf
   DocumentRoot "C:/xampp/htdocs/paulowh.github.io"
   ```

3. Logo abaixo, localize a diretiva `<Directory>` e atualize para:
   ```conf
   <Directory "C:/xampp/htdocs/paulowh.github.io">
   ```

4. Reinicie o Apache através do painel de controle do XAMPP

### Passo 2: Instalar Dependências Node.js

Abra o PowerShell na pasta do projeto e execute:

```powershell
npm install -g browser-sync
```

### Passo 3: Iniciar o Servidor com Browser Sync

No PowerShell, execute:

```powershell
browser-sync start --proxy "localhost/paulowh.github.io" --files "*.html, *.css, *.js, **/*.php"
```

O projeto será aberto automaticamente em `http://localhost:3000` com **live reload** habilitado. Qualquer alteração em arquivos HTML, CSS ou JavaScript será refletida instantaneamente no navegador.

### Alternativa: Sem Browser Sync

Se preferir usar apenas o XAMPP, acesse `http://localhost/paulowh.github.io` no navegador após reiniciar o Apache.

## 🔄 Atualizar Projetos do GitHub

O arquivo `assets/data/repos.json` é gerado automaticamente através de uma GitHub Action, mas você pode gerar manualmente:

1. Abra o arquivo `assets/js/generate-repos.js`
2. Localize a linha com `const OWNER = 'paulowh';` (linha 4)
3. Altere `'paulowh'` para seu username do GitHub:
   ```javascript
   const OWNER = 'seu_usuario_github';
   ```
4. Defina o token de acesso no PowerShell:
   ```powershell
   $env:GITHUB_TOKEN = 'seu_token_github'
   ```
5. Execute o script:
   ```powershell
   node assets/js/generate-repos.js
   ```

> **Nota**: O script requer um token de acesso pessoal do GitHub com permissões de leitura pública. [Crie um token aqui](https://github.com/settings/tokens)

## 📝 Personalização

### Adicionar Redes Sociais

Edite `assets/data/socials.json`:

```json
{
  "id": "seu-id",
  "label": "Seu Label",
  "url": "https://seu-url.com",
  "icon": "nome-do-icon-semantic-ui",
  "colorClass": "cor-do-semantic-ui",
  "target": "_blank"
}
```

### Modificar Cores e Temas

Os temas estão definidos em `assets/css/style.css` usando variáveis CSS personalizadas:

```css
[data-theme="retrato-1"] {
  --bg: #D1CCD9;
  --bg-card-primary: #0F2440;
  --bg-card-secondary: #071526;
  /* ... */
}
```

### Adicionar Novas Imagens de Retrato

1. Adicione a imagem em `assets/img/` com o nome `retrato-X.JPEG`
2. Atualize a variável `totalRetratos` em `assets/js/theme.js`
3. Adicione as cores correspondentes em `assets/css/style.css`

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Semantic UI 2.4.1
- **APIs**: GitHub API v3
- **Ferramentas de Desenvolvimento**: 
  - XAMPP (servidor local)
  - Browser Sync (live reload)
  - Node.js (utilitários)
- **Deployment**: GitHub Pages

## 📊 Funcionalidades JavaScript

### `theme.js`
- Seleciona aleatoriamente um dos 9 temas disponíveis
- Define variáveis CSS dinamicamente
- Carrega imagens de portfólio correspondentes

### `projetos.js`
- Busca repositórios do GitHub API
- Limita requisições simultâneas (máx. 4)
- Cache em sessionStorage para melhor performance
- Renderiza cards com informações de cada projeto

### `socials.js`
- Carrega dados de redes sociais de `socials.json`

### `loading.js`
- Controla telas de pré-carregamento
- Animações de spinner customizadas

## 🤝 Contribuições

Este é um projeto pessoal. Para sugestões ou feedback, entre em contato através das redes sociais presentes no portfólio.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Copyright © 2025 Paulo Santos. Todos os direitos reservados.

---

**Desenvolvido com ☕ e 💻 por Paulo Santos**
