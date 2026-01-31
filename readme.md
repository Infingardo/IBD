# IBD Diagnostic Tool v3.0.3 "Enhanced UX"

**Release**: 31 Gennaio 2026  
**Focus**: Workflow multi-sede semplificato

---

## 🆕 NOVITÀ v3.0.3

### Workflow Selezione + Compilazione Bulk

**Prima (v3.0.2)**: Per ogni sede → seleziona dropdown → compila → salva → ripeti  
**Ora (v3.0.3)**: Seleziona TUTTE le sedi → compila TUTTI i form insieme → salva una volta

```
STEP 1: Checkbox Multiple              STEP 2: Form Simultanei
┌─────────────────────────┐            ┌───────────────────────┐
│ ☑ Ileo                  │            │ ► ILEO                │
│ ☑ Sigma            ────►│───────────►│   [findings ileo]     │
│ ☑ Retto                 │            │ ► SIGMA               │
│                         │            │   [findings colon]    │
│ [Avanti (3 sedi)]      │            │ ► RETTO               │
└─────────────────────────┘            │   [findings colon]    │
                                       │                       │
                                       │ [✓ Salva Tutti (3)]  │
                                       └───────────────────────┘
```

**Vantaggi**:
- ⚡ **50% più veloce** per casi multi-sede
- 🎯 **Meno click**: 7 click vs 15 (5 sedi)
- 📋 **Overview immediata**: vedi tutte le sedi insieme
- 🧠 **Meno cognitive load**: workflow lineare senza loop

---

## 📖 QUICK START

### Workflow Completo

1. **Disclaimer** → Accetta
2. **Tab Campioni** → Step 1: Seleziona sedi (checkbox)
3. **Conferma selezione** → Step 2: Compila tutti i form
4. **Salva tutti** → Vai a Tab Analisi
5. **Tab Analisi** → Interpreta risultati
6. **Tab Sintesi** → Genera report finale

### Modificare Selezione Sedi

Se hai sbagliato selezione:
- Click "← Cambia Selezione Sedi" (top-right form area)
- Torna a Step 1
- ⚠️ Dati form NON salvati (by design)

---

## 🔧 FEATURES PRINCIPALI

### Scoring Automatico
- ✅ **Crohn**: 0-100 punti (granulomi, topografia, skip lesions)
- ✅ **RCU**: 0-100 punti (coinvolgimento retto, continuo, backwash)
- ✅ **IBDU**: Score indipendente (non 100-UC-Crohn)

### Topografia Intelligente
- ✅ **Displasia esclusa** da topografia (marker rischio, non infiammazione)
- ✅ **Ileo**: considera atrofia nei punti, NON in topografia (fix v3.0.2.1)
- ✅ **Pattern**: Crohn-like, RCU-like, Aspecifico, Misto

### Granulomi Differenziati
- ✅ **Epitelioidi**: peso Crohn 20-30 punti
- ✅ **Sospetti**: peso ridotto 5-10 punti
- ✅ **Mucin granuloma**: flag opzionale per ridurre peso

### Diagnosi Differenziali
- ✅ **Altre Coliti**: Collagena, Linfocitica, Ischemica, Drug-induced, Diversion
- ✅ **IHC**: CD68, p53, CMV
- ✅ **IBD Nota**: tracking evoluzione diagnostica

---

## 📊 DISCLAIMER SCIENTIFICO

**⚠️ QUESTO TOOL NON FA DIAGNOSI**

Il tool è un **assistente alla decisione**, NON un sostituto del patologo.

### Limiti Dichiarati
1. **Nessun pattern è patognomonico** di Crohn/RCU
2. **Context matters**: anamnesi, clinica, endoscopia, sierologia
3. **Margine di soggettività**: grading istologico (lieve/moderato/marcato)
4. **Casistiche ambigue**: tool propone "Aspecifico, correla clinicamente"
5. **Diagnosi differenziali**: escludi altre cause PRIMA di concludere IBD

### Uso Corretto
- ✅ **Supporto**: evidenzia pattern, calcola score, suggerisce DD
- ✅ **Formazione**: aiuta giovani colleghi a strutturare ragionamento
- ✅ **Safety net**: riduce errori tipici (es. dimenticare granulomi)

### Uso Scorretto
- ❌ **Diagnosi automatica**: "Tool dice Crohn → è Crohn"
- ❌ **Ignorare contesto**: scoring alto senza valutare clinica
- ❌ **Bypass expertise**: sostituire giudizio senior con algoritmo

**Motto**: *"Il tool automatizza la prudenza, non la diagnosi"*

---

## 🎯 TARGET UTENTI

### ✅ Indicato Per
- **Patologi junior** (2°-5° anno specializzazione)
- **Patologi generali** (IBD non quotidiano)
- **Revisione casi complessi** (checklist sistematica)
- **Formazione** (teaching tool per discussioni multidisciplinari)

### ⚠️ Prerequisiti
- Conoscenza base istologia GI
- Familiarità criteri Crohn/RCU
- Capacità valutazione critica risultati

### ❌ Non Indicato Per
- **Specializzandi 1° anno** (prerequisiti insufficienti)
- **Patologi esperti IBD** (già strutturato workflow mentale)
- **Uso forense/medico-legale** (tool non validato)

---

## 📚 DOCUMENTAZIONE

### File Disponibili
- **MANIFESTO_USO.md**: Introduzione + filosofia tool (week 0-4)
- **PREREQUISITES.md**: Conoscenze richieste + autovalutazione
- **CASI_DIDATTICI.md**: 10 casi con interpretazione commentata
- **CHANGELOG_v3.0.3.md**: Storia completa modifiche
- **RELEASE_NOTES_v3.0.3.md**: Dettagli tecnici v3.0.3

### Bibliografia
- Geboes K et al. (Histopathology 2013) - Grading activity
- Magro F et al. (J Crohns Colitis 2017) - European consensus
- Feakins RM (Histopathology 2020) - Practical approach
- Jairath V et al. (Gut 2020) - Histologic endpoints

---

## 🐛 KNOWN LIMITATIONS

### Tecnici
- **Percentuali precise**: 60%/70%/80% possono impressionare junior (mitigato: disclaimer)
- **Cognitive complexity**: non per 1° anno (mitigato: PREREQUISITES)
- **No validazione prospettica**: casistica non pubblicata

### Clinici
- **Burned-out Crohn**: atrofia isolata → pattern aspecifico (appropriato, correlazione clinica)
- **RCU con skip lesions**: possibile (appendice, backwash), non bloccante
- **Overlapping patterns**: tool riconosce ambiguità, suggerisce IBDU

---

## 🔄 VERSIONI

### v3.0.3 (Gennaio 2026)
- ✨ **Workflow multi-sede**: selezione bulk + compilazione simultanea
- ⚡ **UX**: 50% più veloce per casi multi-sede

### v3.0.2.1 (Gennaio 2026)
- 🐛 **Hotfix atrofia villi**: esclusa da topografia ileo (fix criticità ChatGPT)

### v3.0.2 (Gennaio 2026)
- 🐛 **7 fix critici**: topografia, IBDU scoring, granulomi, CMV, displasia
- 📚 **Documentazione**: MANIFESTO, PREREQUISITES, CASI_DIDATTICI

### v3.0.1 (Gennaio 2026)
- ✨ **Diagnosi veloce**: template IBD nota, altre coliti
- 🔧 **IHC completa**: CD68, p53, CMV

---

## 📧 CONTATTO

**Autore**: Dr. Filippo Bianchi  
**Istituzione**: SC Anatomia Patologica, ASST Fatebenefratelli-Sacco, Milano  
**Email**: [via GitHub Issues](https://github.com/infingardo/IBD/issues)

**Feedback**: Sempre apprezzato! Usa Issues per:
- 🐛 Bug report
- 💡 Feature request
- 📖 Suggerimenti documentazione
- 🎓 Proposte casi didattici

---

## ⚖️ LICENSE & DISCLAIMER

**Uso**: Interno didattico/formativo  
**Validazione**: Non validato clinicamente  
**Responsabilità**: Diagnosi finale sempre a carico del patologo  
**Dati**: Nessun dato paziente salvato in cloud (localStorage solo)

**Citazione (se pubblicato)**:  
*Bianchi F. (2026). IBD Diagnostic Tool v3.0.3. GitHub: infingardo/IBD*

---

**Last Update**: 31 Gennaio 2026  
**Live URL**: https://infingardo.github.io/IBD/
