# IBD Diagnostic Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-Standalone-E34F26.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![React](https://img.shields.io/badge/React-via_CDN-61DAFB.svg)](https://reactjs.org/)

Strumento diagnostico interattivo per anatomia patologica delle malattie infiammatorie croniche intestinali (IBD). **File HTML standalone** - nessuna installazione richiesta!

## 🎯 Caratteristiche

- **Algoritmo Diagnostico Gerarchico**: Sistema di scoring che distingue tra reperti patognomonici, altamente suggestivi e aspecifici
- **Database Immunoistochimico**: Marker IHC con cut-off validati, sensibilità e specificità
- **Atlante Istologico**: Descrizioni microscopiche dettagliate dei principali reperti
- **Diagnosi Differenziale**: Supporto per diagnosi differenziali e identificazione complicanze
- **Evidence-Based**: Basato su linee guida ECCO, WHO Classification e letteratura peer-reviewed
- **Zero Dipendenze**: File HTML singolo, funziona offline, nessun server richiesto

## 🔬 Patologie Coperte

- **Crohn Disease (CD)**
- **Ulcerative Colitis (UC)**
- **Colite Linfocitica**
- **Colite Collagena**
- **IBD non classificata (IBDU)**
- **Complicanze**: Displasia (LGD/HGD), superinfezioni (CMV)

## 🧬 Marker Immunoistochimici

| Marker | Target | Indicazione | Cut-off | Sensibilità | Specificità |
|--------|--------|-------------|---------|-------------|-------------|
| CD3 | Linfociti T | Colite linfocitica | >20/100 cell | 85% | 92% |
| CD68 | Macrofagi | Granulomi | Qualitativo | 95% | N/A |
| CMV | Antigeni CMV | Superinfezione | Presenza inclusi | 93% | 94% |
| p53 | Proteina p53 | Displasia | >60% o perdita | 75-85% | 80-90% |
| CD20 | Linfociti B | Follicoli linfoidi | Qualitativo | N/A | N/A |
| CD138 | Plasmacellule | Plasmacitosi | Qualitativo | N/A | N/A |

## 🚀 Utilizzo

### Metodo 1: Download Diretto

1. Scarica il file `index.html`
2. Apri con qualsiasi browser moderno (Chrome, Firefox, Safari, Edge)
3. Funziona anche **offline** - nessuna connessione internet necessaria dopo il primo caricamento

### Metodo 2: GitHub Pages

Visita: `https://tuousername.github.io/ibd-diagnostic-tool/`

### Metodo 3: Hosting Locale

```bash
# Se hai Python installato
python -m http.server 8000

# Oppure con Node.js
npx http-server

# Apri browser su http://localhost:8000
```

## 📖 Workflow Diagnostico

### 1. Selezione Reperti Istologici
Nella tab **Reperti**, selezionare i reperti microscopici nell'ordine:
1. **Alterazioni Architetturali** → Distorsione criptica, atrofia, plasmacitosi basale
2. **Pattern Infiammatorio** → Transmurale vs mucosale, ascessi criptici
3. **Displasia/Neoplasia** → LGD, HGD, p53 aberrante
4. **Diagnosi Differenziali Infettive** → CMV, Cryptosporidium
5. **Reperti Patognomonici** → Granulomi, banda collagena, CD3+

### 2. Immunoistochimica
Nella tab **Immunoistochimica**, selezionare i marker IHC eseguiti.

### 3. Interpretazione
Nella tab **Diagnosi**, l'algoritmo fornisce:
- Diagnosi principale con livello di confidenza (0-100%)
- Reperti supportivi
- Diagnosi differenziali/complicanze
- Raccomandazioni per approfondimenti

### 4. Atlante
Consultare l'**Atlante Istologico** per descrizioni microscopiche dettagliate.

## 🧪 Algoritmo Diagnostico

### Livello 1: Reperti Patognomonici (95% confidenza)
- Granulomi non-caseosi → **Crohn Disease**
- CD3+ >20/100 cellule → **Colite Linfocitica**
- Banda collagena >10μm → **Colite Collagena**

### Livello 2: Pattern Caratteristici (50-80% confidenza)
Sistema di scoring per UC vs CD:
- **UC**: Infiammazione mucosale + distorsione criptica + metaplasia Paneth
- **CD**: Infiammazione transmurale + pattern focale

### Livello 3: Complicanze Sovrapposte
- Displasia (LGD/HGD)
- Superinfezioni (CMV)
- Gestione urgente se necessario

## 💾 Persistenza Dati

I dati selezionati vengono salvati automaticamente nel **localStorage** del browser:
- ✅ I reperti selezionati persistono tra le sessioni
- ✅ Disclaimer accettato memorizzato
- ⚠️ **Privacy**: Tutti i dati sono locali, nessun invio a server esterni
- 🔒 Cancellare cronologia browser elimina i dati salvati

## ⚠️ Disclaimer

**Questo strumento è un supporto decisionale per anatomopatologi qualificati.**

- Non sostituisce il giudizio clinico
- La diagnosi definitiva richiede correlazione clinica, endoscopica e sierologica
- In caso di dubbi, consultare patologo esperto in IBD
- I cut-off IHC possono variare tra laboratori
- Non certificato come dispositivo medico

## 📚 Bibliografia di Riferimento

1. **ECCO Guidelines**: European Crohn's and Colitis Organisation consensus on the histopathology of inflammatory bowel disease
2. **WHO Classification of Tumours**: Digestive System Tumours, 5th Edition
3. **Geboes K et al.** (2000): "A reproducible grading scale for histological assessment of inflammation in ulcerative colitis" - *Gut*
4. **Langner C et al.** (2014): "Systematic review: histological remission in inflammatory bowel disease. Is 'complete' remission the new treatment paradigm?" - *Aliment Pharmacol Ther*
5. **Jauregui-Amezaga A et al.** (2013): "Role of anti-TNF therapy in CMV infection in IBD" - *J Crohns Colitis*

## 🛠️ Stack Tecnologico

- **HTML5** - Struttura
- **Tailwind CSS** (CDN) - Styling
- **React 18** (CDN) - UI Framework
- **Babel Standalone** - JSX transpilation
- **Vanilla JavaScript** - Logic

### Vantaggi File Standalone
- ✅ Nessuna build/compilazione
- ✅ Funziona offline
- ✅ Deploy immediato
- ✅ Nessuna dipendenza da Node.js
- ✅ Portabile: funziona da USB, email, intranet

### Considerazioni
- ⚠️ File ~200KB (tutto inline)
- ⚠️ Primo caricamento scarica React da CDN (~130KB)
- ⚠️ Dopo il primo caricamento, funziona offline se salvato localmente

## 🤝 Contributi

I contributi sono benvenuti! Per favore:

1. Fork il repository
2. Modifica il file `ibd-diagnostic-tool.html`
3. Testa localmente aprendo il file in browser
4. Crea Pull Request con:
   - Descrizione chiara delle modifiche
   - **Riferimenti bibliografici** per modifiche mediche
   - Screenshot se modifiche UI

### Linee Guida per Contributi Medici

- Aggiunte di nuovi marker IHC devono includere **cut-off validati** e **riferimenti bibliografici**
- Modifiche all'algoritmo devono essere supportate da **letteratura peer-reviewed**
- Citare sempre fonte scientifica per nuovi criteri diagnostici

## 📂 Struttura Repository

```
ibd-diagnostic-tool/
├── index.html          # App completa (file singolo)
├── README.md          # Documentazione
└── LICENSE            # MIT + Medical Disclaimer
```

## 📝 TODO / Roadmap

- [ ] Aggiunta scoring histologico quantitativo (Nancy Index, Geboes Score)
- [ ] Export report PDF
- [ ] Modalità stampa ottimizzata
- [ ] Versione in inglese
- [ ] Database immagini microscopiche di riferimento
- [ ] Modalità dark mode
- [ ] PWA (Progressive Web App) con installazione

## 🔧 Personalizzazione

Il file è completamente modificabile. Per personalizzare:

1. Apri `index.html` con editor di testo
2. Cerca la sezione `histologicalFindings` per modificare i reperti
3. Cerca `ihcMarkers` per aggiungere marker IHC
4. Cerca `histologyAtlas` per ampliare l'atlante
5. Salva e ricarica nel browser

## 📧 Contatti

- **Issues**: [GitHub Issues](https://github.com/tuousername/ibd-diagnostic-tool/issues)
- **Email**: [tua-email]
- **Discussioni**: [GitHub Discussions](https://github.com/tuousername/ibd-diagnostic-tool/discussions)

## 🌐 Compatibilità Browser

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ❌ Internet Explorer (non supportato)

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **MIT** - vedi file [LICENSE](LICENSE) per dettagli.

Include **Medical Disclaimer** esteso per protezione legale.

---

**Sviluppato per supportare anatomopatologi nella diagnosi differenziale delle IBD**

*Versione 1.0.0 - Ottobre 2025*

---

## 🎓 Per Studenti e Formazione

Questo strumento può essere utilizzato anche per **scopi didattici**:
- Studenti di medicina
- Specializzandi in anatomia patologica
- Corsi di gastroenterologia
- Training su diagnosi IBD

**Nota**: Sempre sotto supervisione di personale qualificato.