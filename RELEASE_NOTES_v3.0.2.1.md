# Release Notes v3.0.2.1 - Hotfix Atrofia Villi

**Data**: 31 Gennaio 2026  
**Tipo**: Hotfix post-release v3.0.2  
**Gravità**: Media (fix prudenziale)

---

## 🎯 Fix Applicato

### Criticità Residua ChatGPT o1-mini: `atrofia_villi` come marker "infiammatorio"

**Problema identificato**:
- In v3.0.2 originale, `atrofia_villi !== 'assente'` era inclusa in `hasInflammatoryFindings()` per ileo
- Questo poteva causare "ileo coinvolto" anche in contesti NON-IBD:
  - Post-infettivi (Giardia, altro)
  - Celiachia-like
  - FANS-induced
  - Enterite cronica aspecifica

**Scenario pericoloso**:
```
Ileo: atrofia villi marcata (SOLO reperto)
NO neutrofili, NO granulomi, NO erosioni
→ Tool: "Ileo coinvolto" → Pattern topografico Crohn-like ❌
```

**Root cause**: Atrofia villi = marker di **cronicità aspecifica**, non di coinvolgimento IBD-specifico.

---

## ✅ Soluzione Applicata (Opzione B - Conservativa)

**Codice modificato** (`hasInflammatoryFindings()` - ileo):

```javascript
// PRIMA (v3.0.2 originale)
if (siteType === 'ileum') {
    return (
        f.granulomi_epitelioidi === 'presente' ||
        f.granulomi_epitelioidi === 'sospetti' ||
        f.neutrofili_lamina_propria !== 'assente' ||
        f.erosioni_ulcerazioni === 'presente' ||
        f.iperplasia_linfoide === 'presente' ||
        f.edema_lamina_propria === 'presente' ||
        f.atrofia_villi !== 'assente' ||  // ← RIMOSSO
        f.plasmacellule_aumentate === 'presente'
    );
}

// DOPO (v3.0.2.1)
if (siteType === 'ileum') {
    return (
        f.granulomi_epitelioidi === 'presente' ||
        f.granulomi_epitelioidi === 'sospetti' ||
        f.neutrofili_lamina_propria !== 'assente' ||
        f.erosioni_ulcerazioni === 'presente' ||
        f.iperplasia_linfoide === 'presente' ||
        f.edema_lamina_propria === 'presente' ||
        f.plasmacellule_aumentate === 'presente'
        // NO atrofia_villi (marker cronicità aspecifico)
    );
}
```

**Cosa cambia**:
- Atrofia villi **RIMANE** nello scoring Crohn (contribuisce 5/15/30 punti a seconda gravità)
- Atrofia villi **NON determina più** "ileo coinvolto" per analisi topografica
- Ileo considerato "coinvolto" SOLO se ha markers IBD-specifici:
  - Granulomi (sempre)
  - Neutrofili/erosioni (attività)
  - Iperplasia linfoide (Crohn marker)
  - Edema lamina propria + plasmacellule aumentate (infiammazione attiva)

---

## 🎓 Rationale Clinico

**Perché escludere atrofia isolata**:
1. **Atrofia villi = pattern aspecifico**:
   - Celiachia
   - Giardiasi
   - FANS
   - Post-infettiva
   - Enterite eosinofila

2. **Crohn ileale VERO ha sempre**:
   - Granulomi (70-80% casi)
   - O attività (neutrofili/erosioni)
   - O iperplasia linfoide (marker specifico)
   - Mai solo atrofia isolata

3. **Filosofia tool**: "Automatizzare prudenza, non diagnosi"
   - Meglio essere conservativi
   - Evitare pattern Crohn-like spurio

---

## 📊 Impatto

**Casi dove cambia output**:

### Caso A: Enterite post-infettiva
```
Ileo: atrofia villi moderata (SOLO)
Colon: normale

v3.0.2 originale:
→ Ileo "coinvolto"
→ Pattern: "Ileo coinvolto con colon indenne" (Crohn-like) ❌

v3.0.2.1:
→ Ileo "NON coinvolto" (no markers attività)
→ Pattern: "Normale" ✅
```

### Caso B: Crohn ileale attivo
```
Ileo: atrofia villi + neutrofili moderati + iperplasia linfoide
Colon: normale

v3.0.2 e v3.0.2.1 identici:
→ Ileo "coinvolto" (neutrofili + iperplasia)
→ Pattern: Crohn-like ✅
```

### Caso C: Crohn "burned out"
```
Ileo: atrofia villi marcata (SOLO, no attività)
Colon: normale

v3.0.2 originale:
→ Ileo "coinvolto"
→ Pattern: Crohn-like

v3.0.2.1:
→ Ileo "NON coinvolto" topograficamente
→ Score Crohn comunque alto (atrofia peso 30)
→ Pattern: "Aspecifico, correlare clinica/imaging"

Nota: In Crohn noto con ileo burned-out, diagnosi già posta.
Pattern topografico meno rilevante.
```

**Stima impatto**: <5% casi (atrofia isolata senza altri markers è rara).

---

## ✅ Testing

**Test case prioritari**:

1. **Enterite aspecifica**:
   - Ileo: atrofia moderata (solo)
   - Atteso: ileo NON coinvolto, pattern normale ✓

2. **Crohn ileale classico**:
   - Ileo: granulomi + neutrofili + atrofia
   - Atteso: ileo coinvolto, Crohn score alto ✓

3. **Crohn burned-out**:
   - Ileo: atrofia marcata (solo)
   - Atteso: ileo non coinvolto topograficamente, score Crohn comunque >50% ✓

4. **Celiachia-like**:
   - Ileo: atrofia marcata + plasmacellule aumentate
   - Atteso: ileo coinvolto (plasmacellule = marker) ✓

---

## 🚀 Deployment

**Versione**: v3.0.2.1 (hotfix)  
**File modificato**: `index_v3.0.2.html` → 1 riga rimossa (274)  
**Breaking changes**: Nessuno  
**Backward compatibility**: Completa (dati salvati v3.0.2 compatibili)

**Deploy**:
```bash
git add index_v3.0.2.html RELEASE_NOTES_v3.0.2.1.md
git commit -m "v3.0.2.1 Hotfix: Esclusa atrofia_villi da hasInflammatoryFindings (ileo)"
git push
```

---

## 📚 Riferimenti

**Criticità segnalata da**: ChatGPT o1-mini code review (31/01/2026)  
**Decisione fix**: Dr. Filippo Bianchi  
**Opzione scelta**: B (conservativa) - esclusione completa atrofia_villi da topografia

**Alternative valutate**:
- Opzione A: Status quo (lasciare)
- Opzione C: Ibrida (atrofia solo se marcata + contesto)

**Rationale scelta B**: Massima prudenza, in linea con filosofia tool.

---

## 💡 Take-Home

> **"Atrofia villi isolata NON è Crohn finché non dimostrato altrimenti"**

Questo fix previene pattern Crohn-like spurio in enteriti aspecifiche, mantenendo sensibilità per Crohn vero (che ha sempre altri markers).

---

**Author**: Dr. Filippo Bianchi  
**Review**: ChatGPT o1-mini (criticità identificata)  
**Date**: 31 Gennaio 2026

---

**Fine Release Notes v3.0.2.1**
