# Casi Didattici - Quando il Tool Sbaglia

**Versione**: v3.0.2  
**Obiettivo**: Training anti-automation bias  
**Target**: Tutti gli utenti del tool (junior, tutor, responsabili)

---

## 🎯 Perché Questo Documento Esiste

**Problema**:
- Tool sembra "intelligente"
- Dà percentuali precise (72%, 85%, etc.)
- Usa linguaggio medico sofisticato
- **Rischio**: utente pensa "il tool sa meglio di me"

**Soluzione**:
Mostrare **esplicitamente** casi dove **tool sbaglia**.

**Obiettivo educativo**:
- Capire **quando** tool fallisce
- Imparare a **riconoscere** i pattern di errore
- Sviluppare **spirito critico** verso output automatici
- **Prevenire automation bias** ("se lo dice il tool...")

**Uso raccomandato**:
1. **Fase introduzione tool**: mostrare questi casi a tutto lo staff (30 min)
2. **Training nuovi utenti**: far lavorare su questi casi prima di tool uso routine
3. **Reminder periodico**: review trimestrale (1-2 casi)

---

## 📋 Struttura Casi

Ogni caso include:
- **Dati clinici** (essenziali)
- **Istologia** (findings)
- **Output tool** (cosa dice)
- **Diagnosi corretta** (cosa dovrebbe essere)
- **Perché il tool sbaglia** (analisi)
- **Lesson learned** (take-home)

---

## 🔴 CASO #1: Falso Crohn (Score Alto, Criteri Aspecifici)

### Dati Clinici
- **Paziente**: Donna, 45 anni
- **Anamnesi**: Diarrea cronica 6 mesi, no calo ponderale
- **Endoscopia**: Eritema diffuso continuo da retto a discendente, ileo indenne
- **Imaging**: Entero-RM negativa (no ispessimenti, no stenosi, no fistole)

### Istologia (Input Tool)

**Campioni**:
1. **Retto**: Neutrofili epitelio moderati, plasmacellule basali presenti, distorsione architettura presente
2. **Sigma**: Neutrofili epitelio moderati, distorsione architettura presente
3. **Discendente**: Neutrofili epitelio lievi, plasmacellule basali presenti

**IHC**: Non eseguita

**Altre coliti**: Tutto negativo

### Output Tool

```
Score:
- Crohn: 65%
- UC: 30%
- IBDU: 5%

Interpretazione:
"QUADRO COMPATIBILE CON MALATTIA DI CROHN"

Descrizione:
"Pattern morfologico compatibile con malattia di Crohn. 
Correlazione con dati clinici, endoscopici e imaging 
NECESSARIA per diagnosi definitiva."

Nota epistemologica:
"Score in range intermedio (60-79%). Diagnosi basata 
su criteri multipli ma non patognomonici. Conferma 
clinico-radiologica essenziale."
```

### Diagnosi Corretta

**COLITE ULCEROSA (RCU)**

**Perché**:
- Distribuzione **continua** retto → discendente (NO skip)
- Ileo **indenne** (classico RCU)
- Plasmacellule basali + distorsione architettura (RCU markers)
- Entero-RM **negativa** (esclude Crohn)
- Pattern topografico endoscopico = RCU classica

### Perché il Tool Sbaglia

**Meccanismo errore**:

1. Tool NON ha accesso a **imaging** (entero-RM negativa)
2. Tool calcola score su **criteri istologici** puri
3. Neutrofili + distorsione → punti sia Crohn che UC
4. In assenza granulomi, **topografia diventa decisiva**
5. Ma tool analizza solo "skip lesions" tra biopsie (non ha mappa endoscopica completa)

**Critica score**:
- Crohn 65% basato su: neutrofili (15), distorsione (15), topografia ambigua (?)
- **NESSUN** criterio patognomonico Crohn (no granulomi, no transmurale, no ileo)
- **Tutti** criteri compatibili anche con UC

**Il tool HA ragione a dire**:
> "Correlazione con imaging NECESSARIA"

**Il problema**: utente junior potrebbe fermarsi a "Crohn 65%", ignorando la nota.

### Lesson Learned

**🎓 Regola**:
> **Crohn score >60% SENZA granulomi o transmurale = SEMPRE verificare imaging**

**Red flags che dovevano far pensare RCU, non Crohn**:
- ✅ Distribuzione continua endoscopica
- ✅ Ileo indenne
- ✅ Plasmacellule basali (RCU marker)
- ✅ Entero-RM negativa (esclude Crohn)

**Cosa fare**:
1. Leggere **SEMPRE** nota epistemologica del tool
2. Se dice "conferma imaging essenziale" → **procurarsi imaging**
3. Mai diagnosi Crohn senza: granulomi OR transmurale OR imaging positivo
4. Pattern topografico clinico > scoring istologico puro

**Take-home**:
> **"Crohn con score 60-79% e imaging negativo = probabile RCU atipica o IBDU"**

---

## 🟠 CASO #2: Falso IBDU (RCU con Retto Risparmiato in Terapia)

### Dati Clinici
- **Paziente**: Uomo, 32 anni
- **Anamnesi**: RCU nota da 5 anni, in terapia con azatioprina + mesalazina
- **Indicazione**: Biopsia di controllo
- **Endoscopia**: Eritema sigma-discendente, **retto macroscopicamente indenne**

### Istologia (Input Tool)

**Campioni**:
1. **Retto**: Architettura normale, no flogosi acuta, lieve plasmacitosi
2. **Sigma**: Neutrofili moderati, plasmacellule basali presenti, distorsione presente
3. **Discendente**: Neutrofili lievi, plasmacellule basali presenti

**IBD nota**: ❌ NON spuntata (utente dimentica)  
**Terapia in corso**: ❌ NON spuntata (utente dimentica)

**IHC**: Non eseguita

### Output Tool

```
Score:
- UC: 45%
- Crohn: 35%
- IBDU: 20%

Interpretazione:
"PATTERN SUGGESTIVO MA NON DIAGNOSTICO PER COLITE ULCEROSA"

Warning topografico:
"⚠️ Retto risparmiato: Atipico per RCU classica"

Nota epistemologica:
"Score borderline (40-59%). Istologia da sola NON consente 
diagnosi. Verifica distribuzione continua, coinvolgimento 
rettale e risparmio ileale tramite endoscopia."
```

### Diagnosi Corretta

**UC IN REMISSIONE PARZIALE (retto normalizzato da terapia)**

**Perché**:
- RCU **nota** da 5 anni (diagnosi già posta)
- Terapia immunosoppressiva in corso
- Retto può **normalizzarsi** in RCU trattata
- Sigma-discendente ancora attivi (RCU residua)

### Perché il Tool Sbaglia

**Meccanismo errore**:

1. Tool NON sa che paziente ha **UC nota**
   - Utente ha dimenticato di spuntare "IBD nota"
   - Tool tratta come **prima diagnosi**

2. Tool rileva "retto risparmiato" → warning RCU atipica
   - **GIUSTO** per prima diagnosi
   - **SBAGLIATO** per RCU in terapia

3. Tool NON sa che paziente è **in terapia**
   - Utente ha dimenticato checkbox "terapia in corso" (v3.0.2)
   - Tool non modula warning retto risparmiato

**Se utente avesse spuntato correttamente**:
- "IBD nota: UC" → tool genera **Sintesi Endoscopista**
- "Terapia in corso" → warning diventa: *"Retto risparmiato in paziente in terapia: Non esclude RCU (retto può normalizzarsi)"*

### Lesson Learned

**🎓 Regola**:
> **SEMPRE chiedere anamnesi IBD prima di usare tool**

**Checkbox critici**:
- ✅ IBD nota? (cambia completamente output)
- ✅ Terapia in corso? (modula warning topografici)

**Cosa fare**:
1. **Prima di aprire tool**: procurarsi lettera clinica
2. Verificare se IBD già nota
3. Verificare se in terapia immunosoppressiva/biologica
4. Spuntare checkbox appropriate

**Take-home**:
> **"Retto risparmiato in RCU nota + terapia = normale, non IBDU"**

**Pattern generale**:
- RCU in terapia → retto può normalizzarsi per primo
- Non confondere "retto guarito" con "retto mai coinvolto"
- Anamnesi clinica > pattern istologico puro

---

## 🟡 CASO #3: Tool Indeciso Correttamente (IBDU Vero)

### Dati Clinici
- **Paziente**: Donna, 28 anni
- **Anamnesi**: Diarrea ematica 1 anno, no risposta a terapia UC
- **Endoscopia**: Lesioni a salto (cieco indenne, ascendente attivo, trasverso indenne, discendente attivo, sigma-retto normali)
- **Imaging**: Entero-RM dubbia (lieve ispessimento ileo terminale, no stenosi, no fistole)

### Istologia (Input Tool)

**Campioni**:
1. **Ileo**: Lieve plasmacitosi, architettura conservata, granulomi assenti
2. **Ascendente**: Neutrofili moderati, plasmacellule basali presenti, distorsione architettura presente
3. **Discendente**: Neutrofili lievi, plasmacellule basali presenti, granulomi assenti

**IHC**: CD68 diffuso mucosa

### Output Tool

```
Score:
- IBDU: 55%
- Crohn: 25%
- UC: 20%

Interpretazione:
"IBD NON CLASSIFICABILE (IBDU)"

Descrizione:
"Pattern contraddittorio con features sovrapposte Crohn/UC. 
Classificazione istologica non possibile."

Nota epistemologica:
"IBDU con overlap features. Scoring mostra pattern contraddittori 
(skip lesions + plasmacellule basali). Diagnosi definitiva richiede 
follow-up clinico-istologico prolungato."

Warning:
"⚠️ Pattern topografico Crohn-like: Distribuzione discontinua 
e/o ileo coinvolto con retto risparmiato"
```

### Diagnosi Corretta

**IBDU (Inflammatory Bowel Disease Unclassified)**

**Perché**:
- Skip lesions (Crohn-like)
- Plasmacellule basali + distorsione (RCU-like)
- NO granulomi (esclude Crohn classico)
- Ileo borderline (non diagnostico)
- Imaging dubbio (non conferma né esclude)

### Perché il Tool HA RAGIONE

**Questo caso è IBDU vero**:
- Features contraddittorie
- Nessun criterio patognomonico
- Pattern "ibrido"

**Tool è CORRETTO a essere indeciso**:
- IBDU 55% → riflette incertezza reale
- Nota epistemologica APPROPRIATA: "follow-up necessario"
- Warning topografico UTILE: segnala skip lesions

### Lesson Learned

**🎓 Regola**:
> **Tool indeciso (IBDU alto) ≠ tool che sbaglia. A volte indecisione è risposta giusta.**

**IBDU è diagnosi legittima quando**:
- Pattern overlap (Crohn + RCU features)
- No criteri patognomonici per Crohn (granulomi, transmurale)
- No pattern topografico classico RCU (continuo, retto coinvolto)
- Imaging non dirimente

**Cosa fare**:
1. **Accettare incertezza**: non forzare diagnosi Crohn/UC
2. Refertare come IBDU
3. Raccomandare **follow-up** (clinico, istologico, imaging)
4. Riclassificazione possibile in futuro

**Errore da evitare**:
❌ "IBDU è diagnosi vaga, devo scegliere Crohn o UC"  
✅ "IBDU è diagnosi CORRETTA quando pattern è indeterminato"

**Take-home**:
> **"Tool indeciso su IBDU = probabilmente caso IBDU vero. Non forzare classificazione."**

---

## 🔵 CASO #4: Granulomi da Rottura Criptale (Falso Crohn)

### Dati Clinici
- **Paziente**: Uomo, 55 anni
- **Anamnesi**: Diarrea 3 mesi, no calo ponderale, no febbre
- **Endoscopia**: Eritema diffuso continuo retto-sigma, ileo indenne
- **Imaging**: Non eseguita ancora

### Istologia (Input Tool)

**Campioni**:
1. **Sigma**: Neutrofili marcati, ascessi criptici multipli, **granulomi "presente"**
2. **Retto**: Neutrofili moderati, plasmacellule basali presenti

**Utente NON spunta** checkbox "Mucin granuloma plausibile" (non la vede o non capisce)

**IHC**: Non eseguita

### Output Tool (Senza Checkbox)

```
Score:
- Crohn: 75%
- UC: 20%
- IBDU: 5%

Interpretazione:
"MALATTIA DI CROHN (pattern istologico fortemente suggestivo)"

Warning:
"🔍 SIGMA: Granulomi epitelioidi SENZA alterazioni croniche
Considerare: tubercolosi, sarcoidosi, Crohn precoce, iatrogeni. 
DD infettiva richiede colorazioni specifiche."
```

### Diagnosi Corretta

**UC CON MUCIN GRANULOMA (rottura criptale)**

**Perché**:
- Distribuzione continua retto-sigma (RCU-like)
- Ascessi criptici **multipli** (contesto rottura criptale)
- Granulomi in **sede di ascessi** (molto sospetti per mucin)
- Ileo indenne (esclude Crohn ileale)
- Pattern RCU classico (plasmacellule basali, continuo)

**Approfondimento**:
- PAS-D: evidenzia mucin dentro granulomi → **mucin granuloma**
- Non sono granulomi epitelioidi Crohn

### Perché il Tool Sbaglia (Parzialmente)

**Cosa ha fatto bene**:
- ✅ Ha dato warning: "granulomi senza cronicità"
- ✅ Ha chiesto DD (tubercolosi, altro)

**Cosa ha fatto male**:
- ❌ Score 75% troppo alto (granulomi peso 100, non ridotto)
- ❌ Interpretazione "fortemente suggestivo Crohn" fuorviante

**SE utente avesse spuntato checkbox "Mucin granuloma"**:
- Peso granulomi: 100 → **15** (ridotto)
- Score Crohn: 75% → **~35%**
- Interpretazione: "Pattern aspecifico" invece di "Crohn"
- **Output CORRETTO**

### Lesson Learned

**🎓 Regola**:
> **Granulomi + ascessi criptici multipli = SEMPRE sospettare mucin granuloma**

**Pattern mucin granuloma**:
- Granulomi vicino ad ascessi criptici rotti
- Contesto RCU-like (plasmacellule basali, distorsione)
- NO altre alterazioni Crohn (skip, transmurale, ileo)

**Cosa fare**:
1. **Vedere granulomi** → guardarli bene
2. Verificare se vicino ad ascessi criptici
3. Se sì → **spuntare checkbox** "Mucin granuloma plausibile"
4. Considerare **PAS-D** per conferma

**Se dubbio**:
- Spunta checkbox (peso ridotto è più sicuro)
- Aggiungi nota referto: "Granulomi possibile rottura criptale, PAS-D consigliato"
- **Non diagnosticare Crohn** senza conferma granulomi epitelioidi veri

**Take-home**:
> **"Granulomi in RCU con ascessi = mucin granuloma fino a prova contraria"**

---

## 🟣 CASO #5: Displasia Oscura IBD Scoring (Pattern Topografico Falsato)

**NOTA**: Questo bug è stato RISOLTO in v3.0.2 (Fix #1 + #7), ma vale la pena mostrarlo per capire perché il fix era necessario.

### Dati Clinici
- **Paziente**: Uomo, 42 anni, RCU nota da 15 anni
- **Indicazione**: Sorveglianza displasia
- **Endoscopia**: Lesione rilevata sigma, resto pattern RCU quiescente

### Istologia (Input Tool v3.0.1 - VECCHIO)

**Campioni**:
1. **Sigma lesione**: **Displasia HGD** (no flogosi attiva)
2. **Sigma non-lesione**: Distorsione architettura, no attività
3. **Retto**: Distorsione architettura, no attività
4. **Discendente**: Distorsione architettura, lieve plasmacitosi

### Output Tool v3.0.1 (SBAGLIATO)

```
Pattern topografico:
"⚠️ Skip lesions rilevate: sigma coinvolto, discendente non coinvolto"

Score:
- Crohn: 45%
- UC: 40%
- IBDU: 15%

Interpretazione:
"Pattern borderline, pattern topografico Crohn-like"
```

**ERRORE**: v3.0.1 contava sigma come "coinvolto" per displasia HGD → falsi skip lesions

### Output Tool v3.0.2 (CORRETTO)

```
DISPLASIA RILEVATA (BOX ROSSO PRIORITARIO):
"⚠️ DISPLASIA: HGD
Sede: SIGMA
Raccomandazione: Colectomia da considerare. Discussione 
multidisciplinare URGENTE."

Pattern topografico:
"Distribuzione continua RCU-like, pattern cronicità diffusa"

Score IBD:
- UC: 85%
- Crohn: 10%
- IBDU: 5%

(Displasia NON influenza scoring IBD)
```

### Lesson Learned

**🎓 Regola**:
> **Displasia ≠ infiammazione. Non conta per pattern topografico IBD.**

**v3.0.2 Fix**:
- Displasia esclusa da `hasInflammatoryFindings()`
- Report displasia **separato** e **prioritario**
- Scoring IBD pulito (no contaminazione displasia)

**Take-home**:
> **"Se usi v3.0.1 o precedente, ATTENZIONE: displasia falsa pattern topografico"**  
> **"Se usi v3.0.2, fix applicato, ma ricorda: displasia = neoplasia, IBD = infiammazione"**

---

## 📊 Riepilogo Errori Tipici Tool

| Pattern Errore | Frequenza | Gravità | Come Riconoscere | Fix |
|----------------|-----------|---------|------------------|-----|
| **Crohn senza patognomonici** | 🟠 Media | 🔴 Alta | Score 60-79%, no granulomi, imaging non fatto | Procurarsi imaging |
| **UC con retto risparmiato (terapia)** | 🟡 Bassa | 🟠 Media | IBD nota + terapia, checkbox non spuntate | Spuntare "terapia in corso" |
| **IBDU indeciso (corretto)** | 🟢 Comune | ✅ Nessuna | Pattern overlap, tool dice IBDU | Accettare indecisione |
| **Mucin granuloma → falso Crohn** | 🟠 Media | 🔴 Alta | Granulomi + ascessi multipli, checkbox non usata | Spuntare "mucin plausibile" |
| **Displasia falsa topografia** | 🔴 Rara (v3.0.2 fix) | 🟠 Media | Solo v3.0.1, displasia + skip lesions | Upgrade v3.0.2 |

---

## 🎯 Quiz Autovalutazione

**Dopo aver letto i casi, rispondi**:

1. **Caso Crohn 65% senza granulomi, cosa fai?**
   - ❌ Referto "Crohn" (score alto)
   - ✅ Verifico imaging prima di diagnosi

2. **Paziente RCU nota, retto risparmiato, cosa pensi?**
   - ❌ IBDU (retto deve essere coinvolto)
   - ✅ RCU in terapia (retto normalizzato)

3. **Tool dice IBDU 60%, cosa significa?**
   - ❌ Tool indeciso = tool sbaglia
   - ✅ Caso IBDU vero (pattern overlap)

4. **Granulomi vicino ad ascessi criptici, cosa fai?**
   - ❌ Diagnosi Crohn (granulomi presenti)
   - ✅ Sospetto mucin, spunto checkbox, considero PAS-D

5. **Displasia HGD in sigma, cosa prioritizzi?**
   - ❌ Scoring IBD
   - ✅ Displasia (box rosso, colectomia)

**Score**:
- 5/5 → ✅ Pronto per tool
- 3-4/5 → ⚠️ Review casi, poi riprova
- <3/5 → ❌ Studia PREREQUISITES.md prima

---

## 💡 Take-Home Generale

**Cosa abbiamo imparato**:

1. **Tool può sbagliare** (e sbaglia, abbiamo visto 5 casi)
2. **Score alto ≠ certezza diagnostica** (serve correlazione)
3. **Checkbox importanti** (IBD nota, terapia, mucin granuloma)
4. **Warning del tool = da leggere** (non ignorare)
5. **Note epistemologiche = critiche** (spiegano limiti)
6. **IBDU indeciso = a volte risposta corretta** (non forzare)
7. **Imaging > istologia** quando Crohn senza granulomi
8. **Anamnesi clinica** cambia tutto (RCU nota vs prima diagnosi)

**Filosofia finale**:
> **"Il tool è uno strumento imperfetto nelle mani di un medico pensante.  
> Non un patologo perfetto che sostituisce il medico."**

**Se ricordi questi 5 casi** → automation bias prevenuto. ✅

---

## 📚 Utilizzo Didattico

### Per Training Nuovi Utenti
1. Far leggere tutti i 5 casi (30 min)
2. Quiz autovalutazione (5 min)
3. Se score <4/5 → review + secondo tentativo
4. SOLO se 4-5/5 → abilitazione tool

### Per Review Periodica
- Ogni 3 mesi: presentare 1-2 casi a staff (10 min meeting)
- Focus: "Questo trimestre, casi simili?"
- Discussione automation bias

### Per Casi Reali Problematici
- Caso reale sbagliato da utente → confronta con questi 5
- Identifica pattern errore
- Rinforza lesson learned specifica

---

## 📞 Feedback

**Hai trovato altri pattern dove tool sbaglia?**
- Email: filippo.bianchi@asst-fbf-sacco.it
- Subject: [IBD Tool] Nuovo Caso Didattico

**Condividi casi interessanti** → possibile inclusione versioni future documento.

---

**Autore**: Dr. Filippo Bianchi  
**Revisione**: Gennaio 2026  
**Motto**: "Impara dagli errori del tool, non farli tuoi"

---

**Fine CASI_DIDATTICI.md**
