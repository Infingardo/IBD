# Nancy Histological Index - Guida Rapida

## 🎯 Cos'è il Nancy Index?

Il **Nancy Histological Index** è un sistema di scoring validato (0-3) per valutare l'attività istologica della colite ulcerosa.

**Riferimento**: Marchal-Bressenot A et al. *Gut* 2017;66(1):43-49 (PMID: 26464414)

---

## 📊 Scoring System

| Score | Interpretazione | Rischio Recidiva 1 anno |
|-------|----------------|-------------------------|
| **0** | Remissione istologica completa | 10-15% |
| **1** | Remissione con alterazioni croniche | 25-30% |
| **2** | Attività lieve-moderata | 40-50% |
| **3** | Attività severa | >60% |

---

## 🔬 Come si Calcola nel Tool?

Il Nancy Index si calcola **AUTOMATICAMENTE** dai reperti che inserisci. Non devi fare nulla di speciale!

### Parametri Valutati

1. **Ulcerazioni** 
   - Derivato da: `Ulcere fissuriformi` (sì/no)
   
2. **Infiltrato Neutrofilo Acuto**
   - Derivato da (worst case tra):
     * `Criptite`
     * `Ascessi criptici`
     * `Infiltrato infiammatorio acuto`
   - Livelli: assente / lieve / moderato / severo
   
3. **Alterazioni Croniche Architetturali**
   - Derivato da (almeno uno presente):
     * `Distorsione ghiandolare`
     * `Atrofia ghiandolare`

---

## 🧮 Algoritmo di Calcolo

```
SE (ulcere presenti) O (neutrofili severi) → Nancy 3
ALTRIMENTI SE (neutrofili moderati/lievi) → Nancy 2
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
│ Crohn Disease:         75% ████████│
│ Ulcerative Colitis:    20% ██      │
│ IBD Unclassified:       5% █       │
│                                     │
│ Diagnosi: Crohn Disease             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Nancy Histological Index      ┌───┐ │
│ Scoring attività UC (0-3)     │ 2 │ │ ← Badge colorato
│                               └───┘ │
│                                     │
│ Attività infiammatoria lieve-moderata│
│ Significato clinico: Rischio elevato│
│ recidiva (40-50% a 1 anno)          │
│                                     │
│ 💡 Raccomandazione: Valutare       │
│    step-up terapeutico              │
│                                     │
│ Parametri:                          │
│ Ulcerazioni:        ✗ Assenti      │
│ Neutrofili:         ✓ Moderata     │
│ Alterazioni croniche: ✓ Presenti   │
└─────────────────────────────────────┘
```

---

## 💡 Casi d'Uso Clinici

### Caso 1: UC in Remissione Istologica

**Input:**
- Distorsione ghiandolare: assente
- Atrofia ghiandolare: assente
- Criptite: assente
- Ascessi criptici: assenti
- Ulcere: assenti

**Nancy Index:** **0** (verde)
- "Remissione istologica completa"
- Rischio recidiva basso (10-15%)
- Raccomandazione: Monitoraggio routinario

**Interpretazione Clinica:** Paziente in remissione profonda, mantenere terapia attuale.

---

### Caso 2: UC in Remissione con Sequele

**Input:**
- Distorsione ghiandolare: severa
- Atrofia ghiandolare: moderata
- Criptite: assente
- Ascessi criptici: assenti
- Ulcere: assenti

**Nancy Index:** **1** (blu)
- "Remissione con alterazioni croniche persistenti"
- Rischio recidiva moderato (25-30%)
- Raccomandazione: Considerare mantenimento terapia

**Interpretazione Clinica:** Remissione clinica ma sequele croniche presenti. Cautela nella sospensione terapia.

---

### Caso 3: UC con Attività Moderata

**Input:**
- Distorsione ghiandolare: severa
- Criptite: moderata
- Ascessi criptici: lieve
- Ulcere: assenti

**Nancy Index:** **2** (giallo)
- "Attività infiammatoria lieve-moderata"
- Rischio recidiva elevato (40-50%)
- Raccomandazione: Valutare step-up terapeutico

**Interpretazione Clinica:** Attività istologica presente nonostante terapia. Considerare intensificazione.

---

### Caso 4: UC con Attività Severa

**Input:**
- Distorsione ghiandolare: severa
- Criptite: moderata
- Ascessi criptici: severa
- Ulcere: presenti

**Nancy Index:** **3** (rosso)
- "Attività infiammatoria severa"
- Rischio recidiva molto elevato (>60%)
- Raccomandazione: Escalation terapeutica raccomandata

**Interpretazione Clinica:** Attività severa con ulcerazioni. Escalation urgente (biologici, JAK inhibitors, chirurgia).

---

## 📈 Nancy Index e Decisioni Terapeutiche

### Target Terapeutico: Nancy 0-1

La **remissione istologica** (Nancy 0-1) è il nuovo target "treat-to-target" nelle UC:

| Nancy Score | Azione Terapeutica |
|-------------|-------------------|
| **0-1** | ✓ Mantenere terapia attuale |
| **2** | ⚠️ Considerare step-up (es. aumentare dose anti-TNF) |
| **3** | 🚨 Escalation urgente (switch biologico, JAK-i, chirurgia) |

### Monitoraggio nel Tempo

Nancy Index è utile per **follow-up longitudinale**:

```
Baseline → 3 mesi terapia → 6 mesi → 12 mesi

Nancy 3 → Nancy 2 → Nancy 1 → Nancy 0
  ↓         ↓          ↓         ↓
Attivo   Risposta   Remissione  Target
        parziale   con sequele raggiunto
```

---

## ⚠️ Limitazioni e Avvertenze

1. **Nancy è specifico per UC**
   - Non usare per Crohn Disease
   - Non usare per IBDU senza orientamento UC
   
2. **Richiede biopsia adeguata**
   - Almeno 2 frammenti per sito
   - Profondità fino alla muscolaris mucosae
   
3. **Validazione locale raccomandata**
   - Confrontare Nancy con outcome clinico
   - Tarare cut-off rischio sulla popolazione locale
   
4. **Non sostituisce giudizio clinico**
   - Nancy è uno strumento, non una diagnosi
   - Integrare con endoscopia, clinica, laboratorio

---

## 📚 Bibliografia Essenziale

1. **Marchal-Bressenot A** et al. Development and validation of the Nancy histological index for UC. *Gut* 2017;66:43-9. PMID: 26464414

2. **Mosli MH** et al. Histologic scoring indices for evaluation of disease activity in UC. *Inflamm Bowel Dis* 2017;23:1108-19. PMID: 28445246

3. **Battat R** et al. Histologic healing: ideal target for treat-to-target. *Clin Gastroenterol Hepatol* 2019;17:2371-81. PMID: 31128305

---

## ❓ FAQ

**Q: Il Nancy Index sostituisce lo scoring diagnostico Crohn/UC/IBDU?**  
A: No, sono complementari. Lo scoring diagnostico distingue UC vs Crohn, il Nancy Index misura l'attività UC.

**Q: Posso usare Nancy per Crohn?**  
A: No, Nancy è validato solo per UC. Per Crohn non esistono score istologici validati equivalenti.

**Q: Se Nancy è 0 ma clinica attiva?**  
A: Remissione istologica non sempre correla con clinica. Considerare: sampling bias, malattia endoscopica isolata, IBS overlap.

**Q: Devo inserire Nancy nel referto?**  
A: Raccomandato per UC in follow-up. Aiuta il clinico nel monitoraggio e decisioni terapeutiche.

**Q: Nancy è obbligatorio?**  
A: No, è opzionale. Il tool lo calcola automaticamente ma non è obbligatorio riportarlo.

---

**💡 TIP**: Per referti UC, includi sempre il Nancy Index – fornisce informazioni prognostiche preziose per il gastroenterologo!
