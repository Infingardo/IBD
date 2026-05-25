# Report Parity Audit — Fix dati mancanti Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correggere tre bug in `generatePlainTextReferto()` che causano perdita di dati quantitativi nel referto clinico e output incoerente per COLITE_FAC senza sedi FAC.

**Architecture:** Tutti e tre i fix sono edit localizzati alla funzione `generatePlainTextReferto()` in `index.html`, righe 1844–1918. Nessun refactor strutturale. Nessun dato model cambia.

**Tech Stack:** HTML/JS vanilla single-file. Nessun build system. Test = verifica manuale nel browser.

---

## File modificati

| File | Sezione | Righe approssimative |
|------|---------|----------------------|
| `index.html` | `generatePlainTextReferto()` — blocco DIAGNOSI_TESTO_FISSO | 1864–1871 |
| `index.html` | `generatePlainTextReferto()` — blocco DETTAGLIO PER SEDE | 1888–1889 |

---

## Task 1 — Bug 1: branch espliciti per COLITE_COLLAGENA e COLITE_LINFOCITICA

**Files:**
- Modify: `index.html:1864-1871`

- [ ] **Step 1: Localizza il blocco da modificare**

Apri `index.html`. Cerca il testo:
```
} else {
    t += `${report.diagnosiVeloce.testo}\n`;
    // Per colite infettiva il grading per sede è già esplicito sotto — riga ridondante rimossa
    if (report.diagnosiVeloce.selected !== 'COLITE_INFETTIVA') {
```
Questo è il branch `else` dentro il blocco `DIAGNOSI_TESTO_FISSO` (circa riga 1864).

- [ ] **Step 2: Sostituisci il blocco `else` (righe 1864–1871)**

Sostituisci questo codice:
```javascript
                } else {
                    t += `${report.diagnosiVeloce.testo}\n`;
                    // Per colite infettiva il grading per sede è già esplicito sotto — riga ridondante rimossa
                    if (report.diagnosiVeloce.selected !== 'COLITE_INFETTIVA') {
                        const sediAttive = specimens.filter(s => isSpecimenActive(s)).map(s => SITE_LABELS[s.site] || s.site);
                        if (sediAttive.length > 0) t += `Attività infiammatoria acuta in: ${sediAttive.join(', ')}.\n`;
                    }
                }
```

Con questo:
```javascript
                } else if (report.diagnosiVeloce.selected === 'COLITE_COLLAGENA') {
                    const val = altreColiti.banda_collagene_um;
                    const label = val ? `${val}μm` : '≥10μm';
                    t += `Colite microscopica, tipo collagenosica. Banda collagene subepiteliale ispessita (${label}). Architettura ghiandolare conservata.\n`;
                } else if (report.diagnosiVeloce.selected === 'COLITE_LINFOCITICA') {
                    const val = altreColiti.iel_count;
                    const label = val ? `${val}/100 cellule epiteliali` : '≥20/100 cellule epiteliali';
                    t += `Colite microscopica, tipo linfocitica. Linfociti intraepiteliali aumentati (${label}). Architettura ghiandolare conservata.\n`;
                } else {
                    t += `${report.diagnosiVeloce.testo}\n`;
                    const sediAttive = specimens.filter(s => isSpecimenActive(s)).map(s => SITE_LABELS[s.site] || s.site);
                    if (sediAttive.length > 0) t += `Attività infiammatoria acuta in: ${sediAttive.join(', ')}.\n`;
                }
```

Nota: questo step incorpora anche il Bug 3 fix (rimozione del guard ridondante nell'`else` generico).

- [ ] **Step 3: Verifica manuale — COLITE_COLLAGENA con valore**

1. Apri `index.html` nel browser (File → Open o `open index.html`)
2. Seleziona le sedi (es. sigma, retto)
3. Usa "Diagnosi Veloce" → "Colite Collagenosica"
4. Vai al tab IHC / Altre Coliti → inserisci `banda_collagene_um = 22`
5. Vai al tab Referto
6. Verifica che la textarea contenga: `Banda collagene subepiteliale ispessita (22μm)`
7. **NON deve comparire**: `(≥10μm)`

- [ ] **Step 4: Verifica manuale — COLITE_COLLAGENA senza valore**

1. Ripeti il flusso senza inserire il valore μm
2. Verifica che la textarea contenga: `Banda collagene subepiteliale ispessita (≥10μm)`

- [ ] **Step 5: Verifica manuale — COLITE_LINFOCITICA con valore**

1. Usa "Diagnosi Veloce" → "Colite Linfocitica"
2. Tab IHC / Altre Coliti → inserisci `iel_count = 35`
3. Vai al tab Referto
4. Verifica: `Linfociti intraepiteliali aumentati (35/100 cellule epiteliali)`

- [ ] **Step 6: Verifica manuale — COLITE_LINFOCITICA senza valore**

1. Ripeti senza inserire iel_count
2. Verifica: `Linfociti intraepiteliali aumentati (≥20/100 cellule epiteliali)`

- [ ] **Step 7: Verifica regressione — altri DIAGNOSI_TESTO_FISSO**

Testa rapidamente COLITE_FANS e SCAD: il testo fisso deve comparire invariato (nessuna modifica attesa).

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "fix: includi banda_collagene_um e iel_count nel referto generato

generatePlainTextReferto() usava sempre il testo fisso per COLITE_COLLAGENA
e COLITE_LINFOCITICA ignorando i valori quantitativi inseriti dall'utente.
Aggiunge branch espliciti che iniettano il valore misurato se presente,
con fallback al placeholder generico. Rimuove anche il guard tautologico
nell'else generico (Bug 3 dead code)."
```

---

## Task 2 — Bug 2: COLITE_FAC con zero sedi FAC — ometti "Dettaglio per sede"

**Files:**
- Modify: `index.html:1888-1889`

- [ ] **Step 1: Localizza il blocco da modificare**

Cerca il commento:
```
// ── DETTAGLIO PER SEDE ────────────────────────────────────────────
t += `\nDettaglio per sede:\n`;
```
È circa alla riga 1888.

- [ ] **Step 2: Inserisci l'early return prima del blocco**

Sostituisci:
```javascript
            // ── DETTAGLIO PER SEDE ────────────────────────────────────────────
            t += `\nDettaglio per sede:\n`;
```

Con:
```javascript
            // ── DETTAGLIO PER SEDE ────────────────────────────────────────────
            if (report.diagnosiVeloce.selected === 'COLITE_FAC' && !specimens.some(s => s.facPresente)) {
                const sediLine = formatSediCampionate(specimens);
                if (sediLine) t += `\n${sediLine}`;
                return t;
            }
            t += `\nDettaglio per sede:\n`;
```

- [ ] **Step 3: Verifica manuale — COLITE_FAC senza sedi FAC**

1. Seleziona 2-3 sedi
2. Usa "Diagnosi Veloce" → "Colite attiva focale" (COLITE_FAC)
3. **Non marcare** nessuna sede come FAC
4. Vai al tab Referto
5. Verifica: la textarea **non contiene** "Dettaglio per sede:"
6. Verifica: la textarea **contiene** la riga "Sedi esaminate: ..."

- [ ] **Step 4: Verifica manuale — COLITE_FAC con almeno una sede FAC**

1. Seleziona 2-3 sedi
2. Usa "Diagnosi Veloce" → "Colite attiva focale"
3. **Marca** almeno una sede come FAC
4. Vai al tab Referto
5. Verifica: la textarea **contiene** "Dettaglio per sede:" (comportamento invariato)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "fix: ometti 'Dettaglio per sede' per COLITE_FAC senza sedi FAC marcate

Con zero specimen facPresente, l'intestazione già riportava 'mucosa nella norma'
ma il blocco dettaglio mostrava tutti i campioni come Quiescente — incoerente.
Aggiunge early return che include solo formatSediCampionate e termina."
```

---

## Self-review del piano

**Spec coverage:**
- Bug 1 (banda_collagene_um + iel_count): Task 1 ✓
- Bug 2 (COLITE_FAC zero sedi): Task 2 ✓
- Bug 3 (dead code): incorporato in Task 1 Step 2 ✓
- Test manuali lista spec: tutti coperti in Steps 3-7 di Task 1 e Steps 3-4 di Task 2 ✓

**Placeholder scan:** nessun TBD/TODO. Ogni step ha codice esatto o istruzioni precise.

**Type consistency:** `altreColiti.banda_collagene_um`, `altreColiti.iel_count`, `specimens`, `formatSediCampionate`, `report.diagnosiVeloce.selected` — tutti usati coerentemente con i nomi presenti nel codice sorgente.
