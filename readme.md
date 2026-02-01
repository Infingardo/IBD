# IBD Diagnostic Tool v3.0.7 "Epistemic Guard"

**Strumento di supporto decisionale per la diagnosi istologica delle malattie infiammatorie croniche intestinali (IBD)**

> *"Il vetrino non mente, il reagente sì."*

---

## 🎯 Scopo

Questo tool **non fa diagnosi**. Formalizza il ragionamento del patologo esperto, rendendo espliciti:
- I criteri morfologici valutati
- Il peso diagnostico di ogni reperto
- Le contraddizioni e i limiti del campionamento
- Quando l'istologia da sola non basta

**Target**: Patologi esperti e patologi in formazione sotto supervisione.

---

## 📋 Funzionalità Principali

### Workflow Clinico
1. **Selezione sedi** - Griglia visiva per mapping endoscopico (7 sedi standard + pouch/anastomosi)
2. **Compilazione findings** - Form specifici per ileo vs colon
3. **IHC opzionale** - p53, CD68, CMV
4. **Referto automatico** - Con interpretazione graduata e note metodologiche

### Diagnosi Veloce (Training)
- Pre-compilazione automatica per casi tipici (RCU, Crohn, SCAD, coliti microscopiche)
- **Watermark "SIMULAZIONE DIDATTICA"** per casi auto-generati
- Checkbox obbligatoria "Ho verificato i reperti sul vetrino"

### Scoring Orientativo
- Score Crohn / RCU / IBDU con etichette qualitative (Basso, Borderline, Compatibile, Forte)
- **IBDU emerge da contraddizione, non da debolezza** (score bassi ≠ IBDU)
- Nota automatica quando granulomi trainano lo score

### Nancy Histological Index
- Calcolato solo per pattern UC-like
- **Warning esplicito** se pattern complessivo non UC-classico
- Ranking corretto dei neutrofili (fix lieve→moderata)

### Pattern Topografico
- Distribuzione continua vs discontinua
- Skip lesions **solo se sedi intermedie campionate** (altrimenti "indeterminabile")
- Warning per retto risparmiato, campionamento incompleto

### Alert Automatici
- 🏥 **Flag MDT** per casi complessi (pattern contraddittorio, IBDU alto, displasia+p53)
- ⚠️ **Granulomi ileali isolati** → DD infettiva obbligatoria (TBC, Yersinia)
- ⚠️ **SCAD** → diagnosi di esclusione
- ⚠️ **Crohn senza granulomi** → biopsia mucosa non dimostra transmuralità

---

## 🧠 Filosofia di Design

### Principi Epistemici

1. **Incertezza dichiarata**
   - Il tool sa quando non sa
   - IBDU = contraddizione, non pattumiera
   - Note metodologiche esplicite per pattern ambigui

2. **Morfologia al centro**
   - IHC come supporto, non sostituto
   - "Il grading displastico è MORFOLOGICO. p53 non lo definisce."
   - Granulomi pesati e qualificati (mucin granuloma ≠ Crohn)

3. **Limite dello strumento**
   - "Biopsia mucosa NON è lo strumento per dimostrare transmuralità"
   - Campionamento incompleto → non fingo di sapere

4. **Simulazione ≠ Caso reale**
   - Watermark visivo
   - Checkbox conferma
   - MDT flag disabilitato per simulazioni

### Scuola Rosai
- Pattern recognition > checklist
- Correlazione clinica sempre richiesta
- Diagnosi differenziale ragionata

---

## ⚠️ Disclaimer

```
STRUMENTO DI SUPPORTO DECISIONALE
NON VALIDATO CLINICAMENTE

- Non sostituisce il giudizio del patologo
- Non utilizzabile come unico criterio diagnostico
- Richiede sempre correlazione clinico-endoscopica
- Percentuali non comparabili tra casi diversi
- Scoring orientativo, NON validato su casistica esterna
```

---

## 🔧 Requisiti Tecnici

- Browser moderno (Chrome, Firefox, Safari, Edge)
- JavaScript abilitato
- Nessuna installazione richiesta (file HTML standalone)
- Funziona offline dopo il primo caricamento
- Dati salvati in localStorage (persistenti per browser)

---

## 📖 Guida Rapida

### Caso Nuovo
1. Aprire il file HTML
2. Selezionare sedi campionate (griglia visiva)
3. Scegliere:
   - **⚡ TUTTI NORMALI** → 7 campioni normali in un click
   - **Diagnosi specifica** → auto-compilazione + conferma Nancy
   - **Compila manualmente** → form dettagliato per sede
4. Tab IHC (opzionale) → p53, CMV
5. Tab Referto → revisione e stampa/copia

### Caso Follow-up IBD
1. Attivare "Follow-up IBD noto"
2. Indicare diagnosi attuale (RCU/Crohn/IBDU)
3. Indicare se terapia in corso (modifica interpretazione retto risparmiato)
4. Compilare findings
5. Referto con Nancy per sede (se RCU)

### Sbloccare Caso
- Bottone "🔓 Sblocca Nuovo Caso" nel banner rosso
- Reset completo di tutti i dati

---

## 📊 Versioning

### v3.0.7 "Epistemic Guard" (current)
- Checkbox "Ho verificato i reperti sul vetrino" per simulazioni
- Nancy con warning se pattern non UC-classico
- Skip lesions smart (campionamento parziale → indeterminabile)
- Blocco copia referto se simulazione non confermata

### v3.0.6 "Simulation Safe"
- Watermark "SIMULAZIONE DIDATTICA" per casi auto-generati
- MDT flag disabilitato per simulazioni
- IBDU: rimosso trigger "low score = IBDU"
- Crohn senza granulomi: nota su limite biopsia mucosa
- Versioning concettuale (ECCO2023, Rosai-school)

### v3.0.5 "Quick Sites"
- Griglia selezione sedi visiva
- Diagnosi veloce con auto-compilazione
- ⚡ Tutti Normali (1-click)
- Etichette qualitative scoring
- Flag MDT automatico
- Banner findings auto-generati
- Fix: rectumSpared bug, Nancy ranking, altreColiti reset

### v3.0.4
- Fix "Sblocca Nuovo Caso" per Claude Desktop
- Reset manuale senza window.location.reload()

### v3.0.3 e precedenti
- Architettura base
- Scoring Crohn/RCU/IBDU
- Nancy Index
- Pattern topografico
- Displasia e p53
- Lock caso dopo referto

---

## 🏗️ Architettura

```
index.html (standalone)
├── State Management (variabili globali)
│   ├── specimens[]
│   ├── ihcData{}
│   ├── ibdNota{}
│   ├── altreColiti{}
│   ├── diagnosiVeloce{}
│   └── flags (caseLocked, userConfirmedReview)
│
├── Scoring Engine
│   ├── calculateScoring() → Crohn/RCU raw + normalized
│   ├── calculateIBDUScore() → da contraddizione
│   ├── interpretScoringGraduated() → headline + level
│   └── detectContradictoryPatterns() → note metodologiche
│
├── Nancy Engine
│   ├── shouldShowNancy() → {show, warning}
│   └── calculateNancyIndex() → score + interpretation
│
├── Topographic Engine
│   └── analyzeTopographicPattern() → skip, continuity, warning
│
├── Validation Engine
│   ├── validateClinicalLogic() → alert clinici
│   └── shouldFlagMDT() → casi da MDT
│
├── Report Generator
│   └── generateReport() → oggetto completo con metadata
│
└── UI Components (template literals)
    ├── TabNavigation
    ├── SpecimenForm / SpecimenList
    ├── IHCTab
    └── ReportTab
```

---

## 🔮 Sviluppi Futuri (Roadmap)

### Breve termine
- [ ] Separazione motore logico da UI
- [ ] Export JSON per casistica
- [ ] Modalità "Rosai" (solo morfologia, no score)

### Medio termine
- [ ] Pouch e post-chirurgici dedicati
- [ ] Scoring ECCO aggiornato
- [ ] Log decisionale per teaching

### Lungo termine
- [ ] Validazione su casistica esterna
- [ ] Paper metodologico (Virchows / Histopathology)
- [ ] Versione multilingua

---

## 👤 Autore

**Dr. Filippo Bianchi**  
Direttore SC Anatomia Patologica  
ASST Fatebenefratelli-Sacco, Milano

GitHub: [@infingardo](https://github.com/infingardo)

---

## 📄 Licenza

Uso interno e didattico. Non validato per uso clinico autonomo.

---

## 🙏 Ringraziamenti

- Duccio Petrella (collaborazione PDTA)
- Claude AI (pair programming)
- ChatGPT (code review epistemico)
- Scuola Rosai (metodo)

---

*"Questo strumento riduce il rischio di overdiagnosis nei giovani. È raro. Ed è il massimo complimento possibile."*
