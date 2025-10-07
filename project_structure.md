# Struttura del Progetto IBD Diagnostic Tool

Questa è la struttura completa delle cartelle e dei file del progetto.

```
ibd-diagnostic-tool/
├── public/
│   ├── index.html                 # Entry point HTML
│   ├── manifest.json              # PWA manifest
│   ├── favicon.ico                # Favicon
│   ├── logo192.png                # Logo piccolo
│   ├── logo512.png                # Logo grande
│   └── robots.txt                 # SEO robots
│
├── src/
│   ├── components/
│   │   └── IBDDiagnosticApp.jsx   # Main React component
│   │
│   ├── index.js                   # React entry point
│   ├── index.css                  # Global styles
│   └── App.js                     # App wrapper
│
├── .gitignore                     # Git ignore rules
├── LICENSE                        # MIT License + Medical Disclaimer
├── README.md                      # Project documentation
├── CONTRIBUTING.md                # Contribution guidelines
├── PROJECT_STRUCTURE.md           # This file
├── package.json                   # Dependencies
├── package-lock.json              # Locked dependencies
├── tailwind.config.js             # Tailwind configuration
└── postcss.config.js              # PostCSS configuration

```

## 📁 Descrizione Cartelle

### `/public`
File statici serviti direttamente dal server:
- **index.html**: Template HTML principale con disclaimer medico
- **manifest.json**: Configurazione Progressive Web App
- **favicon.ico**: Icona del sito
- **logo*.png**: Loghi per diverse dimensioni

### `/src`
Codice sorgente React:
- **components/**: Componenti React riutilizzabili
  - **IBDDiagnosticApp.jsx**: Componente principale dell'applicazione
- **index.js**: Entry point React che monta l'app
- **index.css**: Stili globali e importazione Tailwind
- **App.js**: Wrapper principale dell'applicazione

## 🔧 File di Configurazione

### `package.json`
Definisce dipendenze, scripts e metadata del progetto:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "gh-pages -d build"
  }
}
```

### `tailwind.config.js`
Configurazione Tailwind CSS con colori custom per applicazione medica.

### `.gitignore`
File e cartelle escluse dal version control (node_modules, build, etc.).

## 📝 File da Creare Manualmente

### 1. `/src/index.js`
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IBDDiagnosticApp from './components/IBDDiagnosticApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IBDDiagnosticApp />
  </React.StrictMode>
);
```

### 2. `/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

### 3. `/src/components/IBDDiagnosticApp.jsx`
Questo è il file principale creato nell'artifact React.

### 4. `/public/manifest.json`
```json
{
  "short_name": "IBD Tool",
  "name": "IBD Diagnostic Tool",
  "description": "Strumento diagnostico per malattie infiammatorie intestinali",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#2563eb",
  "background_color": "#ffffff"
}
```

### 5. `/public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://tuousername.github.io/ibd-diagnostic-tool/sitemap.xml
```

### 6. `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🚀 Setup Iniziale

### Passo 1: Crea la Struttura
```bash
# Crea cartelle
mkdir -p ibd-diagnostic-tool/src/components
mkdir -p ibd-diagnostic-tool/public

# Entra nella directory
cd ibd-diagnostic-tool
```

### Passo 2: Inizializza Git
```bash
git init
git add .
git commit -m "feat: initial commit - IBD diagnostic tool"
```

### Passo 3: Crea Repository GitHub
1. Vai su GitHub.com
2. Crea nuovo repository "ibd-diagnostic-tool"
3. NON inizializzare con README (ce l'hai già)
4. Connetti repository locale:

```bash
git remote add origin https://github.com/TUO-USERNAME/ibd-diagnostic-tool.git
git branch -M main
git push -u origin main
```

### Passo 4: Installa Dipendenze
```bash
npm install
```

### Passo 5: Avvia Development Server
```bash
npm start
```

### Passo 6: Build e Deploy
```bash
# Build per produzione
npm run build

# Deploy su GitHub Pages
npm run deploy
```

## 📦 File Opzionali per Produzione

### `.env.production`
```
REACT_APP_VERSION=1.0.0
REACT_APP_API_URL=https://api.example.com
GENERATE_SOURCEMAP=false
```

### `CHANGELOG.md`
Documenta versioni e modifiche:
```markdown
# Changelog

## [1.0.0] - 2025-10-07
### Added
- Algoritmo diagnostico gerarchico
- 6 marker immunoistochimici
- Atlante istologico interattivo
- Sistema scoring IBD
```

### `CONTRIBUTORS.md`
```markdown
# Contributors

## Core Team
- [Nome] - Initial development

## Contributors
- [Nome] - Feature X
- [Nome] - Bug fix Y
```

## 🔍 Sviluppo Futuro

Cartelle da aggiungere in future versioni:

```
src/
├── components/
│   ├── common/          # Componenti riutilizzabili
│   ├── findings/        # Sezione reperti
│   ├── ihc/            # Sezione IHC
│   └── atlas/          # Atlante istologico
├── utils/              # Utility functions
├── data/               # Database reperti/marker
├── hooks/              # Custom React hooks
└── tests/              # Unit tests
```

## 📊 Size Estimato

- **Dipendenze**: ~350MB (node_modules)
- **Build**: ~2MB (ottimizzato)
- **Repository**: ~50KB (solo codice)

## 🔐 File Sensibili (MAI committare)

- `.env.local`
- `.env.production.local`
- `npm-debug.log`
- Certificati SSL
- API keys
- Dati pazienti

---

**Per domande sulla struttura, aprire issue su GitHub**