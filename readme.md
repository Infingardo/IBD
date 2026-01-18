# IBD Diagnostic Tool v2.4.1

[![Version](https://img.shields.io/badge/version-2.4.1-blue.svg)](https://github.com/infingardo/IBD)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)
[![Status](https://img.shields.io/badge/status-production-brightgreen.svg)]()

**Sistema di scoring diagnostico evidence-based per IBD (Inflammatory Bowel Disease) - Biopsie Endoscopiche**

🔗 **[Demo Live](https://infingardo.github.io/IBD/)** | 📚 **[Changelog v2.4.1](CHANGELOG_v2.4.1.md)**

---

## 🎯 Cos'è

Tool di supporto alla diagnosi differenziale IBD per **biopsie endoscopiche**, con:
- Scoring diagnostico Crohn vs UC vs IBDU
- **Criteri dedicati per ileo terminale** (novità v2.4.0)
- Nancy Histological Index per UC (solo colon)
- IHC support (CD68 pattern, p53, **CMV status** v2.4.1)

**⚠️ DISCLAIMER**: Strumento di supporto per patologi esperti, NON diagnosi automatica. Scoring % non validato prospetticamente.

---

## 🆕 Novità v2.4.1 (Gennaio 2026)

### 🦠 CMV Status

Aggiunto nel pannello IHC per IBD refrattarie/steroido-resistenti:

| Valore | Significato |
|--------|-------------|
| Non eseguito | Default |
| Negativo | Assenza di CMV |
| Dubbio | Rare cellule positive / focale |
| Positivo | Inclusions e/o IHC diffusamente + |

**Warning automatico** se CMV positivo/dubbio:
- Considerare colite da CMV sovrapposta
- Valutare ganciclovir e riduzione immunosoppressione
- CMV **non influenza scoring** Crohn/UC (è complicanza sovrapposta)

**Quando cercare CMV**: UC refrattaria a steroidi, UC severa/fulminante, flare durante immunosoppressione.

---

## 🔬 Novità v2.4.0 (Gennaio 2026)

### 🔬 Criteri ILEO Dedicati

**Problema risolto**: Le versioni precedenti applicavano criteri colon all'ileo (biologicamente scorretto).

| Criterio | Ileo (v2.4.0) | Colon |
|----------|---------------|-------|
| Architettura | Villi (atrofia) | Cripte (distorsione) |
| Paneth | Fisiologiche ❌ | Metaplasia ✅ |
| Neutrofili | Lamina propria | Intraepiteliali |
| Granulomi peso | +150 Crohn | +100 Crohn |

**Findings ileo**:
- Granulomi epitelioidi (+150 Crohn - peso maggiorato)
- Erosioni/ulcerazioni aftose
- Iperplasia linfoide
- Atrofia villi
- Neutrofili lamina propria
- Edema lamina propria
- Plasmacellule aumentate
- Fibrosi sottomucosa

### 🚫 Eliminati Reperti Transmurali

Rimossi perché **impossibili in biopsia endoscopica** (mucosa + sottomucosa superficiale):
- ❌ Infiltrato transmurale
- ❌ Aggregati linfoidi transmurali
- ❌ Fissurazioni

### 📍 Sedi Aggiornate

```
v2.4.0: ileo, cieco, ascendente, trasverso, discendente, sigma, retto, pouch, anastomosi

Eliminati: appendice (pezzo operatorio), altro (troppo generico)
Aggiunti: pouch (IPAA), anastomosi (follow-up chirurgico)
```

### 📋 Nancy Index Solo Colon

Nancy ora **disabilitato automaticamente** se:
- Almeno 1 campione ileale presente
- Granulomi presenti
- Score Crohn >70%

**Rationale**: Nancy validato esclusivamente per UC colica (Marchal-Bressenot 2017).

### 🎨 UI Dinamica

Il form cambia automaticamente in base alla sede selezionata:
- Selezioni "ileo" → criteri ileo
- Selezioni "sigma" → criteri colon
- Feedback visivo: "🔬 Criteri ILEO" vs "🔬 Criteri COLON"

---

## ✨ Caratteristiche

### Sistema di Scoring

- **Diagnosi differenziale**: Crohn vs UC vs IBDU (%)
- **Pattern topografico**: Skip lesions, coinvolgimento retto/ileo
- **Overlap detection**: Alert automatico IBDU
- **Validazione clinica**: Warning per pattern atipici

### Nancy Histological Index

| Score | Significato | Rischio Recidiva 1y* |
|-------|-------------|----------------------|
| **0** 🟢 | Remissione completa | <15% |
| **1** 🔵 | Remissione con alterazioni | ~20% |
| **2** 🟡 | Attività lieve | 30-40% |
| **3** 🟠 | Attività moderata | 45-55% |
| **4** 🔴 | Attività severa con ulcerazione | >60% |

*Battat R et al. 2019 (PMID: 31128305)

**⚠️ Nancy applicabile SOLO se**:
- Nessun campione ileale
- Nessun granuloma
- Score Crohn ≤70%

### IHC Support

- **CD68**: Pattern macrofagico qualitativo (cluster transmurale vs diffuso mucosa)
- **p53**: Pattern WHO 2019 (wild-type / overexpression / null)
  - ⚠️ p53 aberrante = Warning displasia (separato da scoring IBD)

### Features Tecniche

- 📱 Responsive (mobile/tablet/desktop)
- 💾 Salvataggio automatico (localStorage)
- 🖨️ Export PDF
- 🌐 Single-file HTML (funziona offline)
- ⚡ Zero dependencies server-side

---

## 🚀 Installazione

### Online (Consigliato)

**[https://infingardo.github.io/IBD/](https://infingardo.github.io/IBD/)**

### Locale

```bash
git clone https://github.com/infingardo/IBD.git
cd IBD
open index.html
```

---

## 📖 Uso Rapido

1. **Seleziona sede** → Form si adatta (ileo vs colon)
2. **Inserisci reperti** → Criteri appropriati per anatomia
3. **Aggiungi IHC** (opzionale) → CD68 pattern, p53
4. **Genera referto** → Scoring + Nancy (se applicabile) + Validazioni

### Workflow Ileo

```
Sede: Ileo terminale
↓
Form mostra: granulomi, erosioni aftose, atrofia villi, iperplasia linfoide...
↓
Scoring: Criteri ileo-specific (granulomi +150 vs +100 colon)
↓
Nancy: DISABILITATO (ileo presente)
```

### Workflow Colon UC

```
Sede: Sigma, Retto
↓
Form mostra: neutrofili intraepiteliali, ascessi criptici, distorsione architettura...
↓
Scoring: Criteri colon
↓
Nancy: ABILITATO (0-4) se no granulomi e Crohn ≤70%
```

---

## 📚 Bibliografia

### Nancy Index
1. **Marchal-Bressenot A** et al. *Gut* 2017;66:43-49. [PMID: 26464414](https://pubmed.ncbi.nlm.nih.gov/26464414) - Validazione Nancy 0-4
2. **Battat R** et al. *Clin Gastroenterol Hepatol* 2019;17:2371-81. [PMID: 31128305](https://pubmed.ncbi.nlm.nih.gov/31128305) - Dati prognostici

### Criteri IBD
3. **Geboes K** et al. *Gut* 2000;47:404-409. [PMID: 10940279](https://pubmed.ncbi.nlm.nih.gov/10940279)
4. **Langner C** et al. *Virchows Arch* 2015;466:613-626. [PMID: 25791242](https://pubmed.ncbi.nlm.nih.gov/25791242)

### Anatomia
5. **Junqueira LC**, Carneiro J. *Basic Histology* 13th ed. McGraw-Hill 2013
6. **Odze RD**. *Surgical Pathology of the GI Tract*. 3rd ed. Saunders 2015

---

## ⚠️ Disclaimer Medico

**Questo tool è supporto decisionale, NON diagnosi automatica.**

### Limitazioni
- ❌ Non sostituisce valutazione microscopica diretta
- ❌ Non sostituisce giudizio clinico del patologo
- ❌ Scoring % NON validato prospetticamente
- ❌ Non certificato come dispositivo medico

### Validato
- ✅ Nancy Index (Marchal-Bressenot 2017, Battat 2019)
- ✅ Criteri morfologici (letteratura peer-reviewed)

### Uso Appropriato
- ✅ Supporto diagnosi differenziale IBD
- ✅ Standardizzazione refertazione
- ✅ Monitoraggio attività UC (Nancy)
- ✅ Training e didattica

### Responsabilità
La **diagnosi finale** rimane responsabilità del patologo. Integrare sempre con clinica, endoscopia, sierologia.

---

## 📊 Statistiche v2.4.0

| Metrica | Valore |
|---------|--------|
| File size | ~75KB |
| Righe codice | ~1500 |
| Scoring systems | 2 (IBD + Nancy) |
| Bibliografia PMID | 14 |
| Sedi anatomiche | 9 |
| Findings ileo | 8 |
| Findings colon | 8 |

---

## 🗂️ File Repository

```
/IBD
├── index.html              ← Tool v2.4.0 Production
├── README.md               ← Questo file
├── CHANGELOG_v2.4.0.md     ← Changelog dettagliato
├── BUGFIX_SUMMARY_v2.4.0.md← Bug fix applicati
├── NANCY_INDEX_QUICK_GUIDE.md ← Guida Nancy
└── LICENSE.md
```

---

## 📞 Contatti

- **Email**: [filippo.bianchi@asst-fbf-sacco.it](mailto:filippo.bianchi@asst-fbf-sacco.it)
- **GitHub Issues**: [github.com/infingardo/IBD/issues](https://github.com/infingardo/IBD/issues)
- **Istituzione**: SC Anatomia Patologica, ASST Fatebenefratelli-Sacco, Milano

---

## 📄 License

MIT License - Vedi [LICENSE.md](LICENSE.md)

---

<div align="center">

**v2.4.1 Production** | Gennaio 2026

🔬 Criteri ILEO dedicati • 📋 Nancy solo colon • 🦠 CMV status • 🚫 Eliminati transmurali

**[Demo Live](https://infingardo.github.io/IBD/)** • **[Changelog](CHANGELOG_v2.4.0.md)** • **[Report Bug](https://github.com/infingardo/IBD/issues)**

</div>
