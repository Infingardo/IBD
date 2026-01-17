# Nancy Histological Index - Guida Rapida

## 🎯 Cos'è il Nancy Index?

Il **Nancy Histological Index** è un sistema di scoring validato (0-4) per valutare l'attività istologica della colite ulcerosa.

**Riferimenti**: 
- **Validazione**: Marchal-Bressenot A et al. *Gut* 2017;66(1):43-49 (PMID: 26464414)
- **Dati prognostici**: Battat R et al. *Clin Gastroenterol Hepatol* 2019;17(12):2371-2381 (PMID: 31128305)

---

## 📊 Scoring System

| Score | Interpretazione | Rischio Recidiva 1 anno* |
|-------|----------------|--------------------------|
| **0** | Remissione istologica completa | <15% |
| **1** | Remissione con alterazioni croniche | ~20% |
| **2** | Attività lieve | 30-40% |
| **3** | Attività moderata | 45-55% |
| **4** | Attività severa con ulcerazione | >60% |

*Dati da Battat R et al. 2019 - Correlazione remissione istologica con outcome clinico

---

## 🔬 Come si Calcola nel Tool?

Il Nancy Index si calcola **AUTOMATICAMENTE** dai reperti che inserisci. Non devi fare nulla di speciale!

### Parametri Valutati

1. **Ulcerazioni** 
   - Derivato da: `Ulcere fissuriformi` (presente/assente)
   - **Se presente → Nancy 4 automaticamente**
   
2. **Infiltrato Neutrofilo Acuto**
   - Derivato da (worst case tra):
     * `Criptite`
     * `Ascessi criptici`
     * `Infiltrato infiammatorio acuto`
   - Livelli: assente / lieve / moderato / severo
   
3. **Ascessi Criptici**
   - Marker attività severa
   - Se presenti → aumenta score anche con neutrofili moderati
   
4. **Alterazioni Croniche Architetturali**
   - Derivato da (almeno uno presente):
     * `Distorsione ghiandolare`
     * `Atrofia ghiandolare`
     * `Deplezione mucinica`
     * `Plasmacitosi basale`

---

## 🧮 Algoritmo di Calcolo

```
SE (ulcere presenti) → Nancy 4
ALTRIMENTI SE (neutrofili moderati/severi) O (ascessi presenti) → Nancy 3
ALTRIMENTI SE (neutrofili lievi) → Nancy 2
ALTRIMENTI SE (alterazioni croniche presenti) E (no neutrofili) → Nancy 1
ALTRIMENTI → Nancy 0
```

---

## 🎨 Visualizzazione nel Tool

Il Nancy Index appare nel **Tab Referto**, subito dopo lo Scoring IBD:

```
┌─────────────────────────────────────┐
│ 📊 Analisi Scoring Diagnostico     │
│                                     │
│ Crohn Disease:         20% ██      │
│ Ulcerative Colitis:    75% ████████│
│ IBD Unclassified:       5% █       │
│                                     │
│ Diagnosi: Ulcerative Colitis        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Nancy Histological Index      ┌───┐ │
│ Scoring attività UC (0-4)     │ 3 │ │ ← Badge colorato
│                               └───┘ │
│                                     │
│ Attività infiammatoria moderata     │
│ Significato clinico: Malattia      │
│ moderatamente attiva (Battat 2019: │
│ rischio recidiva 45-55% a 1 anno)  │
│                                     │
│ 💡 Raccomandazione: Step-up        │
│    terapeutico raccomandato.       │
│                                     │
│ Parametri:                          │
│ Ulcerazioni:        ✗ Assenti      │
│ Neutrofili:         ✓ Moderata     │
│ Ascessi criptici:   ✓ Presenti     │
│ Alterazioni croniche: ✓ Presenti   │
└─────────────────────────────────────┘
```

**⚠️ NOTA v2.2.2**: Nancy NON viene mostrato se:
- Granulomi epitelioidi presenti (pattern Crohn)
- Score Crohn >70% (diagnosi Crohn probabile)

In questi casi appare: *"Nancy non calcolato: [motivo]"*

---

## 💡 Casi d'Uso Clinici

### Caso 1: UC in Remissione Istologica Completa

**Input:**
- Distorsione ghiandolare: assente
- Atrofia ghiandolare: assente
- Criptite: assente
- Ascessi criptici: assenti
- Ulcere: assenti

**Nancy Index:** **0** (verde)
- "Remissione istologica completa"
- Rischio recidiva: <15% a 1 anno
- Raccomandazione: Monitoraggio routinario, target terapeutico raggiunto

**Interpretazione Clinica:** Paziente in remissione profonda, mantenere terapia attuale. Possibile de-escalation cauta.

---

### Caso 2: UC in Remissione con Sequele Croniche

**Input:**
- Distorsione ghiandolare: severa
- Atrofia ghiandolare: moderata
- Criptite: assente
- Ascessi criptici: assenti
- Ulcere: assenti

**Nancy Index:** **1** (blu)
- "Remissione con alterazioni croniche persistenti"
- Rischio recidiva: ~20% a 1 anno
- Raccomandazione: Mantenimento terapia, considerare de-escalation cauta

**Interpretazione Clinica:** Remissione clinica ma sequele croniche presenti. Cautela nella sospensione terapia. Monitoraggio stretto.

---

### Caso 3: UC con Attività Lieve

**Input:**
- Distorsione ghiandolare: moderata
- Criptite: lieve
- Ascessi criptici: assenti
- Infiltrato acuto: assente
- Ulcere: assenti

**Nancy Index:** **2** (giallo)
- "Attività infiammatoria lieve"
- Rischio recidiva: 30-40% a 1 anno
- Raccomandazione: Ottimizzazione terapia di mantenimento

**Interpretazione Clinica:** Attività istologica lieve. Ottimizzare dose/compliance terapia attuale prima di step-up.

---

### Caso 4: UC con Attività Moderata

**Input:**
- Distorsione ghiandolare: severa
- Criptite: moderata
- Ascessi criptici: presenti (lieve-moderati)
- Ulcere: assenti

**Nancy Index:** **3** (arancione)
- "Attività infiammatoria moderata"
- Rischio recidiva: 45-55% a 1 anno
- Raccomandazione: Step-up terapeutico raccomandato

**Interpretazione Clinica:** Attività istologica significativa nonostante terapia. Considerare intensificazione (aumentare dose anti-TNF, switch biologico, aggiungere tiopurine).

---

### Caso 5: UC con Attività Severa e Ulcerazione

**Input:**
- Distorsione ghiandolare: severa
- Criptite: moderata
- Ascessi criptici: severi
- Ulcere: **presenti**

**Nancy Index:** **4** (rosso)
- "Attività infiammatoria severa con ulcerazione"
- Rischio recidiva: >60% a 1 anno
- Raccomandazione: Escalation terapeutica urgente

**Interpretazione Clinica:** Attività severa con danno mucosale. Escalation urgente (switch biologico, JAK inhibitors, valutare colectomia).

---

## 📈 Nancy Index e Decisioni Terapeutiche

### Target Terapeutico: Nancy 0-1

La **remissione istologica** (Nancy 0-1) è il nuovo target "treat-to-target" nelle UC:

| Nancy Score | Azione Terapeutica |
|-------------|-------------------|
| **0** | ✓ Remissione profonda → Mantenere, possibile de-escalation |
| **1** | ✓ Remissione con sequele → Mantenere, monitorare |
| **2** | ⚠️ Attività lieve → Ottimizzare dosaggio/compliance |
| **3** | ⚠️ Attività moderata → Step-up terapeutico |
| **4** | 🚨 Attività severa → Escalation urgente |

### Monitoraggio nel Tempo

Nancy Index è utile per **follow-up longitudinale**:

```
Baseline → 3 mesi terapia → 6 mesi → 12 mesi

Nancy 4 → Nancy 3 → Nancy 1 → Nancy 0
  ↓         ↓          ↓         ↓
Severa   Risposta   Remissione  Target
         parziale   con sequele raggiunto
```

**Esempio pratico**:
- T0: Nancy 4 → Inizio anti-TNF
- T3m: Nancy 3 → Risposta parziale, ottimizzare dose
- T6m: Nancy 1 → Remissione con sequele, mantenere
- T12m: Nancy 0 → Target raggiunto, follow-up routinario

---

## ⚠️ Limitazioni e Avvertenze

1. **Nancy è specifico per UC**
   - Non usare per Crohn Disease
   - Non usare per IBDU senza orientamento UC chiaro
   - Tool v2.2.2: Nancy nascosto automaticamente se granulomi o Crohn >70%
   
2. **Richiede biopsia adeguata**
   - Almeno 2 frammenti per sito
   - Profondità fino alla muscolaris mucosae
   - Evitare biopsie superficiali/tangenziali
   
3. **Validazione locale raccomandata**
   - Confrontare Nancy con outcome clinico propria casistica
   - Tarare cut-off rischio sulla popolazione locale
   - Considerare fattori confondenti (terapia, compliance, comorbidità)
   
4. **Non sostituisce giudizio clinico**
   - Nancy è uno strumento, non una diagnosi
   - Integrare con: endoscopia, clinica, laboratorio, imaging
   - Score isolato non guida decisioni terapeutiche

5. **Variabilità inter-osservatore**
   - Concordanza moderata-buona tra patologi (κ=0.60-0.75)
   - Training e calibrazione migliorano riproducibilità
   - In caso di dubbio, considerare seconda opinione

---

## 📚 Bibliografia Essenziale

1. **Marchal-Bressenot A**, Salleron J, Boulagnon-Rombi C, et al. Development and validation of the Nancy histological index for ulcerative colitis. *Gut* 2017;66(1):43-49. **PMID: 26464414**
   - Studio originale validazione Nancy Index
   - Definizione score 0-4
   - Correlazione con attività endoscopica

2. **Mosli MH**, Feagan BG, Zou G, et al. Histologic scoring indices for evaluation of disease activity in ulcerative colitis. *Inflamm Bowel Dis* 2017;23(7):1108-1119. **PMID: 28445246**
   - Revisione sistematica scoring systems UC
   - Confronto Nancy vs Geboes vs Riley
   - Validazione psicometrica Nancy

3. **Battat R**, Duijvestein M, Guizzetti L, et al. Histologic healing as a therapeutic target in inflammatory bowel disease. *Clin Gastroenterol Hepatol* 2019;17(12):2371-2381. **PMID: 31128305**
   - **Nancy Index come target terapeutico treat-to-target**
   - **Correlazione remissione istologica e outcome lungo termine**
   - **Dati prognostici rischio recidiva per score 0-4**

4. **Yoon H**, Jangi S, Dulai PS, et al. Incremental benefit of achieving endoscopic and histologic remission in patients with ulcerative colitis. *Gastroenterology* 2020;159(4):1262-1275. **PMID: 32562696**
   - Remissione istologica riduce rischio ospedalizzazione e colectomia
   - Nancy 0-1 associato a migliore outcome vs Nancy ≥2

---

## ❓ FAQ

**Q: Il Nancy Index sostituisce lo scoring diagnostico Crohn/UC/IBDU?**  
A: No, sono **complementari**. Lo scoring diagnostico distingue UC vs Crohn, il Nancy Index misura l'**attività** della UC.

**Q: Posso usare Nancy per Crohn?**  
A: **No**, Nancy è validato **solo per UC**. Per Crohn non esistono score istologici validati equivalenti. La v2.2.2 del tool nasconde automaticamente Nancy se granulomi presenti o score Crohn >70%.

**Q: Se Nancy è 0 ma clinica attiva?**  
A: Remissione istologica non sempre correla con clinica. Considerare:
- **Sampling bias** (biopsia non rappresentativa)
- **Malattia endoscopica isolata** (senza istologia)
- **IBS overlap** (sintomi funzionali sovrapposti)
- **Drug-induced diarrhea** (es. tiopurine)

**Q: Nancy 4 richiede sempre escalation?**  
A: Non automaticamente. Valutare:
- **Durata terapia corrente** (tempo insufficiente?)
- **Compliance** (paziente assume farmaci?)
- **Dose/livelli** (ottimizzazione possibile?)
- **Controindicazioni** a escalation
Ma Nancy 4 indica **necessità di azione terapeutica**.

**Q: Devo inserire Nancy nel referto?**  
A: **Raccomandato per UC in follow-up**. Aiuta il clinico nel monitoraggio e decisioni terapeutiche. Il tool lo calcola automaticamente e lo include nel commento del referto.

**Q: Nancy è obbligatorio?**  
A: **No**, è opzionale. Il tool lo calcola automaticamente ma non è obbligatorio riportarlo. Tuttavia, crescente evidenza supporta reporting Nancy come best practice.

**Q: Cosa significa "Nancy non calcolato" nel tool?**  
A: Dalla v2.2.2, Nancy viene **nascosto** se:
- Granulomi epitelioidi presenti (pattern Crohn patognomonico)
- Score Crohn >70% (diagnosi Crohn altamente probabile)
Nancy è specifico per UC, quindi non applicabile in questi casi.

**Q: Differenza tra Nancy e Geboes Score?**  
A: 
- **Nancy**: Score semplificato 0-4, validato per outcome clinico, facile da usare
- **Geboes**: Score granulare 0-5.4 con sottocategorie, più dettagliato ma complesso
Nancy è preferito per uso clinico routine, Geboes per trial clinici.

---

## 💡 Tips per l'Uso Ottimale

### Per Patologi

1. **Sampling adeguato**: Biopsie profonde, multiple per sito
2. **Valutazione sistematica**: Controllare tutti i parametri Nancy prima di concludere
3. **Documentazione**: Annotare reperti chiave (ulcere, ascessi, alterazioni croniche)
4. **Correlazione**: Considerare clinica ed endoscopia per contestualizzare score
5. **Standardizzazione**: Usare sempre stessi criteri per comparabilità

### Per Clinici

1. **Trend temporali**: Monitorare evoluzione Nancy nel tempo, non solo valore assoluto
2. **Target 0-1**: Mirare a remissione istologica, non solo clinica/endoscopica
3. **Azione su Nancy ≥2**: Considerare modifiche terapeutiche
4. **Integrazione**: Usare Nancy insieme a Mayo endoscopico, fecal calprotectin
5. **Follow-up**: Rebiopsie a 6-12 mesi per valutare risposta terapeutica

---

**💡 TIP FINALE**: Per referti UC, includi sempre il Nancy Index quando disponibile – fornisce informazioni prognostiche preziose e guida decisioni terapeutiche evidence-based!

---

**Nancy Histological Index: 0-4 (5 livelli di attività UC)**

**v2.2.2: Nancy condizionale (nascosto se pattern Crohn)**
