# IBD Diagnostic Tool v3.1.5

**Strumento di supporto decisionale per la diagnosi istologica delle malattie infiammatorie croniche intestinali (IBD)**

> *"Il vetrino non mente, il reagente sì."*

---

## 🎯 Scopo

Questo tool **non fa diagnosi**. Formalizza il ragionamento del patologo esperto, rendendo espliciti:
- I criteri morfologici valutati
- Il peso diagnostico di ogni reperto
- Le contraddizioni e i limiti del campionamento
- Quando l'istologia da sola non basta

**Target**: Patologi esperti e patologi in formazione sotto supervisione diretta.

---

## 📋 Funzionalità Principali

### Workflow Clinico
1. **Selezione sedi** — Griglia visiva per mapping endoscopico (7 sedi standard + pouch/anastomosi)
2. **Wizard multi-sede** — Compilazione guidata sede per sede con step indicator, salvataggio intermedio e navigazione avanti/indietro
3. **Diagnosi veloce** — Pre-compilazione automatica per casi tipici (RCU, Crohn, SCAD, coliti microscopiche); chiede Nancy Index o misure specifiche quando rilevante
4. **IHC opzionale** — p53 (con pattern wild-type / overespressione / perdita completa), CD68, CMV
5. **Referto automatico** — Con interpretazione graduata, nota metodologica e supporto copia/stampa

### Scoring Orientativo
- Score Crohn / RCU / IBDU con etichette qualitative (Basso, Borderline, Compatibile, Forte)
- **Nessuna percentuale mostrata all'utente** (scoring interno usato solo per la logica)
- IBDU emerge da contraddizione morfologica, non da debolezza dello score
- Nota automatica quando granulomi trainano l'orientamento

### Nancy Histological Index
- Abilitato **esclusivamente** per RCU nota in follow-up (checkbox "IBD nota" + diagnosi "RCU")
- Disabilitato automaticamente in prima diagnosi, Crohn, IBDU, e per campioni ileali
- Riferimenti: Marchal-Bressenot et al., *Gut* 2017; Travis et al., *Gut* 2019

### Pattern Topografico
- Distribuzione continua vs discontinua
- Skip lesions rilevate **solo se le sedi intermedie sono state campionate** (altrimenti: "indeterminabile")
- Warning specifici per retto risparmiato (con e senza terapia in corso), campionamento incompleto, sedi speciali post-chirurgiche (pouch/anastomosi)

### Colite Attiva Focale (FAC)
- Checkbox per sede nel wizard di compilazione
- Riportata in tabella referto e nel testo copiato
- Nota automatica: "Reperto aspecifico; correlazione clinico-endoscopica raccomandata"

### Alert Automatici
- 🏥 **Flag MDT** per casi complessi (pattern contraddittorio, IBDU elevato, displasia + p53 aberrante)
- ⚠️ **Granulomi epitelioidi senza cronicità** → DD infettiva obbligatoria (TBC, Yersinia, sarcoidosi)
- ⚠️ **Granuloma mucinoso** — peso ridotto se rottura criptale plausibile; conferma con PAS-D
- ⚠️ **Crohn senza granulomi** → nota su limite della biopsia mucosa (non dimostra transmuralità)
- ⚠️ **CMV positivo** → raccomandazione infettivologica

---

## 🧠 Filosofia di Design

### Principi Epistemici

1. **Incertezza dichiarata**
   - Il tool sa quando non sa
   - IBDU = contraddizione morfologica, non pattumiera diagnostica
   - Note metodologiche esplicite per pattern ambigui

2. **Morfologia al centro**
   - IHC come supporto, non sostituto
   - "Il grading displastico è MORFOLOGICO. p53 non lo definisce."
   - Granuloma mucinoso ≠ granuloma epitelioide di Crohn

3. **Limite dello strumento dichiarato**
   - "Biopsia mucosa NON è lo strumento per dimostrare transmuralità"
   - Campionamento incompleto → continuità non valutabile, non inventata

4. **Terminologia italiana corretta**
   - "Granuloma mucinoso" (non *mucin granuloma*)
   - "Overespressione" (non *overexpression*)
   - "Perdita completa/Null" (non *complete loss*)
   - "Reperti" (non *findings* nell'interfaccia)

### Scuola Rosai
- Pattern recognition > checklist automatica
- Correlazione clinica sempre richiesta
- Diagnosi differenziale ragionata, non algoritmica

---

## ⚠️ Disclaimer

```
STRUMENTO DI SUPPORTO DECISIONALE
NON VALIDATO CLINICAMENTE

- Non sostituisce il giudizio del patologo
- Non utilizzabile come unico criterio diagnostico
- Richiede sempre correlazione clinico-endoscopica
- Scoring orientativo, NON validato su casistica esterna
- Uso riservato a patologi esperti in IBD o in formazione supervisionata
```

---

## 🔧 Requisiti Tecnici

- Browser moderno (Chrome, Firefox, Safari, Edge)
- JavaScript abilitato
- Nessuna installazione richiesta (file HTML standalone)
- Funziona offline dopo il primo caricamento
- Dati salvati in `localStorage` (persistenti per browser/sessione)

---

## 📖 Guida Rapida

### Caso Nuovo — Prima Diagnosi
1. Aprire `index.html`
2. Selezionare le sedi campionate (griglia con checkbox)
3. Click **"Avanti"** → scegliere tra:
   - **Diagnosi veloce** → auto-compilazione + eventuale Nancy/IEL/banda collagene
   - **Compila manualmente i reperti** → wizard sede per sede
4. Tab **IHC** (opzionale) → p53, CD68, CMV, coliti microscopiche
5. Tab **Referto** → revisione, copia testo, stampa/PDF

### Caso Follow-up IBD Nota
1. Spuntare **"IBD nota (Follow-up)"**
2. Selezionare diagnosi (RCU / Crohn / IBDU)
3. Indicare se paziente in terapia immunosoppressiva/biologica (modula interpretazione retto risparmiato)
4. Compilare findings
5. Referto: se RCU, Nancy Index calcolato e incluso nel testo

### Sbloccare per Nuovo Caso
- Banner rosso → **"🔓 SBLOCCA NUOVO CASO"**
- Reset completo di tutti i dati (con conferma)

---

## 📊 Changelog

### v3.1.5 (Maggio 2026) — *Scoring live + UX*
- Pannello "Orientamento in tempo reale" nella tab Campioni: mostra Crohn/RCU/IBDU con etichette qualitative, headline interpretativo, warning topografico e nota granulomi — aggiornato ad ogni modifica, senza bloccare il caso
- Pannello collassabile (▲/▼) per non occupare spazio quando non serve
- Sostituiti tutti gli `alert()` bloccanti con toast non bloccanti (verde = successo, arancio = warning) che scompaiono automaticamente dopo 2.5 secondi

### v3.1.4 (Maggio 2026) — *Bug fix form di modifica*
- Fix: `erosioni_ulcerazioni` rimossa dai finding colonici in `EditSpecimenForm` e `updateSpecimen()` (campo ileale, non doveva apparire nei campioni colonici)
- Fix: `mucinGranulomaLikely` ora gestito manualmente tramite checkbox nel form di modifica (prima veniva auto-inferito perdendo l'impostazione manuale del wizard)
- Fix: label "→ chiede Nancy" nei bottoni di diagnosi veloce ora contestuale (mostra "chiede Nancy" solo se IBD nota = RCU, altrimenti "chiede grado attività")

### v3.1.3 (Febbraio 2026) — *Localizzazione italiana + fix tecnici*
- Terminologia italiana corretta: "granuloma mucinoso", "overespressione", "perdita completa/Null", "reperti"
- `N/A` → `—` nella colonna displasia del referto
- Ileo senza attività → "Nella norma" (non "Quiescente": l'ileo non è in remissione, è semplicemente non coinvolto)
- Fix: MDT flag ora abilitato anche per casi da diagnosi veloce (rimossa guardia `simulation` che lo sopprimeva)
- Fix: reset `altreColiti` completo in `generateSpecimensFromDiagnosi` (inclusi `banda_collagene_um` e `iel_count`)
- Fix: `facPresente: false` esplicito nei campioni auto-generati
- Fix: rimossa dead computation `calculateNancyPerSpecimen()` in `SpecimenList`

### v3.1.2 (Febbraio 2026) — *Fix WYSIWYG referto normale*
- Allineamento tra view e testo copiato per mucosa normale: bullet points e ordine sedi ora identici in entrambi
- Fix topografico pouch/anastomosi: escluse dall'analisi continua/discontinua
- FAC riportata per sede (sia in tabella che nel testo copiato)
- Versioning allineato tra header, footer e modal disclaimer

### v3.1.x (Gennaio–Febbraio 2026) — *Stabilizzazione*
- Fix minori workflow wizard (salvataggio intermedio, ripristino valori a navigazione avanti/indietro)
- Ottimizzazione `updateSiteSelectionUI()`: aggiornamento chirurgico senza `render()` completo alla prima spunta

### v3.0.9 (Gennaio 2026) — *Nancy solo RCU follow-up · Scoring qualitativo*
- Nancy Index abilitato **solo** se IBD nota = RCU in follow-up
- Rimosso warning "Nancy non applicabile se ileo presente" (ora semplicemente non mostrato)
- Scoring mostrato solo con etichette qualitative, nessuna percentuale visibile all'utente
- Fix ranking neutrofili Nancy (lieve → moderata → marcata)

### v3.0.8 (Gennaio 2026) — *Lean Expert*
- Rimozione watermark "SIMULAZIONE DIDATTICA" e checkbox `userConfirmedReview`
- MDT flag abilitato anche per casi da diagnosi veloce
- Semplificazione flusso diagnosi veloce

### v3.0.7 (Dicembre 2025) — *Epistemic Guard*
- Nancy con warning se pattern non UC-classico
- Skip lesions smart: campionamento parziale → "indeterminabile" anziché falsi skip
- Blocco copia referto se simulazione non confermata (poi rimosso in v3.0.8)

### v3.0.6 — *Simulation Safe*
- Watermark "SIMULAZIONE DIDATTICA" (poi rimosso)
- IBDU: rimosso trigger "low score = IBDU"
- Nota limite biopsia mucosa per Crohn senza granulomi

### v3.0.5 — *Quick Sites*
- Griglia visiva selezione sedi
- Diagnosi veloce con auto-compilazione
- Etichette qualitative scoring (Basso / Borderline / Compatibile / Forte)
- Flag MDT automatico
- Fix: `rectumSpared` bug, reset `altreColiti`

### v3.0.3 — *Enhanced UX · Workflow multi-sede bulk*
- Wizard multi-sede con step indicator e navigazione
- Salvataggio bulk di tutti i campioni in un'unica operazione
- Riduzione click stimata ~53% per caso con 5 sedi

### v3.0.2 e precedenti
- Architettura base: scoring Crohn/RCU/IBDU, Nancy Index, pattern topografico, displasia e p53, lock caso dopo referto

---

## 🏗️ Architettura

```
index.html (standalone)
├── State Management
│   ├── specimens[]
│   ├── ihcData{}
│   ├── ibdNota{}
│   ├── altreColiti{}
│   ├── diagnosiVeloce{}
│   ├── selectedSites[]
│   ├── multiSiteMode / siteSelectionDone
│   ├── wizardSiteIndex / wizardData{}
│   └── flags (caseLocked, reportGenerated, editingSpecimenIndex)
│
├── Scoring Engine
│   ├── calculateScoring() → Crohn/RCU raw + normalized (interno)
│   ├── calculateIBDUScore() → da contraddizione morfologica
│   ├── interpretScoringGraduated() → headline + level + epistemicNote
│   └── detectContradictoryPatterns() → note metodologiche
│
├── Nancy Engine
│   ├── shouldShowNancy() → bool
│   ├── calculateNancyIndex() → score + interpretation + details
│   └── calculateNancyPerSpecimen() → score per sede (tabella)
│
├── Topographic Engine
│   ├── analyzeTopographicPattern() → skip / continuity / warning
│   └── hasInflammatoryFindings() → per sede (esclude displasia)
│
├── Validation Engine
│   ├── validateClinicalLogic() → alert clinici per sede
│   └── shouldFlagMDT() → casi da discussione multidisciplinare
│
├── Report Generator
│   └── generateReport() → oggetto completo con metadata
│
└── UI Components (template literals)
    ├── TabNavigation
    ├── IbdNotaPanel
    ├── SpecimenForm → SiteSelectionWithDiagnosi → MultiSiteWorkflow (wizard)
    ├── SpecimenList / EditSpecimenForm
    ├── IHCPanel
    ├── ScoringDisplay
    └── ReportTab
```

---

## 📁 Documentazione Correlata

| File | Contenuto | Versione indicata |
|------|-----------|-------------------|
| `NANCY_INDEX_QUICK_GUIDE.md` | Guida rapida al Nancy Index (0–4), criteri, FAQ | v2.4.0 |
| `PREREQUISITES.md` | Requisiti per utenti, test autovalutazione, linee guida per responsabili | v3.0.2 |
| `MANIFESTO_USO.md` | Piano introduzione tool, prevenzione automation bias, KPI | v3.0.2 |
| `CASI_DIDATTICI.md` | 5 casi dove il tool sbaglia (o ha ragione a essere indeciso) | v3.0.2 |

> **Nota**: i file di documentazione secondari riportano versioni precedenti nell'header. Il contenuto è ancora valido; gli screenshot di output si riferiscono a versioni precedenti.

---

## 🔮 Roadmap

- [ ] Export JSON per casistica e audit
- [ ] Log decisionale per teaching (tracciabilità ragionamento)
- [ ] Modalità lettura referto (solo testo, senza UI diagnostica)
- [ ] Scoring ECCO aggiornato con pesi revisionati
- [ ] Validazione su casistica esterna
- [ ] Paper metodologico (*Virchows Archiv* / *Histopathology*)

---

## 👤 Autore

**Dr. Filippo Bianchi**  
Direttore SC Anatomia Patologica  
ASST Fatebenefratelli-Sacco, Milano  
GitHub: [@infingardo](https://github.com/infingardo)  
Email: filippo.bianchi@asst-fbf-sacco.it

---

## 📄 Licenza

Uso interno e didattico. Non validato per uso clinico autonomo.

---

## 🙏 Ringraziamenti

- Duccio Petrella (collaborazione PDTA colorettale/gastrico)
- Claude AI — Anthropic (sviluppo iterativo)
- Scuola Rosai (metodo)

---

*"Questo strumento riduce il rischio di overdiagnosis nei giovani. È raro. Ed è il massimo complimento possibile."*
