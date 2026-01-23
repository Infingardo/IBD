# IBD Diagnostic Tool v2.4.5

[![Version](https://img.shields.io/badge/version-2.4.5-blue.svg)](https://github.com/infingardo/IBD)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)
[![Status](https://img.shields.io/badge/status-production-brightgreen.svg)]()

**Sistema di scoring diagnostico evidence-based per IBD (Inflammatory Bowel Disease) - Biopsie Endoscopiche**

🔗 **[Demo Live](https://infingardo.github.io/IBD/)**

---

## 🎯 Cos'è

Tool di supporto alla diagnosi differenziale IBD per **biopsie endoscopiche**, progettato per patologi esperti.

**⚠️ DISCLAIMER**: Strumento di supporto, NON diagnosi automatica. Scoring % non validato prospetticamente.

---

## 🆕 Novità v2.4.5 (Gennaio 2026)

### 📋 Sintesi per Endoscopista

Box dedicato in cima al referto, pensato per copia-incolla:

```
COLITE ULCEROSA - FOLLOW-UP

Quiescenza: cieco, ascendente, trasverso
Attività: sigma, retto
NANCY MAX: 3

⚠️ DISPLASIA: LGD (sigma)
```

### 🔄 Follow-up IBD Nota

Checkbox "IBD nota" con:
- Diagnosi iniziale (RCU / Crohn / IBDU)
- Diagnosi attuale (per riclassificazioni)

Output patologo:
> "Quadro istologico di IBD compatibile, alla luce della storia clinica, con colite ulcerosa."

### ⚡ Diagnosi Veloce

Bottoni per diagnosi immediate:
- 🟢 Normale
- 🔵 Proctite UC / Colite sinistra / Pancolite
- 🟡 IBD in remissione
- 🟠 Ileite NAS
- 🟣 Crohn-like
- 🔬 Colite collagenosica / linfocitica
- 🦠 Colite infettiva
- 💔 Colite ischemica
- 💊 Colite da FANS
- 🔘 SCAD

### 📊 Nancy per Campione

Ogni sede colon mostra il proprio Nancy (0-4) + stato attiva/quiescente.

### ⚠️ Displasia

Campo dedicato per colon: Assente / Indefinita / LGD / HGD
- Non compare per ileo (corretto anatomicamente)
- Integrato con p53 (supporta se aberrante)

### 🧠 IBDU Scoring Migliorato

IBDU non più residuale ma con boost per features contraddittorie:
- Granulomi + pattern UC-like (+30)
- Skip lesions + cronicità (+25)
- Retto risparmiato + plasmacellule basali (+20)

### 🔍 Warning Cronicità

Nuovo alert: "Pattern cronico senza granulomi + retto risparmiato → UC possibile ma non esclusiva"

---

## ✨ Tutte le Feature

### Sistema di Scoring

| Feature | Descrizione |
|---------|-------------|
| Diagnosi differenziale | Crohn vs UC vs IBDU (%) |
| Pattern topografico | Skip lesions, retto/ileo |
| Criteri ileo dedicati | Anatomia corretta (villi, no cripte) |
| Criteri colon | Cripte, distorsione, Paneth |

### Nancy Histological Index

| Score | Significato | Rischio Recidiva 1y |
|-------|-------------|---------------------|
| **0** 🟢 | Remissione completa | <15% |
| **1** 🔵 | Alterazioni croniche | ~20% |
| **2** 🟡 | Attività lieve | 30-40% |
| **3** 🟠 | Attività moderata | 45-55% |
| **4** 🔴 | Attività severa | >60% |

*Battat R et al. 2019*

**Nancy applicabile se:**
- Diagnosi attuale = RCU
- Nessun campione ileale
- Nessun granuloma

### IHC Support

| Marker | Uso |
|--------|-----|
| CD68 | Pattern macrofagico (cluster vs diffuso) |
| p53 | Displasia (wild-type / overexpression / null) |
| CMV | Colite sovrapposta (negativo / dubbio / positivo) |

### Altre Coliti (DD)

- Colite collagenosica (banda ≥10μm)
- Colite linfocitica (IEL ≥20/100)
- Colite infettiva (pattern superficiale)
- Colite ischemica (atrofia, membrane ialine)
- Colite da FANS (apoptosi, ulcere a diaframma)
- SCAD (segmentale + retto indenne)

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

Funziona offline (single-file HTML).

---

## 📖 Workflow

### Prima Diagnosi

1. Aggiungi campioni con reperti
2. (Opzionale) Diagnosi veloce se già chiaro
3. Genera referto → Scoring + pattern

### Follow-up IBD Nota

1. Spunta "IBD nota"
2. Seleziona diagnosi iniziale/attuale
3. Aggiungi campioni
4. → Sintesi Endoscopista con Nancy MAX + sedi attive/quiescenti

---

## 📚 Bibliografia

### Nancy Index
1. **Marchal-Bressenot A** et al. *Gut* 2017;66:43-49. [PMID: 26464414](https://pubmed.ncbi.nlm.nih.gov/26464414)
2. **Battat R** et al. *Clin Gastroenterol Hepatol* 2019;17:2371-81. [PMID: 31128305](https://pubmed.ncbi.nlm.nih.gov/31128305)

### Criteri IBD
3. **Geboes K** et al. *Gut* 2000;47:404-409. [PMID: 10940279](https://pubmed.ncbi.nlm.nih.gov/10940279)
4. **Langner C** et al. *Virchows Arch* 2015;466:613-626. [PMID: 25791242](https://pubmed.ncbi.nlm.nih.gov/25791242)

---

## ⚠️ Disclaimer

**Strumento di supporto, NON diagnosi automatica.**

| ❌ Non sostituisce | ✅ Uso appropriato |
|-------------------|-------------------|
| Valutazione microscopica | Supporto DD |
| Giudizio clinico | Standardizzazione |
| Validazione prospettica | Monitoraggio UC (Nancy) |

La **diagnosi finale** rimane responsabilità del patologo.

---

## 📊 Statistiche

| Metrica | Valore |
|---------|--------|
| File size | ~85KB |
| Sedi anatomiche | 9 |
| Diagnosi veloci | 13 |
| Scoring systems | 2 (IBD + Nancy) |

---

## 🗂️ Repository

```
/IBD
├── index.html              ← Tool v2.4.5
├── README.md               ← Questo file
├── CHANGELOG_v2.4.0.md     
├── NANCY_INDEX_QUICK_GUIDE.md
└── LICENSE.md
```

---

## 📞 Contatti

- **Email**: [filippo.bianchi@asst-fbf-sacco.it](mailto:filippo.bianchi@asst-fbf-sacco.it)
- **GitHub**: [github.com/infingardo/IBD](https://github.com/infingardo/IBD)
- **Istituzione**: SC Anatomia Patologica, ASST Fatebenefratelli-Sacco, Milano

---

## 📄 License

MIT License - Vedi [LICENSE.md](LICENSE.md)

---

<div align="center">

**v2.4.5 Production** | Gennaio 2026

📋 Sintesi Endoscopista • 🔄 Follow-up IBD • ⚡ Diagnosi Veloce • 📊 Nancy per campione

**[Demo Live](https://infingardo.github.io/IBD/)** • **[Report Bug](https://github.com/infingardo/IBD/issues)**

</div>
