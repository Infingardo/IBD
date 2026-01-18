# Nancy Histological Index - Guida Rapida v2.4.0

## 🎯 Cos'è il Nancy Index?

Sistema di scoring validato **(0-4)** per valutare l'attività istologica della **colite ulcerosa**.

**Riferimenti**: 
- **Validazione**: Marchal-Bressenot A et al. *Gut* 2017;66(1):43-49 (PMID: 26464414)
- **Dati prognostici**: Battat R et al. *Clin Gastroenterol Hepatol* 2019;17(12):2371-2381 (PMID: 31128305)

---

## ⚠️ IMPORTANTE v2.4.0: Nancy Solo per Colon

**Nancy Index è validato ESCLUSIVAMENTE per UC colica.**

Il tool **disabilita automaticamente** Nancy se:

| Condizione | Motivo |
|------------|--------|
| **Almeno 1 campione ileale** | Nancy non validato per ileo |
| **Granulomi presenti** | Pattern Crohn, non UC |
| **Score Crohn >70%** | Diagnosi Crohn probabile |

**Se Nancy è disabilitato**, il tool mostra:
```
Nancy Index: Non applicabile
Motivo: [Campioni ileali presenti / Granulomi / Pattern Crohn]
```

**Rationale**: Applicare Nancy a Crohn o ileite non ha senso clinico e genera confusione.

---

## 📊 Scoring System

| Score | Interpretazione | Rischio Recidiva 1 anno* |
|-------|-----------------|--------------------------|
| **0** 🟢 | Remissione istologica completa | <15% |
| **1** 🔵 | Remissione con alterazioni croniche | ~20% |
| **2** 🟡 | Attività lieve | 30-40% |
| **3** 🟠 | Attività moderata | 45-55% |
| **4** 🔴 | Attività severa con ulcerazione | >60% |

*Battat R et al. 2019

---

## 🔬 Come si Calcola

Nancy si calcola **automaticamente** dai reperti colon:

### Parametri Valutati

| Parametro | Derivato da |
|-----------|-------------|
| **Ulcerazioni** | Campo "ulcerazione" → Se presente → Nancy 4 |
| **Neutrofili** | Worst case: neutrofili_epitelio, ascessi_criptici |
| **Ascessi criptici** | Campo dedicato |
| **Alterazioni croniche** | distorsione_architettura OR plasmacellule_basale |

### Algoritmo

```
SE (ulcerazioni presenti) → Nancy 4
ALTRIMENTI SE (neutrofili moderati/severi OR ascessi) → Nancy 3
ALTRIMENTI SE (neutrofili lievi) → Nancy 2
ALTRIMENTI SE (alterazioni croniche) → Nancy 1
ALTRIMENTI → Nancy 0
```

---

## 🎨 Visualizzazione nel Tool

### Nancy ABILITATO (solo campioni colon, no granulomi)

```
┌─────────────────────────────────────┐
│ Nancy Histological Index      ┌───┐ │
│ Scoring attività UC (0-4)     │ 3 │ │ ← Badge colorato
│                               └───┘ │
│                                     │
│ Attività infiammatoria moderata     │
│                                     │
│ Prognosi (Battat 2019):            │
│ Rischio recidiva 45-55% a 1 anno   │
│                                     │
│ Dettagli:                           │
│ Ulcerazioni: No | Ascessi: Sì      │
│ Neutrofili: moderata                │
└─────────────────────────────────────┘
```

### Nancy DISABILITATO (ileo presente o granulomi)

```
┌─────────────────────────────────────┐
│ Nancy Histological Index            │
│                                     │
│ ⚠️ Non applicabile                  │
│                                     │
│ Motivo: Campioni ileali presenti    │
│                                     │
│ Nancy Index è validato solo per     │
│ UC colica (Marchal-Bressenot 2017)  │
└─────────────────────────────────────┘
```

---

## 💡 Casi d'Uso

### Caso 1: UC Sigma + Retto (Nancy ABILITATO)

**Input**:
- Campioni: sigma, retto (NO ileo)
- Granulomi: assenti
- Neutrofili intraepiteliali: moderata
- Ascessi criptici: presenti
- Ulcerazioni: assenti

**Output**:
- ✅ Nancy **3** (Attività moderata)
- Raccomandazione: Step-up terapeutico

---

### Caso 2: Ileo + Colon (Nancy DISABILITATO)

**Input**:
- Campioni: ileo, cieco, sigma
- Erosioni aftose ileo: presenti

**Output**:
- ❌ Nancy **Non applicabile** (campione ileale presente)
- Scoring IBD: Crohn XX%, UC YY%

---

### Caso 3: Colon con Granulomi (Nancy DISABILITATO)

**Input**:
- Campioni: sigma, retto
- Granulomi: presenti

**Output**:
- ❌ Nancy **Non applicabile** (pattern Crohn)
- Scoring IBD: Crohn alto

---

### Caso 4: UC in Remissione Completa

**Input**:
- Campioni: retto, sigma (NO ileo)
- Tutti reperti: assenti
- Architettura: normale

**Output**:
- ✅ Nancy **0** (Remissione completa)
- Prognosi: Eccellente, rischio recidiva <15%

---

## 📈 Nancy e Decisioni Terapeutiche

### Target: Nancy 0-1

| Score | Azione |
|-------|--------|
| **0** | ✓ Target raggiunto, mantenere terapia |
| **1** | ✓ Remissione, monitoraggio |
| **2** | ⚠️ Ottimizzare dose/compliance |
| **3** | ⚠️ Step-up terapeutico |
| **4** | 🚨 Escalation urgente |

### Follow-up Longitudinale

```
T0:   Nancy 4 → Inizio biologico
T3m:  Nancy 3 → Risposta parziale
T6m:  Nancy 1 → Remissione
T12m: Nancy 0 → Target raggiunto
```

---

## ⚠️ Limitazioni

1. **Solo UC colica** - Non usare per Crohn o IBDU
2. **Solo biopsie colon** - Disabilitato se c'è ileo (v2.4.0)
3. **Richiede biopsia adeguata** - Almeno 2 frammenti/sito
4. **Variabilità inter-osservatore** - κ=0.60-0.75
5. **Non sostituisce giudizio clinico**

---

## ❓ FAQ

**Q: Posso usare Nancy se ho ileo + colon?**  
A: **No**, dalla v2.4.0 Nancy è automaticamente disabilitato se c'è almeno 1 campione ileale. Nancy è validato solo per UC colica.

**Q: Perché Nancy è nascosto quando ci sono granulomi?**  
A: Granulomi = pattern Crohn. Nancy è specifico per UC, non ha senso applicarlo a Crohn.

**Q: Nancy 0 ma paziente sintomatico?**  
A: Possibili cause: sampling bias, IBS overlap, drug-induced symptoms. Nancy misura istologia, non clinica.

**Q: Nancy 4 = sempre escalation?**  
A: Non automaticamente. Valutare: durata terapia, compliance, dose/livelli. Ma Nancy 4 indica necessità di azione.

**Q: Differenza Nancy vs Geboes?**  
A: Nancy (0-4) è semplificato per uso clinico. Geboes (0-5.4) è più granulare per trial.

---

## 📚 Bibliografia

1. **Marchal-Bressenot A** et al. Development and validation of Nancy histological index for UC. *Gut* 2017;66:43-49. **PMID: 26464414**

2. **Battat R** et al. Histologic healing as therapeutic target in IBD. *Clin Gastroenterol Hepatol* 2019;17:2371-81. **PMID: 31128305**

3. **Mosli MH** et al. Histologic scoring indices for UC. *Inflamm Bowel Dis* 2017;23:1108-19. **PMID: 28445246**

---

## 🔄 Changelog Nancy

| Versione | Modifica |
|----------|----------|
| v2.2.0 | Nancy Index integrato |
| v2.2.2 | Nancy condizionale (no se granulomi/Crohn >70%) |
| **v2.4.0** | **Nancy disabilitato se campioni ileali** |

---

## 📞 Contatti

- **Email**: [filippo.bianchi@asst-fbf-sacco.it](mailto:filippo.bianchi@asst-fbf-sacco.it)
- **GitHub**: [github.com/infingardo/IBD](https://github.com/infingardo/IBD)
- **Istituzione**: SC Anatomia Patologica, ASST Fatebenefratelli-Sacco, Milano

---

<div align="center">

**Nancy Histological Index: 0-4 (5 livelli)**

Validato: Marchal-Bressenot 2017 | Prognosi: Battat 2019

**v2.4.0: Solo colon, disabilitato automaticamente se ileo presente**

</div>
