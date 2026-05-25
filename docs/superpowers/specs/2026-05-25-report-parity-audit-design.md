# Design: Report parity audit — fix dati mancanti nel referto

**Data:** 2026-05-25  
**Scope:** `index.html` — funzione `generatePlainTextReferto()`  
**Priorità:** bug reali con impatto su contenuto clinico del referto

---

## Contesto

Il tool IBD genera il referto tramite `generatePlainTextReferto()`, dichiarata "unica fonte di verità" per screen e clipboard. L'audit ha identificato tre bug in questa funzione.

---

## Bug da correggere

### Bug 1 — Valori quantitativi di `altreColiti` assenti nel referto (critico)

**Problema:** `altreColiti.banda_collagene_um` (spessore banda collagene in μm) e `altreColiti.iel_count` (conta IEL per 100 cellule) vengono raccolti dall'UI ma non scritti nel referto. Il testo rimane sempre il placeholder fisso ("≥10μm" / "≥20/100 cellule epiteliali") anche quando l'utente ha inserito la misura reale.

**Fix — Approccio B (branch espliciti):**

Dentro `generatePlainTextReferto()`, nel blocco `else if (DIAGNOSI_TESTO_FISSO...)`, aggiungere due branch prima dell'`else` generico:

```
if COLITE_COLLAGENA:
    val = altreColiti.banda_collagene_um
    label = val ? `${val}μm` : '≥10μm'
    t += `Colite microscopica, tipo collagenosica. Banda collagene subepiteliale ispessita (${label}). Architettura ghiandolare conservata.\n`

else if COLITE_LINFOCITICA:
    val = altreColiti.iel_count
    label = val ? `${val}/100 cellule epiteliali` : '≥20/100 cellule epiteliali'
    t += `Colite microscopica, tipo linfocitica. Linfociti intraepiteliali aumentati (${label}). Architettura ghiandolare conservata.\n`

else:
    t += report.diagnosiVeloce.testo  (invariato per tutti gli altri casi)
```

**Invariante:** il testo fisso in `diagnosiVeloceOptions` non viene modificato — rimane usato solo per UI (preview, tooltip). Non viene usato dal referto per questi due casi.

**Comportamento se il valore è null/undefined:** fallback al testo fisso precedente — nessuna regressione.

---

### Bug 2 — `COLITE_FAC` con zero sedi FAC produce "Dettaglio per sede" incoerente

**Problema:** se l'utente seleziona COLITE_FAC ma non marca nessun campione come `facPresente`, l'intestazione del referto riporta "Mucosa nella norma..." ma il blocco "Dettaglio per sede" (sempre eseguito) mostra tutti i campioni come "Quiescente" — messaggio internamente incoerente.

**Fix:** nel blocco "Dettaglio per sede" di `generatePlainTextReferto()` (circa l.1888), aggiungere un early return prima di `t += '\nDettaglio per sede:\n'`:

```
if (report.diagnosiVeloce.selected === 'COLITE_FAC' && !specimens.some(s => s.facPresente)) {
    const sediLine = formatSediCampionate(specimens);
    if (sediLine) t += `\n${sediLine}`;
    return t;
}
```

`formatSediCampionate` viene ancora inclusa per completezza diagnostica; il blocco "Dettaglio per sede" viene omesso.

---

### Bug 3 — Dead code: guard tautologico in `DIAGNOSI_TESTO_FISSO` (l.1867)

**Problema:** nell'`else` branch (che per definizione esclude già `COLITE_INFETTIVA`), esiste un ulteriore `if (report.diagnosiVeloce.selected !== 'COLITE_INFETTIVA')` sempre vero. Confonde la lettura del codice.

**Fix:** rimuovere il wrapper `if (...) { }` e portare il corpo al livello dell'`else`.

Codice attuale:
```javascript
} else {
    t += `${report.diagnosiVeloce.testo}\n`;
    if (report.diagnosiVeloce.selected !== 'COLITE_INFETTIVA') {
        const sediAttive = ...
        if (sediAttive.length > 0) t += `Attività infiammatoria acuta in: ${sediAttive.join(', ')}.\n`;
    }
}
```

Codice risultante (dopo anche il Bug 1 fix):
```javascript
} else {
    t += `${report.diagnosiVeloce.testo}\n`;
    const sediAttive = specimens.filter(s => isSpecimenActive(s)).map(s => SITE_LABELS[s.site] || s.site);
    if (sediAttive.length > 0) t += `Attività infiammatoria acuta in: ${sediAttive.join(', ')}.\n`;
}
```

---

## File modificati

| File | Funzione | Tipo di modifica |
|------|----------|-----------------|
| `index.html` | `generatePlainTextReferto()` | 3 edit localizzati, ~20 righe nette |

Nessun altro file viene toccato. `diagnosiVeloceOptions` rimane invariato.

---

## Test manuali da eseguire dopo il fix

1. **COLITE_COLLAGENA con `banda_collagene_um = 22`** → referto deve contenere "(22μm)"
2. **COLITE_COLLAGENA senza valore** → referto deve contenere "(≥10μm)"
3. **COLITE_LINFOCITICA con `iel_count = 35`** → referto deve contenere "(35/100 cellule epiteliali)"
4. **COLITE_LINFOCITICA senza valore** → referto deve contenere "(≥20/100 cellule epiteliali)"
5. **COLITE_FAC con zero `facPresente`** → referto non mostra "Dettaglio per sede"
6. **COLITE_FAC con almeno una sede FAC** → comportamento invariato (dettaglio mostrato)
7. **Tutti gli altri `DIAGNOSI_TESTO_FISSO`** → nessuna regressione sul testo fisso
8. **Clipboard parity** → il testo copiato corrisponde alla textarea per tutti i casi sopra

---

## Non in scope

- cd68: confermato assente dal referto per design (uso solo orientamento interno)
- Fallback `execCommand('copy')`: API deprecata ma funzionale, rinviato
- `generateHtmlReferto()` full-document HTML: rinviato
- `onclick="this.select()"` UX: rinviato
