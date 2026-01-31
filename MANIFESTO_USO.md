# Manifesto per l'Introduzione del Tool IBD in un Servizio di Anatomia Patologica

**Target**: Direttori, Responsabili, Tutor  
**Obiettivo**: Prevenire "effetto reverenza" e automation bias  
**Versione**: v3.0.2

---

## 🎯 Problema da Prevenire

**Scenario pericoloso**:
- Giovane collega scopre tool IBD
- "Finalmente uno strumento che mi dice la diagnosi!"
- Inizia a usarlo come **oracolo** invece che come **checklist**
- Diagnosi = copia-incolla output tool
- **Automation bias**: "se lo dice il tool..."

**Risultato**:
- ❌ Perde capacità di ragionamento autonomo
- ❌ Non impara veramente l'IBD
- ❌ Rischio errori quando tool sbaglia (e sbaglia)

**Questo manifesto serve a PREVENIRE questo scenario.**

---

## 📋 Checklist Pre-Introduzione

**Prima di introdurre il tool nel servizio, verificare**:

### Prerequisiti Organizzativi
- [ ] **Meeting MDT IBD attivi** (correlazione clinica garantita)
- [ ] **Supervisione senior disponibile** per discussione casi complessi
- [ ] **Cultura "challenge-friendly"**: OK dissentire da algoritmi
- [ ] **Casistica IBD minima**: ≥30 casi/anno (altrimenti tool sprecato)
- [ ] **Letteratura aggiornata**: accesso a review IBD recenti

### Prerequisiti Staff
- [ ] Almeno **1 senior con expertise IBD** (>100 casi personali)
- [ ] Junior hanno fatto **≥20-30 casi supervisionati** prima di tool
- [ ] Staff conosce **basi IBD** (granulomi, Nancy, plasmacellule basali)
- [ ] **No resistenza tecnologica**: staff disposto a usare tools digitali

### Prerequisiti Tecnici
- [ ] Accesso web garantito (tool HTML, no installazione)
- [ ] Browser moderni disponibili (Chrome, Firefox, Safari)
- [ ] Possibilità **salvataggio locale** dati (localStorage browser)

**Se <70% checkbox** → **RIMANDARE** introduzione. Prima strutturare base, poi tool.

---

## 🎓 Piano di Introduzione (4 Settimane)

### **Settimana 1: Presentazione "Onesta"**

**Obiettivo**: Far capire **cosa è** e **cosa NON è** il tool.

**Attività**:
1. **Meeting staff** (30 min):
   - Mostra tool live
   - Spiega filosofia: **"Checklist intelligente, non patologo AI"**
   - **Critico**: mostra un caso dove **tool sbaglia** (vedi CASI_DIDATTICI.md)

2. **Messaggio chiave** (ripetere 3 volte nel meeting):
   > "Il tool può sbagliare. Il patologo siete voi. Responsabilità = vostra."

3. **Demo caso corretto**:
   - Prendi caso RCU classica refertato da senior
   - Mostra inserimento dati nel tool
   - Output tool: "RCU-like 85%"
   - **Sottolinea**: "Tool concorda, MA noi avevamo già fatto diagnosi PRIMA"

4. **Demo caso sbagliato** (IMPORTANTE):
   - Caso: Crohn score 65% ma solo criteri aspecifici, imaging negativo
   - Senior aveva refertato: "IBDU, possibile Crohn, imaging negativo esclude"
   - Tool: "Quadro compatibile con Crohn"
   - **Messaggio**: "Vedete? Tool sbaglia. Voi dovete saperlo."

**Deliverable**: Staff ha visto tool sbagliare in diretta → automation bias prevenuto.

---

### **Settimana 2: Training Guidato**

**Obiettivo**: Imparare workflow corretto.

**Workflow corretto** (da insegnare e ripetere):
```
1. Ricevi caso
2. Leggi vetrini TU (senza tool)
3. Fai TUA ipotesi diagnostica (annota)
4. Raccogli dati clinici/endoscopici
5. Inserisci dati nel tool
6. Compara output tool vs tua ipotesi
7. Se concordi → ottimo (doppio check fatto)
8. Se discordi → RAGIONA sul perché
9. Diagnosi finale = TUA responsabilità (eventualmente integra tool)
```

**Attività**:
- Ogni junior lavora **5 casi retrospettivi** con questo workflow
- Per ogni caso:
  - Lettura vetrini → ipotesi personale (scritta)
  - Tool check
  - Discussione con senior: "Perché concordi/discordi col tool?"

**Red flag** da intercettare:
- Collega che guarda tool PRIMA di leggere vetrini
- Collega che non sa spiegare perché concorda col tool
- Collega che dice "il tool ha sempre ragione"

**Se red flag** → stop uso tool per quel collega, back to basics.

---

### **Settimana 3: Uso Semi-Autonomo**

**Obiettivo**: Consolidare abitudine "tool come check, non come oracolo".

**Setup**:
- Junior usa tool su **casi correnti** (non retrospettivi)
- Senior disponibile per **consultazione su discrepanze**
- **Regola**: se tool e junior discordano >20% score → discussione obbligatoria

**Casi da prioritizzare**:
- ✅ RCU classiche (tool quasi sempre concorda → fiducia)
- ✅ Crohn ileali con granulomi (tool affidabile)
- ⚠️ IBDU (tool spesso indeciso → stimola ragionamento)
- ⚠️ Pattern borderline (tool utile ma richiede interpretazione)

**Evitare in questa fase**:
- ❌ Displasia HGD (troppo critica, serve senior diretto)
- ❌ Casi medico-legali
- ❌ First diagnosis in paziente critico

**Feedback loop**:
- Fine settimana: **15 min debrief** con staff
- Domande:
  - Quante volte tool ha aiutato?
  - Quante volte avete dissentito? Perché?
  - Ci sono stati "momenti di dubbio" (automation bias)?

---

### **Settimana 4: Autonomia con Guardrail**

**Obiettivo**: Uso routine con safety net.

**Setup**:
- Junior usa tool in autonomia
- **Guardrail**: casi con score 40-60% → discussione senior raccomandata
- **Mandatory review**: displasia, granulomi senza cronicità, CMV positivo

**KPI da monitorare** (semplici):
- % casi dove junior discorda da tool (atteso: 10-20%)
- % casi discussi con senior dopo tool (atteso: 20-30%)
- Tempo medio uso tool (atteso: 5-10 min/caso)

**Se KPI anomali**:
- Junior **mai** discorda da tool (0%) → automation bias, intervento
- Junior **sempre** discorda (>50%) → o tool inutile o junior non capisce IBD
- Tempo >20 min/caso → troppo complesso, rivedere workflow

---

## 🚨 Red Flags - Quando Intervenire

**Automation bias in atto se**:

1. **"Il tool dice..."** (frase ripetuta ≥3 volte in un referto)
2. **Referto = copia-incolla tool** (senza personalizzazione)
3. **Nessuna discordanza** (100% accordo tool in 20+ casi → sospetto)
4. **Bypassing supervisione**: "Non ho chiesto al senior perché il tool era sicuro"
5. **Overconfidence post-tool**: "Adesso so fare IBD" (dopo 10 casi)

**Azioni correttive**:

| Red Flag | Gravità | Azione |
|----------|---------|--------|
| "Il tool dice..." ripetuto | 🟡 Media | Coaching: "Cambia frasi in 'la mia valutazione...'" |
| Copia-incolla referto | 🟠 Alta | Stop tool 1 settimana, back to supervised |
| 100% accordo tool | 🟠 Alta | Review casi: vero accordo o automation bias? |
| Bypass supervisione | 🔴 Critica | Stop tool, discussione formale, supervision plan |
| Overconfidence | 🟠 Alta | Reality check: caso complesso supervised |

**Regola d'oro**: 2 red flags in 1 mese → **sospendere tool** per quel collega.

---

## 💬 Frasi da Promuovere vs Evitare

### ✅ Frasi CORRETTE (da rinforzare)

- "Ho letto i vetrini e penso sia Crohn. Il tool concorda, quindi procedo."
- "Il tool suggerisce RCU 70%, ma manca il pattern topografico continuo, quindi resto su IBDU."
- "Score intermedio, ho bisogno di imaging per decidere."
- "Il tool non ha considerato X, aggiungo al referto."
- "Qui il tool sbaglia perché..."

### ❌ Frasi SBAGLIATE (da correggere immediatamente)

- "Il tool dice Crohn, quindi è Crohn."
- "Lo score è 72%, quindi diagnosi fatta."
- "Non ho bisogno di senior, c'è il tool."
- "Il tool non sbaglia mai."
- "Prima guardo il tool, poi i vetrini." (ordine INVERSO)

**Se senti frase sbagliata** → intervento immediato, non aspettare.

---

## 🎯 Golden Standard Utente

**Un collega usa BENE il tool quando**:

1. ✅ **Legge vetrini PRIMA** di aprire tool (ordine corretto)
2. ✅ **Sa spiegare perché** concorda o discorda da tool
3. ✅ **Modifica/integra** output tool (non copia-incolla cieco)
4. ✅ **Chiede supervisione** quando tool e ipotesi discordano
5. ✅ **Tratta tool come "junior colleague"** → utile ma fallibile
6. ✅ **Cerca letteratura** se tool segnala pattern insolito
7. ✅ **Documenta ragionamento** ("tool suggerisce X, io penso Y perché Z")

**Test pratico** (per responsabile):
- Chiedi al collega: "Perché hai fatto questa diagnosi?"
- ✅ Risposta corretta: "Ho visto X nei vetrini, correlato con clinica Y, tool ha confermato"
- ❌ Risposta sbagliata: "Il tool diceva 75%"

---

## 📊 Monitoraggio Ongoing (Post-Introduzione)

### Metriche Mensili (Semplici)

**Raccogliere**:
1. **N° casi con tool usato** (atteso: 50-70% casi IBD)
2. **N° discordanze tool-patologo** (atteso: 10-20%)
3. **N° consulenze senior post-tool** (atteso: 15-25%)
4. **Tempo medio uso tool** (atteso: 5-10 min)

**Alert se**:
- Uso tool <30% → staff non lo trova utile, capire perché
- Uso tool 100% → possibile automation bias, verificare
- Discordanze 0% → automation bias confermato
- Discordanze >40% → o tool inadeguato o training insufficiente
- Tempo >15 min → workflow troppo complesso

### Review Trimestrale

**Meeting staff** (30 min ogni 3 mesi):
1. **Casi interessanti**: dove tool ha aiutato vs dove ha sbagliato
2. **Lessons learned**: pattern che tool non cattura
3. **Feedback tool**: proposte miglioramento
4. **Check automation bias**: autovalutazione staff

**Domanda chiave** (anonima):
> "Quante volte questo trimestre hai fatto diagnosi SOLO basandoti su tool, senza ragionamento proprio?"

- 0 volte → ✅ Ottimo
- 1-2 volte → ⚠️ Attenzione
- ≥3 volte → 🚨 Automation bias, intervento necessario

---

## 🎓 Casi Didattici Obbligatori (Vedi CASI_DIDATTICI.md)

**Nella fase introduzione, MOSTRARE a tutto lo staff**:

1. **Caso tool sbaglia per eccesso** (Crohn 65% ma solo aspecifico)
2. **Caso tool sbaglia per difetto** (IBDU ma era RCU atipica)
3. **Caso tool indeciso correttamente** (IBDU vero, pattern overlap)

**Messaggio**:
> "Questi sono casi dove il tool fallisce o è incerto. Se il tool fosse perfetto, non servireste voi. Voi siete qui per PENSARE, non per eseguire."

---

## 🔧 Configurazione Organizzativa Consigliata

### Ruoli

**Responsabile Tool** (1 senior):
- Monitora uso
- Gestisce casi problematici
- Aggiorna staff su nuove versioni
- Punto di contatto con sviluppatore (se feedback)

**Tutor Junior** (1-2 senior):
- Supervisiona casi borderline
- Disponibile per discussione discrepanze
- Valuta automation bias

**Users** (tutti junior/mid-level):
- Usano tool secondo workflow
- Documentano discordanze
- Feedback su usabilità

### Regole Ferme

1. **Tool NON sostituisce supervisione senior** (sempre disponibile)
2. **Displasia** → sempre doppia lettura (tool + senior)
3. **Casi medico-legali** → tool opzionale, decisione senior prioritaria
4. **Score 40-60%** → discussione senior raccomandata
5. **Pattern contraddittori** → meeting MDT prima di referto definitivo

---

## 🏥 Per Servizi Senza Expertise IBD

**Scenario**: Servizio piccolo, pochi casi IBD, no senior dedicato.

**Raccomandazione**: **NON introdurre tool**.

**Perché**:
- Tool richiede base IBD solida
- Senza supervisione senior → automation bias inevitabile
- Meglio: consulenza esterna senior IBD

**Alternativa**:
1. Usa tool per **screening preliminare**
2. **Tutti i casi** → consulenza senior esterno
3. Tool serve solo per: "pattern Crohn-like, invio a centro terziario"

**Mai usare tool come sostituto consulenza senior in servizi senza expertise.**

---

## 💡 Cultura da Promuovere

**Mantra da ripetere** (in meeting, training, feedback):

1. **"Il tool è uno strumento, non un maestro"**
2. **"Va bene dissentire dal tool"** (anzi, è sano)
3. **"Il tool può sbagliare"** (e voi dovete accorgervene)
4. **"Responsabilità diagnostica = sempre vostra"** (non del tool)
5. **"Tool migliora qualità, non velocità"** (non è shortcut)

**Anti-pattern da scoraggiare**:
- ❌ "Facciamo come dice il tool"
- ❌ "Il tool sa meglio di noi"
- ❌ "Se il tool sbaglia, colpa sua"
- ❌ "Non ho bisogno di studiare, c'è il tool"

**Ogni volta che senti anti-pattern** → correzione immediata.

---

## 📞 Escalation Path

**Se situazione degenera** (automation bias diffuso, errori diagnostici):

1. **Sospensione tool** (temporanea)
2. **Review casi ultimi 3 mesi** con tool
3. **Identificare errori** dovuti ad automation bias
4. **Re-training staff** (back to basics)
5. **Re-introduzione graduale** con supervision 1:1

**Non avere paura di sospendere tool se non funziona.**  
Meglio nessun tool che tool usato male.

---

## ✅ Success Criteria (6 Mesi Post-Introduzione)

**Tool è stato introdotto CON SUCCESSO se**:

- ✅ **Discordanze 10-20%**: staff pensa autonomamente
- ✅ **Errori diagnostici stabili**: tool non ha peggiorato performance
- ✅ **Satisfaction staff**: trova tool utile ma non essenziale
- ✅ **Teaching efficacy**: junior imparano meglio (tool stimola ragionamento)
- ✅ **No automation bias**: nessun caso "copia-incolla cieco"
- ✅ **Consulenze senior stabili**: tool non ha sostituito supervisione

**Tool è stato introdotto MALE se**:

- ❌ **Discordanze 0%**: automation bias totale
- ❌ **Errori aumentati**: tool ha creato falsa sicurezza
- ❌ **Dipendenza**: staff non sa lavorare senza tool
- ❌ **Bypass supervisione**: "non chiedo più al senior, c'è il tool"
- ❌ **Stagnazione formazione**: junior non imparano, delegano al tool

---

## 🎯 Take-Home Messages

**Per responsabili**:
1. Tool è potente → servono guardrail organizzativi
2. Automation bias è REALE → va prevenuto attivamente
3. Training ≠ "ecco il link" → serve piano strutturato
4. Monitoraggio ongoing → non "lancia e dimentica"

**Per tutor**:
1. Vostro ruolo NON è sostituito da tool
2. Anzi: più importante che mai (supervision discordanze)
3. Insegnate a "challenge" il tool, non a obbedire

**Per junior**:
1. Tool è alleato, non maestro
2. Va bene dissentire
3. Responsabilità = vostra, sempre

---

## 📚 Risorse Correlate

- **PREREQUISITES.md**: Verificare se staff è pronto
- **CASI_DIDATTICI.md**: Casi dove tool sbaglia (per training)
- **CHANGELOG_v3.0.2.md**: Documentazione tecnica tool
- **README_v3.0.2.md**: Quick reference funzionalità

---

## 📞 Supporto

**Problemi automation bias, errori sistematici, dubbi introduzione**:
- Email: filippo.bianchi@asst-fbf-sacco.it
- Subject: [IBD Tool] Automation Bias / Introduzione / Altro

**Non esitate a chiedere. Meglio una domanda che un errore diagnostico.**

---

**Autore**: Dr. Filippo Bianchi  
**Revisione**: Gennaio 2026  
**Filosofia**: "Il tool sa dove fermarsi. Voi dovete sapere dove iniziare."

---

**Fine MANIFESTO_USO.md**
