# CHANGELOG v2.4.0 - Biopsie Endoscopiche + Ileo Dedicato

**Data Release**: 18 Gennaio 2026  
**Tipo**: Major refactoring - Breaking changes  
**Status**: 🎯 **PRODUCTION READY**

---

## 🎯 Executive Summary

Versione **2.4.0** è un **refactoring biologicamente corretto** del tool, focalizzato su **biopsie endoscopiche** con criteri appropriati per anatomia e campionamento.

### 🚨 Breaking Changes Critici

**3 Problemi Biologici Risolti**:

1. ❌ **ELIMINATO**: Appendice (non si biopsia endoscopicamente)
2. ❌ **ELIMINATI**: Reperti transmurali (biopsie non arrivano a tonaca muscolare/sierosa)
3. ✅ **AGGIUNTO**: Ileo terminale con **criteri dedicati** (no distorsione criptica, no metaplasia Paneth)

---

## 🔬 Modifiche Principali

### 1. Sedi Anatomiche - Solo Biopsie Endoscopiche

**PRIMA (v2.3.5)**:
```
Sedi: ileo, appendice, cieco, ascendente, trasverso, 
      discendente, sigma, retto, altro
```

**DOPO (v2.4.0)**:
```
Sedi: ileo, cieco, ascendente, trasverso, 
      discendente, sigma, retto, pouch, anastomosi

❌ ELIMINATI: appendice (pezzo operatorio, non biopsia)
             altro (troppo generico)
             
✅ AGGIUNTI: pouch (follow-up IPAA)
            anastomosi (follow-up chirurgico)
```

**Rationale**: Tool è per **biopsie endoscopiche** (mucosa + sottomucosa superficiale), non pezzi operatori.

---

### 2. Findings Colon - Rimossi Reperti Transmurali

**ELIMINATI (impossibili in biopsia)**:
```
❌ infiltrato_transmurale (biopsia NON arriva a tonaca muscolare)
❌ aggregati_linfoidi (transmurali - biopsia superficiale)
❌ fissurazioni (rarissime in biopsia, più tipiche pezzo operatorio)
```

**Findings Colon (v2.4.0)**:
```javascript
✅ granulomi_epitelioidi
✅ neutrofili_epitelio (intraepiteliali)
✅ ascessi_criptici
✅ plasmacellule_basale
✅ distorsione_architettura
✅ metaplasia_paneth
✅ ulcerazione
✅ fibrosi_sottomucosa
```

**Rationale**: Biopsia endoscopica = mucosa + sottomucosa superficiale. NON arriva MAI a tonaca muscolare propria o sierosa.

---

### 3. Ileo Terminale - Criteri Dedicati ⭐ NOVITÀ PRINCIPALE

**Problema Identificato**:
```
ILEO ha FISIOLOGICAMENTE cellule di Paneth
→ "Metaplasia Paneth" nell'ileo = NONSENSE biologico

ILEO non ha cripte come colon
→ "Distorsione architettura criptica" = NONSENSE anatomico
→ "Ascessi criptici" = RARI e architettura diversa
→ "Plasmacellule basale" = concetto legato a cripte colon
```

**Findings Ileo (v2.4.0) - Biologicamente Corretti**:
```javascript
✅ granulomi_epitelioidi (forte indicatore Crohn ileale)
✅ neutrofili_lamina_propria (NON intraepiteliali - architettura diversa)
✅ erosioni_ulcerazioni (aftose tipiche Crohn)
✅ iperplasia_linfoide (follicoli aumentati)
✅ edema_lamina_propria (attività)
✅ atrofia_villi (cronicità - ileo HA villi!)
✅ plasmacellule_aumentate (cronicità)
✅ fibrosi_sottomucosa (cronicità/stenosi)

❌ NO: metaplasia_paneth (FISIOLOGICA in ileo!)
❌ NO: distorsione_architettura (non ci sono cripte!)
❌ NO: ascessi_criptici (architettura diversa)
❌ NO: plasmacellule_basale (concetto legato a cripte)
```

**Rationale Anatomico**:
- Ileo = villi + cellule Paneth fisiologiche
- Colon = cripte + NO villi + NO Paneth fisiologiche
- Criteri morfologici **DEVONO** riflettere anatomia normale

---

### 4. Scoring Ileo - Pesi Dedicati Maggiorati

**Scoring Ileo v2.4.0**:

| Reperto | Peso Crohn | Peso UC | Rationale |
|---------|------------|---------|-----------|
| **Granulomi presente** | +150 | 0 | Fortissimo indicatore Crohn ileale |
| Erosioni aftose | +50 | 0 | Tipiche Crohn |
| Iperplasia linfoide | +40 | 0 | Caratteristico Crohn |
| Atrofia villi marcata | +30 | 0 | Cronicità Crohn |
| Edema lamina propria | +20 | 0 | Attività |
| Neutrofili LP marcati | +20 | +10 | Attività (backwash UC raro) |
| Plasmacellule aumentate | +15 | 0 | Cronicità |
| Fibrosi marcata | +25 | 0 | Cronicità/stenosi |

**Confronto Colon**:
- Granulomi colon: +100 Crohn
- Granulomi ileo: +150 Crohn ← Peso maggiorato (più specifico)

**Rationale**: Granulomi nell'ileo sono **più specifici** per Crohn rispetto a colon (dove possono avere più diagnosi differenziali).

---

### 5. Nancy Histological Index - Solo per Colon UC

**PRIMA (v2.3.5)**:
```javascript
Nancy applicabile se:
- NO granulomi
- Crohn score ≤70%
```

**DOPO (v2.4.0)**:
```javascript
Nancy applicabile se:
- NO granulomi
- Crohn score ≤70%
- NO campioni ileali ← NUOVO

Nancy Index validato SOLO per UC colica.
Se c'è ileo → disabilitato automaticamente.
```

**Rationale**: Nancy Index (Marchal-Bressenot 2017) validato **solo per colite ulcerosa colica**, NON per ileite.

---

### 6. UI Dinamica - Form Cambia con Sede ⚙️ UX

**Implementazione**:
```javascript
// Dropdown sede cambia → findings si aggiornano automaticamente
<select id="site-select" onchange="updateFormForSite(this.value)">

// Ileo selezionato → mostra findings ileo
// Colon selezionato → mostra findings colon

// Feedback visivo:
"🔬 Criteri ILEO: granulomi, erosioni aftose, iperplasia linfoide, atrofia villi"
"🔬 Criteri COLON: cripte, neutrofili intraepiteliali, plasmacellule basale"
```

**UX Migliorata**:
- Selezioni "ileo" → form mostra automaticamente criteri ileo
- Selezioni "sigma" → form torna a criteri colon
- Label chiarisce quale set di criteri sta usando

---

### 7. Specimen Display - Label Corretti Ileo vs Colon

**SpecimenList Aggiornato**:
```
Campione: ILEO TERMINALE
🔬 Criteri ileo
- Granulomi: presente
- Neutrofili (lamina propria): marcata ← Label specifico ileo
- Erosioni/Ulcerazioni: presente
- Atrofia villi: moderata

Campione: SIGMA
🔬 Criteri colon
- Granulomi: assente
- Neutrofili (epitelio): lieve ← Label specifico colon
- Ascessi criptici: presente
- Distorsione arch.: presente
```

**Rationale**: Label disambiguano "neutrofili lamina propria" (ileo) vs "neutrofili intraepiteliali" (colon).

---

### 8. Validazione Clinica - Aggiornata per Ileo

**Controllo Granulomi Adattato**:

**Ileo**:
```javascript
if (granulomi_presente && 
    atrofia_villi_assente && 
    plasmacellule_aumentate_assente) {
    → Warning: "Granulomi SENZA alterazioni croniche (ILEO)"
    → Diagnosi alternative: TB, Yersinia, sarcoidosi, Crohn precoce
}
```

**Colon**:
```javascript
if (granulomi_presente && 
    distorsione_architettura_assente && 
    plasmacellule_basale_assente) {
    → Warning: "Granulomi SENZA alterazioni croniche"
    → Diagnosi alternative: TB, sarcoidosi, Crohn precoce
}
```

**Rationale**: Criteri cronicità diversi per ileo (atrofia villi) vs colon (distorsione architettura).

---

## 📊 Modifiche Tecniche Dettagliate

### File Modificato

**index_v2.4.0_PRODUCTION.html** (~1500 righe)

| Componente | Modifiche | Righe |
|------------|-----------|-------|
| **SpecimenForm** | UI dinamica ileo/colon | +120 |
| **calculateScoring** | Logica scoring ileo separata | +80 |
| **shouldShowNancy** | Disabilita se ileo | +3 |
| **calculateNancyIndex** | Filtra solo campioni colon | +2 |
| **validateClinicalLogic** | Controlli ileo-specific | +25 |
| **SpecimenList** | Label corretti display | +15 |
| **addSpecimen** | Gestisce siteType | +10 |
| APP_VERSION | 2.4.0 | +1 |
| STORAGE_KEY | V240 | +1 |
| **TOTALE** | **~257 righe modificate/aggiunte** | - |

---

## 📈 Impatto Clinico

### Accuratezza Diagnostica

| Area | Prima v2.3.5 | Dopo v2.4.0 | Miglioramento |
|------|--------------|-------------|---------------|
| **Ileo** | Criteri colon (sbagliati) | Criteri dedicati | ✅ Biologicamente corretto |
| **Nancy Index** | Applicabile anche con ileo | Solo colon | ✅ Metodologicamente valido |
| **Reperti transmurali** | Includeva (impossibili) | Eliminati | ✅ Realistico per biopsie |
| **Appendice** | Includeva (non biopsia) | Eliminata | ✅ Scope corretto |

### Usabilità

| Feature | v2.3.5 | v2.4.0 | Miglioramento |
|---------|--------|--------|---------------|
| Form ileo | Statico (criteri colon) | Dinamico (criteri ileo) | ✅ UX chiara |
| Feedback sede | Generico | Specifico per sede | ✅ Educativo |
| Display campioni | Label generici | Label site-specific | ✅ Disambiguazione |

---

## ✅ Testing Checklist v2.4.0

### Test Sedi
- [ ] Dropdown mostra: ileo, cieco, ascendente, trasverso, discendente, sigma, retto, pouch, anastomosi
- [ ] NON mostra: appendice, altro

### Test Form Dinamico
- [ ] Selezione "ileo" → form mostra: granulomi, neutrofili_lamina_propria, erosioni, iperplasia_linfoide, edema, atrofia_villi, plasmacellule_aumentate, fibrosi
- [ ] Selezione "sigma" → form mostra: granulomi, neutrofili_epitelio, ascessi_criptici, plasmacellule_basale, distorsione, metaplasia_paneth, ulcerazione, fibrosi
- [ ] Cambio sede → form si aggiorna dinamicamente
- [ ] Feedback testuale cambia ("Criteri ILEO" vs "Criteri COLON")

### Test Scoring Ileo
- [ ] Ileo con granulomi → Crohn +150 (non +100)
- [ ] Ileo con erosioni → Crohn +50
- [ ] Ileo con atrofia villi marcata → Crohn +30
- [ ] Ileo con neutrofili LP marcati → Crohn +20, UC +10

### Test Nancy Index
- [ ] Solo campioni colon → Nancy applicabile
- [ ] Almeno 1 campione ileo → Nancy NON applicabile
- [ ] Warning: "Nancy Index validato solo per UC colica"

### Test Validazione
- [ ] Ileo: granulomi + NO atrofia + NO plasmacellule aumentate → Warning TB/Yersinia
- [ ] Colon: granulomi + NO distorsione + NO plasmacellule basale → Warning TB/sarcoidosi

### Test Display
- [ ] SpecimenList mostra "🔬 Criteri ileo" vs "🔬 Criteri colon"
- [ ] Label corretti: "Neutrofili (lamina propria)" per ileo, "Neutrofili (epitelio)" per colon

### Regression Testing
- [ ] p53 separato (v2.3.1)
- [ ] Granulomi sospetti safety (v2.3.2)
- [ ] Modal disclaimer (v2.3.2)
- [ ] Banner permanente (v2.3.2)
- [ ] Terminologia "marcato" (v2.3.5)
- [ ] Validazione clinica (v2.3.5)

---

## 🔄 Migrazione da v2.3.5

**Breaking Change**: localStorage key cambiato (`ibdAppDataV240`)

**Dati Incompatibili**:
```
v2.3.5 specimens con findings:
- infiltrato_transmurale
- aggregati_linfoidi
- fissurazioni

→ NON compatibili con v2.4.0

Raccomandazione: Ricomincia casi da zero
```

**Se Devi Migrare**:
```javascript
const oldData = localStorage.getItem('ibdAppDataV235');
if (oldData) {
    const data = JSON.parse(oldData);
    
    // Rimuovi campi eliminati
    data.specimens = data.specimens.map(s => {
        delete s.findings.infiltrato_transmurale;
        delete s.findings.aggregati_linfoidi;
        delete s.findings.fissurazioni;
        
        // Aggiungi siteType se manca
        if (!s.siteType) {
            s.siteType = s.site === 'ileo' ? 'ileum' : 'colon';
        }
        
        return s;
    });
    
    localStorage.setItem('ibdAppDataV240', JSON.stringify(data));
}
```

**Raccomandazione**: **NON migrare**. Ricomincia da zero per evitare inconsistenze.

---

## 🎓 Design Philosophy v2.4.0

**Principio Guida**: **Biological Accuracy > Theoretical Completeness**

### Cosa Abbiamo Scelto di NON Fare

❌ **Non includere pezzi operatori**:
- Appendice, resezioni segmentarie → richiedono criteri diversi
- Tool focalizzato su **biopsie endoscopiche**

❌ **Non forzare criteri universali**:
- Ileo ≠ Colon anatomicamente
- Criteri devono riflettere anatomia normale

❌ **Non includere reperti impossibili**:
- Transmurali in biopsia = biologicamente impossibile
- Meglio ELIMINARE che fingere siano valutabili

### Cosa Abbiamo Fatto Bene

✅ **Criteri site-specific**:
- Ileo: erosioni aftose, atrofia villi, iperplasia linfoide
- Colon: ascessi criptici, distorsione criptica, metaplasia Paneth

✅ **Nancy Index metodologicamente corretto**:
- Solo per UC colica (come validato)
- Disabilitato se c'è ileo (onestà metodologica)

✅ **UX educativa**:
- Form spiega quali criteri sta usando
- Feedback visivo chiaro
- Label disambiguano anatomia

---

## 📚 Bibliografia v2.4.0

**Anatomia Normale**:
- Junqueira LC, Carneiro J. *Basic Histology* 13th ed. McGraw-Hill 2013
  - Capitolo 15: Digestive Tract - Ileum vs Colon architecture

**Crohn Ileale**:
- Geboes K et al. Histopathology of Crohn's disease. Verh K Acad Geneeskd Belg 2001
- Theodossi A et al. Observer variation in histological features of inflammatory bowel disease. Gut 1994

**Nancy Index Validation**:
- Marchal-Bressenot A et al. Development and validation of Nancy histological index for UC. Gut 2017
  - **Validazione**: Solo UC colica, non ileite

**Biopsie Endoscopiche**:
- Odze RD. Surgical Pathology of the GI Tract, Liver, Biliary Tract, and Pancreas. 3rd ed. Saunders 2015
  - Capitolo 12: Inflammatory Bowel Disease - Biopsy interpretation

---

## 🚀 Deploy Guide v2.4.0

### Pre-Deployment Checklist

- [ ] Backup v2.3.5 (se in uso)
- [ ] Test form dinamico (ileo vs colon)
- [ ] Test scoring ileo (granulomi +150)
- [ ] Test Nancy disabilitato con ileo
- [ ] Test display label corretti

### Deployment Steps

1. **Backup Current Version**:
   ```bash
   cp index.html index_v2.3.5_backup.html
   ```

2. **Deploy v2.4.0**:
   ```bash
   cp index_v2.4.0_PRODUCTION.html index.html
   ```

3. **Test Critical Paths**:
   - Aggiungi campione ileo → verifica criteri ileo
   - Aggiungi campione sigma → verifica criteri colon
   - Ileo + sigma insieme → verifica Nancy disabilitato

4. **Verifica localStorage**:
   - Apri Developer Tools → Application → Local Storage
   - Verifica key: `ibdAppDataV240`

### Rollback (se necessario)

```bash
cp index_v2.3.5_backup.html index.html
# Dati v2.3.5 NON compatibili con v2.4.0
```

---

## 🎯 Final Statement v2.4.0

**v2.4.0 rappresenta il tool come AVREBBE DOVUTO essere fin dall'inizio**:

- ✅ Biologicamente accurato (ileo ≠ colon)
- ✅ Metodologicamente corretto (Nancy solo UC colica)
- ✅ Realistico per biopsie (no transmurali)
- ✅ Educativo (UI spiega criteri)

**Questo è il tool per BIOPSIE ENDOSCOPICHE in IBD.**

Se hai bisogno di valutare **pezzi operatori** (appendice, resezioni) → servirebbero criteri diversi (tool diverso).

**Status**: 🎯 **PRODUCTION READY** - Biologicamente corretto

---

**End of Changelog v2.4.0**

**Version**: 2.4.0 Production  
**Release Date**: 18 Gennaio 2026  
**Breaking Changes**: Sì (localStorage, findings ileo, eliminati transmurali)

**🚀 Ready for deployment. Biologicamente solido. 🚀**
