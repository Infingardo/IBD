# 🗑️ Pulizia Repository IBD - File da Eliminare

**Data**: 18 Gennaio 2026  
**Versione attuale**: v2.4.0 Production

---

## ❌ File da ELIMINARE (obsoleti)

### Documentazione Vecchie Versioni

```bash
# Changelog obsoleti
git rm CHANGELOG_v2.2_FIXED.md

# Guide implementazione vecchie
git rm IMPLEMENTATION_GUIDE_v2.3_FIXED.md

# Index file obsoleto
git rm INDEX_FIXED_FILES.md

# Release summary vecchio
git rm V2.2_RELEASE_SUMMARY.md
```

### File Build Inutili (usi HTML singolo + CDN)

```bash
# Package.json - non serve, non è un progetto npm
git rm package_json.json

# Tailwind config - non serve, usi CDN
git rm tailwind_config.js
```

---

## 🔄 File da SOSTITUIRE

### README.md

```bash
# Backup vecchio (opzionale)
mv readme.md readme_v2.2.2_backup.md

# Sostituisci con nuovo
mv README_v2.4.0.md README.md
```

### NANCY_INDEX_QUICK_GUIDE.md

```bash
# Backup vecchio (opzionale)
mv NANCY_INDEX_QUICK_GUIDE.md NANCY_INDEX_QUICK_GUIDE_v2.2.2_backup.md

# Sostituisci con nuovo
mv NANCY_INDEX_QUICK_GUIDE_v2.4.0.md NANCY_INDEX_QUICK_GUIDE.md
```

---

## ✅ File da MANTENERE

```
/IBD
├── index.html                  ✅ Tool v2.4.0 Production
├── README.md                   ✅ (sostituito con v2.4.0)
├── CHANGELOG_v2.4.0.md         ✅ Changelog corrente
├── BUGFIX_SUMMARY_v2.4.0.md    ✅ Bug fix v2.4.0
├── NANCY_INDEX_QUICK_GUIDE.md  ✅ (sostituito con v2.4.0)
└── LICENSE.md                  ✅ (se esiste)
```

---

## 🚀 Script Completo Pulizia

```bash
cd /path/to/IBD

# 1. Elimina file obsoleti
git rm CHANGELOG_v2.2_FIXED.md
git rm IMPLEMENTATION_GUIDE_v2.3_FIXED.md
git rm INDEX_FIXED_FILES.md
git rm V2.2_RELEASE_SUMMARY.md
git rm package_json.json
git rm tailwind_config.js

# 2. Elimina vecchio readme (minuscolo)
git rm readme.md

# 3. Elimina vecchia guida Nancy
git rm NANCY_INDEX_QUICK_GUIDE.md

# 4. Aggiungi nuovi file (dopo averli copiati nella repo)
git add README.md
git add NANCY_INDEX_QUICK_GUIDE.md

# 5. Commit
git commit -m "chore: pulizia repo - rimossi file obsoleti v2.2.x, aggiornato README e Nancy guide per v2.4.0"

# 6. Push
git push origin main
```

---

## 📋 Checklist Post-Pulizia

- [ ] `index.html` è v2.4.0
- [ ] `README.md` dice v2.4.0 (non v2.2.2)
- [ ] `NANCY_INDEX_QUICK_GUIDE.md` menziona "disabilitato se ileo"
- [ ] `CHANGELOG_v2.4.0.md` presente
- [ ] `BUGFIX_SUMMARY_v2.4.0.md` presente
- [ ] Nessun file `_FIXED.md` rimasto
- [ ] Nessun `package_json.json`
- [ ] Nessun `tailwind_config.js`
- [ ] GitHub Pages funziona: https://infingardo.github.io/IBD/

---

## 📊 Prima vs Dopo

### PRIMA (disordine)
```
/IBD
├── index.html
├── readme.md                           ← minuscolo, v2.2.2
├── CHANGELOG_v2.2_FIXED.md             ← obsoleto
├── CHANGELOG_v2.4.0.md
├── BUGFIX_SUMMARY_v2.4.0.md
├── IMPLEMENTATION_GUIDE_v2.3_FIXED.md  ← obsoleto
├── INDEX_FIXED_FILES.md                ← obsoleto
├── V2.2_RELEASE_SUMMARY.md             ← obsoleto
├── NANCY_INDEX_QUICK_GUIDE.md          ← v2.2.2, manca nota ileo
├── package_json.json                   ← inutile
└── tailwind_config.js                  ← inutile
```

### DOPO (pulito)
```
/IBD
├── index.html                  ← v2.4.0 Production
├── README.md                   ← v2.4.0, maiuscolo
├── CHANGELOG_v2.4.0.md         ← Changelog corrente
├── BUGFIX_SUMMARY_v2.4.0.md    ← Bug fix
├── NANCY_INDEX_QUICK_GUIDE.md  ← v2.4.0, con nota ileo
└── LICENSE.md                  ← (se presente)
```

**File eliminati: 6**  
**File aggiornati: 2**  
**File mantenuti: 4-5**

---

## ⚠️ Note

1. **Backup consigliato**: Prima di eliminare, fai `git tag v2.2.2-archive` se vuoi mantenere uno snapshot

2. **GitHub Pages**: Dopo il push, verifica che il sito funzioni ancora

3. **Se hai dubbi**: Puoi spostare i file obsoleti in una cartella `/archive` invece di eliminarli:
   ```bash
   mkdir -p archive/v2.2.x
   git mv CHANGELOG_v2.2_FIXED.md archive/v2.2.x/
   # etc...
   ```

---

**Fine istruzioni pulizia**
