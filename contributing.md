# Contributing to IBD Diagnostic Tool

Grazie per l'interesse nel contribuire all'IBD Diagnostic Tool! Questo documento fornisce linee guida per contribuire al progetto.

## 🎯 Tipi di Contributi Benvenuti

### 📚 Contenuto Scientifico
- Aggiornamento marker immunoistochimici con nuovi dati validati
- Aggiunta criteri diagnostici da linee guida aggiornate
- Miglioramento descrizioni istologiche nell'atlante
- Correzione errori scientifici

### 💻 Codice
- Bug fixes
- Miglioramenti UI/UX
- Ottimizzazioni performance
- Nuove funzionalità

### 📖 Documentazione
- Miglioramento README
- Tutorial d'uso
- Traduzione in altre lingue
- Esempi di casi clinici

## 🔬 Requisiti per Contributi Scientifici

**IMPORTANTE**: Tutti i contributi che modificano contenuto medico devono rispettare questi criteri:

### 1. Evidence-Based Medicine
- Ogni modifica deve essere supportata da **letteratura peer-reviewed**
- Preferire review sistematiche e meta-analisi
- Linee guida da società scientifiche riconosciute (ECCO, ACG, BSG, etc.)

### 2. Citazioni Obbligatorie
Quando aggiungi o modifici contenuto medico, includi:

```javascript
// Esempio per nuovo marker IHC
{
  name: 'NUOVO_MARKER',
  target: 'Target proteico',
  indication: 'Indicazione clinica',
  cutoff: 'Cut-off validato',
  // OBBLIGATORIO: riferimento bibliografico
  reference: {
    authors: 'Smith J et al.',
    title: 'Validation of NUOVO_MARKER in IBD',
    journal: 'Gut',
    year: 2024,
    pmid: '12345678',
    doi: '10.1136/gutjnl-2024-xxxxx'
  },
  sensitivity: 'XX%',
  specificity: 'XX%'
}
```

### 3. Validazione Cut-off
I cut-off diagnostici devono:
- Essere validati su **coorti indipendenti**
- Includere sensibilità E specificità
- Specificare se cut-off è locale o universale

### 4. Revisione da Pari
- Modifiche sostanziali al contenuto medico richiedono review da patologo/gastroenterologo
- Indicare qualifica professionale nelle PR che modificano algoritmi diagnostici

## 🚀 Come Contribuire

### 1. Setup Ambiente di Sviluppo

```bash
# Fork del repository
git clone https://github.com/TUO-USERNAME/ibd-diagnostic-tool.git
cd ibd-diagnostic-tool

# Installa dipendenze
npm install

# Crea branch per la feature
git checkout -b feature/nome-feature
```

### 2. Sviluppo

```bash
# Avvia development server
npm start

# Testa le modifiche
npm test

# Verifica linting
npm run lint
```

### 3. Commit Guidelines

Usa **Conventional Commits**:

```bash
# Feature
git commit -m "feat: aggiunge marker CD117 per GIST"

# Bug fix
git commit -m "fix: corregge calcolo score Nancy Index"

# Documentazione
git commit -m "docs: aggiorna bibliografia sezione displasia"

# Contenuto medico
git commit -m "content: aggiorna cut-off CD3 secondo ECCO 2024"
```

Prefissi validi:
- `feat`: Nuova funzionalità
- `fix`: Bug fix
- `docs`: Documentazione
- `content`: Contenuto medico/scientifico
- `style`: Formattazione codice
- `refactor`: Refactoring senza cambio funzionalità
- `test`: Aggiunta test
- `chore`: Manutenzione

### 4. Pull Request

1. **Descrizione chiara**: Spiega COSA e PERCHÉ
2. **Riferimenti**: Link a issues correlate
3. **Testing**: Descrivi come hai testato
4. **Bibliografia**: Per modifiche mediche, lista riferimenti
5. **Screenshots**: Per modifiche UI

Template PR:
```markdown
## Descrizione
[Descrizione chiara delle modifiche]

## Tipo di modifica
- [ ] Bug fix
- [ ] Nuova feature
- [ ] Contenuto medico
- [ ] Documentazione

## Riferimenti Bibliografici
(se applicabile)
1. Autore et al. (Anno). Titolo. Journal. PMID: xxxxx

## Testing
[Come hai testato le modifiche]

## Checklist
- [ ] Ho letto le CONTRIBUTING guidelines
- [ ] Il codice segue lo style del progetto
- [ ] Ho aggiunto test per le nuove features
- [ ] Ho aggiornato la documentazione
- [ ] Le modifiche mediche sono supportate da letteratura
```

## 📋 Modifiche Specifiche

### Aggiungere Nuovo Marker IHC

1. Aggiungi il marker in `ihcMarkers` object
2. Includi cut-off validato
3. Aggiungi sensibilità/specificità da studi validati
4. Cita lo studio di validazione
5. Aggiorna atlante istologico se necessario

### Modificare Algoritmo Diagnostico

1. **ATTENZIONE**: Modifiche all'algoritmo richiedono review rigorosa
2. Documenta razionale scientifica
3. Cita linee guida aggiornate
4. Testa con casi noti
5. Valuta impatto su diagnosi esistenti

### Aggiungere Immagini Istologiche

**In sviluppo**: Sistema di upload immagini con:
- Consenso paziente
- Anonimizzazione
- Descrizione annotata
- Diagnosi confermata

## 🔒 Sicurezza e Privacy

- **NO dati pazienti reali** nel codice pubblico
- Anonimizzare completamente ogni caso clinico
- Rispettare GDPR e normative locali
- Segnalare vulnerabilità via email privata

## ❓ Domande?

- **Issue Tracker**: Per bug e feature requests
- **Discussions**: Per domande generali
- **Email**: [tua-email] per questioni sensibili

## 📜 Codice di Condotta

### Impegni
- Rispetto reciproco
- Linguaggio professionale
- Focus su miglioramento scientifico
- Accoglienza verso nuovi contributori

### Non Tollerato
- Linguaggio offensivo
- Attacchi personali
- Contributi non evidence-based
- Violazioni privacy

## 🏆 Riconoscimenti

I contributori saranno riconosciuti in:
- Lista CONTRIBUTORS.md
- Release notes
- Sezione "About" dell'app (per contributi sostanziali)

## 📚 Risorse Utili

### Linee Guida IBD
- [ECCO Guidelines](https://www.ecco-ibd.eu/publications/ecco-guidelines-science.html)
- [ACG Clinical Guidelines](https://gi.org/clinical-guidelines/)
- [BSG Guidelines](https://www.bsg.org.uk/clinical-guidelines/)

### Database Medici
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/)
- [Cochrane Library](https://www.cochranelibrary.com/)
- [UpToDate](https://www.uptodate.com/)

### Anatomia Patologica
- [PathologyOutlines](https://www.pathologyoutlines.com/)
- [WHO Classification](https://tumourclassification.iarc.who.int/)

---

**Grazie per aiutare a migliorare lo strumento diagnostico per IBD!**

*Ultimo aggiornamento: Ottobre 2025*