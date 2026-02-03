# Nancy Index Repositioning — v3.0.8

## 🎯 Obiettivo
Spostare il Nancy Index **subito dopo il titolo diagnostico** per maggiore visibilità.

---

## 📐 Struttura PRIMA

```
📄 REFERTO ISTOLOGICO
├─ Quadro compatibile con proctite ulcerosa
├─ Pattern morfologico...
├─ [Tabella dettaglio sedi]
├─ Sintesi endoscopista
├─ Alert CMV
├─ Alert displasia
├─ Scoring
└─ Nancy Index ❌ (troppo in basso)
```

---

## 📐 Struttura DOPO

```
📄 REFERTO ISTOLOGICO
├─ Quadro compatibile con proctite ulcerosa
├─ Pattern morfologico...
├─ **Nancy Index** ✅ (subito visibile!)
├─ [Tabella dettaglio sedi]
├─ Sintesi endoscopista
├─ Alert CMV
├─ Alert displasia
└─ Scoring
```

---

## 🔧 Modifiche Tecniche

### Rimozione dalla Sezione 6
```javascript
// Rimosso:
<!-- ========== 6. NANCY INDEX (per UC e follow-up) ========== -->
${report.nancy.applicable ? `...` : ''}
```

### Inserimento in Sezione 1
```javascript
// Dopo headline/description:
`}

<!-- NANCY INDEX (spostato qui per visibilità) -->
${report.nancy.applicable ? `
    <div class="bg-indigo-50 border-2 ... mb-4">
        <h4>Nancy Histological Index...</h4>
        <p>📚 Marchal-Bressenot A et al. Gut 2017;66:43-49</p>
        ...
    </div>
` : ''}

<div class="mb-4">  <!-- Tabella sedi -->
```

---

## ✅ Risultato

Il Nancy appare **immediatamente dopo la diagnosi testuale**, rendendo lo score più evidente e clinicamente rilevante.

**Margini:** Aggiunto `mb-4` al box Nancy per spaziatura corretta.

---

File: `index_v3_0_8_nancy_repositioned.html`
