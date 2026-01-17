# IBD Diagnostic Tool v2.2.2

[![Version](https://img.shields.io/badge/version-2.2.2-blue.svg)](https://github.com/infingardo/IBD)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)
[![Status](https://img.shields.io/badge/status-production-brightgreen.svg)]()

**Sistema di scoring diagnostico evidence-based per IBD (Inflammatory Bowel Disease) con Nancy Histological Index integrato.**

🔗 **[Demo Live](https://infingardo.github.io/IBD/)** | 📚 **[Documentazione](https://github.com/infingardo/IBD/tree/main/docs)**

---

## 📋 Indice

- [Caratteristiche](#-caratteristiche)
- [Novità v2.2.2](#-novità-v222)
- [Demo](#-demo)
- [Installazione](#-installazione)
- [Uso](#-uso)
- [Nancy Histological Index](#-nancy-histological-index)
- [Bibliografia](#-bibliografia)
- [Validazione Scientifica](#-validazione-scientifica)
- [Roadmap](#-roadmap)
- [Contributi](#-contributi)
- [License](#-license)
- [Disclaimer](#%EF%B8%8F-disclaimer-medico)

---

## ✨ Caratteristiche

### Sistema di Scoring Diagnostico

- **Diagnosi differenziale IBD**: Crohn Disease vs Ulcerative Colitis vs IBD-Unclassified
- **Scoring ponderato validato**: Basato su criteri istologici WHO 2019
- **Overlap detection**: Identificazione automatica pattern IBDU
- **Validazione IHC**: Supporto per CD3, CD68, p53 pattern recognition
- **Disclaimer trasparente**: Chiarezza sui limiti della validazione algoritmo

### Nancy Histological Index (v2.2) 🆕

- **Score 0-4 per attività UC**: Sistema validato (Marchal-Bressenot 2017, PMID: 26464414)
- **Calcolo automatico**: Da reperti morfologici esistenti
- **Interpretazione clinica**: Rischio recidiva + raccomandazioni terapeutiche (Battat 2019)
- **Display condizionale**: Nascosto automaticamente se pattern Crohn (v2.2.2)
- **Display visivo**: Badge colorato con dettagli parametri

### Fix Scientifiche Evidence-Based

1. ✅ **CD3 range corretto**: 0-100 IEL/100 cellule epiteliali (Mahadeva 2002, Chang 2005)
2. ✅ **Scoring granulomi**: Senza penalità UC inappropriata (Maeng 2004)
3. ✅ **Pattern transmurale**: Nomenclatura corretta biopsia vs resezione
4. ✅ **CD68 qualitativo**: Valutazione pattern macrofagico, non quantitativo (v2.2.2)
5. ✅ **p53 pattern recognition**: WHO 2019 patterns (wild-type/equivocal/overexpression/null)
6. ✅ **Overlap detection**: Alert automatico per pattern sovrapposti IBDU
7. ✅ **Bibliografia integrata**: 14 PMID con link PubMed diretti
8. ✅ **Disclaimer rafforzato**: Chiarezza su validazione algoritmo (v2.2.2)

### Features Tecniche

- 📱 **Responsive design**: Mobile, tablet, desktop
- 💾 **Salvataggio automatico**: localStorage (nessun server richiesto)
- 🖨️ **Export referto**: Stampa PDF professionale
- 🔍 **Tooltip interattivi**: Bibliografia con link PubMed cliccabili
- 🌐 **Single-page app**: HTML autocontenuto, funziona offline
- ⚡ **Zero dependencies**: React/Tailwind via CDN, nessuna installazione

---

## 🆕 Novità v2.2.2

### Fix CD68 Qualitativo
- **Rimosso**: Input numerico "cellule CD68+ per HPF" (inappropriato)
- **Aggiunto**: Dropdown pattern macrofagico (normale/incrementato/aggregati)
- **Warning**: "⚠️ CD68 marca macrofagi genericamente. I granulomi si diagnosticano all'H&E."
- **Razionale**: CD68 non quantifica granulomi, solo pattern macrofagico

### Nancy Index Condizionale
- **Mostrato solo quando appropriato**: Nancy nascosto se granulomi presenti o Crohn >70%
- **Avviso esplicito**: "Nancy non calcolato: Pattern Crohn" quando non applicabile
- **Logica**: Nancy specifico per UC, non ha senso in Crohn

### Disclaimer Rafforzato
- **Scoring %**: Esplicito "NON validato clinicamente" con warning visibile
- **Pesi reperti**: Chiarezza su base letteratura ma senza validazione prospettica
- **Nancy prognostico**: Dati rischio recidiva correttamente attribuiti a Battat 2019
- **Uso corretto**: "Supporto decisionale, non diagnosi definitiva"

---

## 🎯 Demo

### Workflow Tipico

```
1. Inserimento dati clinici
   ├─ Età, sesso, quesito diagnostico
   └─ Indicazione clinica

2. Campioni e reperti
   ├─ Siti anatomici (colon dx/sx, retto, ileo, etc)
   ├─ Reperti morfologici (architettura, infiammazione, etc)
   └─ Immunoistochimica opzionale (CD3, p53, CD68)

3. Referto generato automaticamente
   ├─ 📊 Scoring diagnostico (Crohn/UC/IBDU %)
   │  └─ ⚠️ "NON validato clinicamente" (disclaimer v2.2.2)
   ├─ 📋 Nancy Index (Score 0-4 per UC) ← SE applicabile
   │  └─ Hidden se granulomi/Crohn >70% (v2.2.2)
   └─ 📄 Referto anatomopatologico formattato
```

### Screenshot

![Scoring Diagnostico](docs/images/scoring.png)
*Analisi scoring con overlap detection e disclaimer*

![Nancy Index](docs/images/nancy.png)
*Nancy Histological Index con badge colorato 0-4*

![Referto](docs/images/report.png)
*Referto anatomopatologico completo*

---

## 🚀 Installazione

### Opzione 1: Uso Online (Consigliato)

Visita: **[https://infingardo.github.io/IBD/](https://infingardo.github.io/IBD/)**

### Opzione 2: Download Locale

```bash
# Clone repository
git clone https://github.com/infingardo/IBD.git
cd IBD

# Apri index.html in browser
open index.html  # Mac
start index.html # Windows
xdg-open index.html # Linux
```

### Opzione 3: Server Locale

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Apri http://localhost:8000
```

**Nessuna installazione richiesta** - file HTML singolo autocontenuto!

---

## 📖 Uso

### Quick Start

1. **Apri il tool** nel browser
2. **Tab "Dati Clinici"**: Inserisci età, sesso, indicazione
3. **Tab "Campioni"**: 
   - Aggiungi campioni (es. "A: Colon destro")
   - Seleziona reperti istologici
   - Opzionale: Aggiungi dati IHC (CD3, CD68 pattern, p53)
4. **Tab "Referto"**:
   - Visualizza scoring diagnostico con disclaimer
   - Visualizza Nancy Index (se UC, senza granulomi)
   - Stampa referto PDF

### Nancy Index - Come Funziona

Il Nancy Index si calcola **automaticamente** dai reperti che inserisci:

| Score | Significato | Rischio Recidiva 1y* | Azione |
|-------|-------------|----------------------|---------|
| **0** 🟢 | Remissione completa | <15% | Monitoraggio |
| **1** 🔵 | Remissione con alterazioni | ~20% | Mantenimento |
| **2** 🟡 | Attività lieve | 30-40% | Ottimizzazione |
| **3** 🟠 | Attività moderata | 45-55% | Step-up |
| **4** 🔴 | Attività severa con ulcerazione | >60% | Escalation |

*Dati prognostici da Battat R et al. 2019 (PMID: 31128305)

**Parametri valutati:**
- Ulcerazioni (sì/no) → Se sì, Nancy 4 automatico
- Infiltrato neutrofilo (assente/lieve/moderato/severo)
- Ascessi criptici (presenti/assenti)
- Alterazioni croniche architetturali (sì/no)

**⚠️ Nancy nascosto se:**
- Granulomi epitelioidi presenti (pattern Crohn)
- Score Crohn >70% (diagnosi Crohn probabile)

📚 **Guida completa**: [Nancy Index Quick Guide](docs/NANCY_INDEX_QUICK_GUIDE.md)

---

## 📚 Bibliografia

### Nancy Histological Index

1. **Marchal-Bressenot A**, Salleron J, Boulagnon-Rombi C, et al. Development and validation of the Nancy histological index for UC. *Gut* 2017;66(1):43-49. [PMID: 26464414](https://pubmed.ncbi.nlm.nih.gov/26464414)
   - Studio originale validazione Nancy Index 0-4
   - Correlazione con attività endoscopica

2. **Mosli MH**, Feagan BG, Zou G, et al. Histologic scoring indices for evaluation of disease activity in UC. *Inflamm Bowel Dis* 2017;23(7):1108-1119. [PMID: 28445246](https://pubmed.ncbi.nlm.nih.gov/28445246)
   - Revisione sistematica scoring systems UC
   - Validazione psicometrica Nancy

3. **Battat R**, Duijvestein M, Guizzetti L, et al. Histologic healing as a therapeutic target in IBD. *Clin Gastroenterol Hepatol* 2019;17(12):2371-2381. [PMID: 31128305](https://pubmed.ncbi.nlm.nih.gov/31128305)
   - **Nancy come target terapeutico treat-to-target**
   - **Dati prognostici rischio recidiva score 0-4**

### Criteri Diagnostici IBD

4. **Geboes K**, Riddell R, Ost A, et al. A reproducible grading scale for histological assessment of inflammation in UC. *Gut* 2000;47(3):404-409. [PMID: 10940279](https://pubmed.ncbi.nlm.nih.gov/10940279)

5. **Tanaka M**, Mazzoleni G, Riddell RH. Distribution of Paneth cells in the appendix and colon. *Gut* 1992;33(8):1190-1193. [PMID: 1427370](https://pubmed.ncbi.nlm.nih.gov/1427370)

6. **Langner C**, Aust D, Ensari A, et al. Histology of IBD - review with a practical guide for pathologists. *Virchows Arch* 2015;466(6):613-626. [PMID: 25791242](https://pubmed.ncbi.nlm.nih.gov/25791242)

### Validazione IHC

7. **Mahadeva U**, Martin JP, Patel NK, Price AB. Granulomatous UC: a re-appraisal of the mucosal granuloma in the distinction of Crohn's disease from UC. *Histopathology* 2002;40(3):235-244. [PMID: 12121233](https://pubmed.ncbi.nlm.nih.gov/12121233)

8. **Voltaggio L**, Montgomery EA, Lam-Himlin D. A clinical and histopathologic focus on eosinophilic esophagitis and eosinophilic gastroenteritis. *Arch Pathol Lab Med* 2011;135(10):1327-1334. [PMID: 21970487](https://pubmed.ncbi.nlm.nih.gov/21970487)

9. **Levine DS**, Haggitt RC. Normal histology of the colon. *Am J Surg Pathol* 1989;13(12):966-984. [PMID: 2589951](https://pubmed.ncbi.nlm.nih.gov/2589951)

10. **Maeng L**, Lee A, Choi K, et al. Granulomatous inflammation in Crohn's disease patients after infliximab therapy. *Histopathology* 2004;45(3):298. [PMID: 15330813](https://pubmed.ncbi.nlm.nih.gov/15330813)

### Standards

11. **WHO Classification of Tumours Editorial Board**. Digestive System Tumours. 5th ed. Lyon: IARC Press; 2019.

12. **ECCO Consensus**. European evidence-based Consensus on the diagnosis and management of Crohn's disease. *J Crohns Colitis* 2010;4(1):7-27.

**Bibliografia completa** (14 PMID): Tutti i riferimenti hanno link PubMed diretti nei tooltip del tool.

---

## 🔬 Validazione Scientifica

### Evidenza Clinica

Il tool integra criteri diagnostici da:
- **WHO 5th Edition 2019** (standard diagnostici)
- **ECCO Guidelines** (European Crohn's and Colitis Organisation)
- **Studi validati peer-reviewed** (14 pubblicazioni PMID)

### Nancy Index

- **Validato prospetticamente**: Marchal-Bressenot 2017 (n=102 pazienti UC)
- **Dati prognostici**: Battat 2019 (correlazione remissione istologica con outcome)
- **Concordanza inter-osservatore**: κ=0.60-0.75 (moderata-buona)

### Scoring Diagnostico %

⚠️ **IMPORTANTE**: L'algoritmo di scoring % (Crohn/UC/IBDU) è:
- **Basato su letteratura** (pesi da studi pubblicati)
- **NON validato prospetticamente** su casistica indipendente
- **NON certificato** come dispositivo medico
- Da usare come **supporto decisionale**, non diagnosi definitiva

### Testing & Validazione

**Status attuale**: Tool in uso presso SC Anatomia Patologica, ASST Fatebenefratelli-Sacco, Milano

**Validazione raccomandata**:
1. Test retrospettivo su 10-20 casi con diagnosi certa (gold standard)
2. Calcolo Cohen's Kappa per agreement (target ≥0.70)
3. Validazione Nancy Index su casistica locale UC
4. Feedback da gastroenterologi su utilità clinica

**Testing checklist**: [docs/CHANGELOG_v2.2.md](docs/CHANGELOG_v2.2.md)

---

## 🗺️ Roadmap

### v2.3 (Pianificata)

- [ ] **Validazione prospettica** scoring % interno
- [ ] **Geboes Score** (alternativa Nancy più granulare)
- [ ] **Riley Histological Score** (UC remission index)
- [ ] **CDEIS Histological** (Crohn endoscopic-histologic correlation)
- [ ] **Nancy trend chart** (follow-up longitudinale pazienti)
- [ ] **Export Nancy in PDF** referto

### v2.4+ (Future)

- [ ] **AI integration** per predizione Nancy da WSI
- [ ] **Multi-language support** (inglese)
- [ ] **Database export** (CSV per analisi statistica)
- [ ] **API integration** (LIS/PACS)
- [ ] **Mobile app** (PWA)

---

## 🤝 Contributi

I contributi sono benvenuti! Questo è un progetto open-source per la comunità patologica.

### Come Contribuire

1. **Fork** il repository
2. **Crea branch** per la tua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** le modifiche (`git commit -m 'Add AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. **Apri Pull Request**

### Linee Guida

- ✅ Modifiche devono essere **evidence-based** (citare bibliografia)
- ✅ Test su casi reali prima di PR
- ✅ Documentazione aggiornata
- ✅ Codice commentato (italiano OK)
- ✅ Mantenere compatibilità file singolo HTML
- ✅ Disclaimer trasparenza su validazione

### Bug Reports & Feature Requests

Usa [GitHub Issues](https://github.com/infingardo/IBD/issues) per:
- 🐛 Segnalazione bug
- 💡 Richieste feature
- 📚 Suggerimenti bibliografia
- 🔬 Validazione scientifica
- 📊 Feedback su usabilità

---

## 📄 License

Questo progetto è rilasciato sotto licenza **MIT License**.

```
MIT License

Copyright (c) 2025 IBD Diagnostic Tool Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

**Vedi**: [LICENSE.md](LICENSE.md) per testo completo.

---

## ⚠️ Disclaimer Medico

**IMPORTANTE - LEGGERE ATTENTAMENTE**

Questo tool è un **supporto decisionale** per patologi esperti, NON un sistema diagnostico autonomo.

### Limitazioni

- ❌ **Non sostituisce** la valutazione morfologica microscopica diretta
- ❌ **Non sostituisce** il giudizio clinico del patologo
- ❌ **Non sostituisce** la correlazione clinico-patologica
- ❌ **Non è certificato** come dispositivo medico
- ❌ **Scoring % NON validato prospetticamente** su casistica indipendente

### Validazione

- ✅ **Nancy Index**: Validato prospetticamente (Marchal-Bressenot 2017, Battat 2019)
- ⚠️ **Scoring diagnostico %**: Basato su letteratura ma **SENZA validazione prospettica**
- ⚠️ **Pesi reperti**: Derivati da studi pubblicati ma **NON testati su casistica indipendente**

### Uso Appropriato

- ✅ Supporto alla diagnosi differenziale IBD
- ✅ Standardizzazione refertazione
- ✅ Monitoraggio attività malattia (Nancy Index)
- ✅ Training e didattica
- ✅ Ricerca e analisi retrospettiva

### Responsabilità

- La **diagnosi finale** rimane responsabilità del patologo referente
- Il tool deve essere **validato localmente** su casistica propria
- Score e interpretazioni sono **suggerimenti**, non verità assolute
- Integrare sempre con: **clinica, endoscopia, sierologia, imaging**
- **Nancy Index**: Specifico per UC, non applicabile a Crohn (v2.2.2: nascosto automaticamente se inappropriato)

### Privacy & Dati

- **Nessun dato paziente** viene trasmesso a server esterni
- Tutti i dati salvati **localmente** nel browser (localStorage)
- Cancellare cronologia browser elimina tutti i dati
- **Anonimizzare** sempre i dati paziente prima di condivisione screenshot

---

## 📞 Contatti & Support

- **GitHub Issues**: [github.com/infingardo/IBD/issues](https://github.com/infingardo/IBD/issues)
- **GitHub Discussions**: [github.com/infingardo/IBD/discussions](https://github.com/infingardo/IBD/discussions)
- **Istituzione**: SC Anatomia Patologica, ASST Fatebenefratelli-Sacco, Milano

---

## 🙏 Acknowledgments

**Nancy Histological Index** sviluppato e validato da:
- Marchal-Bressenot A et al., Nancy University Hospital, France

**Dati prognostici Nancy** da:
- Battat R et al., University of California San Diego, USA

**Bibliografia evidence-based** da pubblicazioni peer-reviewed in:
- *Gut*, *Inflammatory Bowel Diseases*, *Clinical Gastroenterology and Hepatology*, *American Journal of Surgical Pathology*, *Histopathology*, *Virchows Archiv*

**Tool development**:
- IBD Diagnostic Tool Project Contributors
- Comunità patologica italiana

---

## 📊 Statistiche

- **Version**: 2.2.2
- **Release date**: Gennaio 2025
- **File size**: 74KB (single HTML file)
- **Lines of code**: 1,285
- **Bibliografia**: 14 PMID
- **Scoring systems**: 2 (IBD diagnostico + Nancy UC)
- **Languages**: JavaScript (React), HTML5, CSS3 (Tailwind)
- **Nancy Index**: 0-4 (5 livelli attività UC)

---

<div align="center">

**[⬆ Torna su](#ibd-diagnostic-tool-v222)**

Made with ❤️ for the pathology community

**[🌐 Demo Live](https://infingardo.github.io/IBD/)** • **[📚 Documentation](docs/)** • **[🐛 Report Bug](https://github.com/infingardo/IBD/issues)** • **[💡 Request Feature](https://github.com/infingardo/IBD/issues)**

---

**v2.2.2**: Fix CD68 qualitativo • Nancy condizionale • Disclaimer rafforzato  
**Nancy Index**: 0-4 (5 livelli), validato Marchal-Bressenot 2017, dati prognostici Battat 2019

</div>
