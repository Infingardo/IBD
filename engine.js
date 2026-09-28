;(function (root) {
  'use strict';
  // ==========================================================================
  //  MOTORE IBD — scoring, Nancy Index, pattern topografico, interpretazione
  // ==========================================================================
  //  Estratto da index.html nella v3.2.0. Nessuna dipendenza dal DOM: ogni
  //  funzione riceve lo stato esplicito `st` = { specimens, ihcData, ibdNota,
  //  altreColiti, diagnosiVeloce } invece di leggere le variabili di modulo.
  //  index.html conserva wrapper con gli stessi nomi di prima, quindi la UI non
  //  cambia; qui si puo' finalmente eseguire la logica sotto test.
  //
  //  Regola: qui non si scrive in pagina e non si legge dal form.
  // ==========================================================================

  // Sedi post-chirurgiche: l'analisi topografica standard non vi si applica.
  const SPECIAL_SITES = ['pouch', 'anastomosi'];

        // v3.2.0 — lettura difensiva: i casi salvati con versioni precedenti non hanno
        // il campo neutrofili_lamina_propria sul colon; undefined !== 'assente' avrebbe
        // marcato come alterato ogni vecchio caso ricaricato.
        const fval = (findings, key) => (findings && findings[key]) || 'assente';

        const hasInflammatoryFindings = (specimen) => {
            const f = specimen.findings;
            if (specimen.siteType === 'ileum') {
                return (
                    f.granulomi_epitelioidi === 'presente' || f.granulomi_epitelioidi === 'sospetti' ||
                    f.neutrofili_lamina_propria !== 'assente' || f.erosioni_ulcerazioni === 'presente' ||
                    f.iperplasia_linfoide === 'presente' || f.edema_lamina_propria === 'presente' ||
                    f.plasmacellule_aumentate === 'presente'
                );
            } else {
                return (
                    f.granulomi_epitelioidi === 'presente' || f.granulomi_epitelioidi === 'sospetti' ||
                    f.neutrofili_epitelio !== 'assente' || fval(f,'neutrofili_lamina_propria') !== 'assente' ||
                    f.ascessi_criptici === 'presente' ||
                    f.plasmacellule_basale === 'presente' || f.distorsione_architettura === 'presente' ||
                    f.metaplasia_paneth === 'presente' || f.ulcerazione === 'presente'
                );
            }
        };

        const analyzeTopographicPattern = (st) => {
            const sites = st.specimens.map(s => s.site);
            const sitesWithFindings = st.specimens.filter(hasInflammatoryFindings).map(s => s.site);
            let pattern = {
                rectumSampled: sites.includes('retto'),
                rectumInvolved: sitesWithFindings.includes('retto'),
                ileumSampled: sites.includes('ileo'),
                ileumInvolved: sitesWithFindings.includes('ileo'),
                skipLesions: false,
                skipLesionsIndeterminate: false,
                continuity: 'sconosciuta',
                warning: null
            };
            const colonOrder = ['cieco','ascendente','trasverso','discendente','sigma','retto'];
            const findingsIndices = sitesWithFindings
                .filter(s => colonOrder.includes(s))
                .map(s => colonOrder.indexOf(s))
                .sort((a,b) => a-b);
            const hasSpecialSites = st.specimens.some(s => SPECIAL_SITES.includes(s.site));
            if (findingsIndices.length >= 2) {
                for (let i = 1; i < findingsIndices.length; i++) {
                    const gap = findingsIndices[i] - findingsIndices[i-1];
                    if (gap > 1) {
                        let missingSamples = false;
                        for (let j = findingsIndices[i-1]+1; j < findingsIndices[i]; j++) {
                            if (!sites.includes(colonOrder[j])) { missingSamples = true; break; }
                        }
                        // v3.2.0: prima si usciva al primo gap. Se il primo intervallo non era
                        // campionato l'esito restava "indeterminabile" anche quando piu' a valle
                        // c'era una skip lesion fra due sedi entrambe campionate.
                        if (missingSamples) pattern.skipLesionsIndeterminate = true;
                        else pattern.skipLesions = true;
                    }
                }
            }
            // v3.2.0: con meno di due sedi coinvolte la continuita' non e' affermabile.
            pattern.continuity = pattern.skipLesions ? 'discontinua'
                : pattern.skipLesionsIndeterminate ? 'indeterminabile'
                : findingsIndices.length >= 2 ? 'continua' : 'non valutabile (meno di due sedi coinvolte)';
            if (hasSpecialSites) {
                pattern.warning = "ℹ️ Sedi speciali (pouch/anastomosi): analisi topografica standard non applicabile.";
            } else if (pattern.rectumSampled && pattern.rectumInvolved && !pattern.skipLesions && !pattern.ileumInvolved) {
                pattern.warning = "⚠️ Distribuzione tipo RCU: retto coinvolto, pattern continuo, ileo non coinvolto";
            } else if (pattern.skipLesionsIndeterminate) {
                pattern.warning = "⚠️ Campionamento incompleto: continuità/discontinuità NON valutabile. Completare mapping endoscopico.";
            } else if (pattern.skipLesions || (pattern.ileumInvolved && !pattern.rectumInvolved)) {
                pattern.warning = "⚠️ Distribuzione tipo Crohn: pattern discontinuo e/o ileo coinvolto con retto risparmiato";
            } else if (!pattern.rectumSampled) {
                pattern.warning = "ℹ️ Retto non campionato: valutazione pattern topografico limitata";
            } else if (pattern.rectumSampled && !pattern.rectumInvolved && sitesWithFindings.length > 0) {
                if (st.ibdNota.therapyOngoing) {
                    pattern.warning = "ℹ️ Retto risparmiato in paziente in terapia: non esclude RCU (retto può normalizzarsi)";
                } else {
                    pattern.warning = "⚠️ Retto risparmiato: atipico per RCU classica";
                }
            }
            return pattern;
        };


        // ==================== NANCY - SOLO RCU FOLLOW-UP ====================
        const shouldShowNancy = (st) => {
            return st.ibdNota.enabled === true && st.ibdNota.diagnosiAttuale === 'RCU';
        };

        const calculateNancyIndex = (st) => {
            if (!shouldShowNancy(st)) {
                return { score: null, interpretation: null, applicable: false, warning: null };
            }
            let nancyScore = 0;
            let hasUlceration = false;
            let hasCryptAbscesses = false;
            let neutrophilSeverity = 'assente';
            const neutRank = { assente: 0, lieve: 1, moderata: 2, marcata: 3 };
            const colonSpecimens = st.specimens.filter(s => s.siteType !== 'ileum');
            colonSpecimens.forEach(specimen => {
                if (specimen.findings.ulcerazione === 'presente') hasUlceration = true;
                if (specimen.findings.ascessi_criptici === 'presente') hasCryptAbscesses = true;
                // v3.2.0 — l'item "infiltrato acuto" del Nancy considera i neutrofili sia
                // nell'epitelio sia nella lamina propria: prima veniva letto solo il campo
                // epiteliale, cioe' meta' dell'item.
                [specimen.findings.neutrofili_epitelio, fval(specimen.findings,'neutrofili_lamina_propria')].forEach(neutLevel => {
                    if (neutRank[neutLevel] > neutRank[neutrophilSeverity]) neutrophilSeverity = neutLevel;
                });
            });
            // v3.2.0 — gli ascessi criptici sono attivita' per definizione e contano da soli.
            // Prima erano subordinati alla presenza di neutrofili intraepiteliali
            // (`hasCryptAbscesses && neutrophilSeverity !== 'assente'`), per cui un retto con
            // ascessi criptici e campo neutrofili non compilato usciva come "remissione completa".
            if (hasUlceration) nancyScore = 4;
            else if (neutrophilSeverity === 'marcata' || neutrophilSeverity === 'moderata' || hasCryptAbscesses) nancyScore = 3;
            else if (neutrophilSeverity === 'lieve') nancyScore = 2;
            else {
                const hasChronicChanges = colonSpecimens.some(s =>
                    s.findings.distorsione_architettura === 'presente' || s.findings.plasmacellule_basale === 'presente'
                );
                nancyScore = hasChronicChanges ? 1 : 0;
            }
            const interpretations = {
                0: { label: 'Remissione completa', description: 'Assenza di attività e alterazioni croniche' },
                1: { label: 'Remissione con alterazioni croniche', description: 'Alterazioni architetturali senza attività acuta' },
                2: { label: 'Attività lieve', description: 'Infiltrato neutrofilo lieve senza ulcerazione' },
                3: { label: 'Attività moderata', description: 'Infiltrato neutrofilo moderato-severo o ascessi criptici' },
                4: { label: 'Attività severa con ulcerazione', description: 'Ulcerazione mucosa presente' }
            };
            return {
                score: nancyScore,
                interpretation: interpretations[nancyScore],
                applicable: true,
                warning: null,
                // Nota metodologica esposta nel referto: l'item "infiltrato cronico" del Nancy
                // (linfoplasmacellulare della lamina propria) non ha un campo dedicato in questa
                // scheda ed e' approssimato da plasmacellulosi basale / distorsione architetturale.
                proxyNote: 'Item "infiltrato cronico" approssimato da plasmacellulosi basale e distorsione architetturale (non raccolti come voce dedicata).',
                details: { hasUlceration, hasCryptAbscesses, neutrophilSeverity }
            };
        };

        const isSpecimenActive = (specimen) => {
            const f = specimen.findings;
            if (specimen.siteType === 'ileum') {
                return f.neutrofili_lamina_propria !== 'assente' || f.erosioni_ulcerazioni === 'presente';
            } else {
                return f.neutrofili_epitelio !== 'assente' || fval(f,'neutrofili_lamina_propria') !== 'assente' || f.ascessi_criptici === 'presente' || f.ulcerazione === 'presente';
            }
        };

        // ==================== SUFFICIENZA DELL'EVIDENZA ====================
        // v3.2.0 — Il difetto strutturale delle versioni precedenti: i punteggi venivano
        // normalizzati (crohn/(crohn+uc+ibdu)*100) e le soglie interpretative applicate a
        // QUELLA percentuale. Una percentuale su quel totale non misura quanta evidenza c'e':
        // misura solo da che parte pende. Conseguenza documentata: una singola metaplasia di
        // Paneth usciva "fortemente suggestiva" per RCU (uc 15 grezzi -> 100%), mentre una RCU
        // conclamata su quattro sedi si fermava a "compatibile" (uc 460 grezzi -> 66%, perche'
        // gli stessi reperti danno punti anche al Crohn).
        //
        // Ora le due domande sono separate:
        //   quanta evidenza c'e'   -> assessEvidence, su punteggi GREZZI + ampiezza dei reperti
        //   da che parte pende     -> assessSeparation, sul distacco relativo fra Crohn e RCU
        // Le soglie sono convenzioni locali di questo strumento, non valori di letteratura.
        const EVIDENCE_FLOOR = 40;          // sotto: nessuna entita' IBD viene nominata
        const EVIDENCE_MOD_RAW = 60;
        const EVIDENCE_MOD_FINDINGS = 2;
        const EVIDENCE_SOLID_RAW = 150;
        const EVIDENCE_SOLID_FINDINGS = 4;
        const EVIDENCE_SOLID_SITES = 2;
        const SEPARATION_CLEAR = 0.40;
        const SEPARATION_MODERATE = 0.25;
        const IBDU_CONTRADICTION = 50;      // punteggio di contraddizione che impone IBDU

        const countAbnormalFindings = (st) => st.specimens.reduce((n, sp) =>
            n + Object.keys(sp.findings || {}).filter(k =>
                k !== 'displasia' && fval(sp.findings, k) !== 'assente').length, 0);

        const assessEvidence = (st, rawScores) => {
            const rawMax = Math.max(rawScores.crohn, rawScores.uc);
            const nFindings = countAbnormalFindings(st);
            const nSites = st.specimens.filter(hasInflammatoryFindings).length;
            let level = 'insufficiente';
            if (rawMax >= EVIDENCE_SOLID_RAW && nFindings >= EVIDENCE_SOLID_FINDINGS && nSites >= EVIDENCE_SOLID_SITES) level = 'solida';
            else if (rawMax >= EVIDENCE_MOD_RAW && nFindings >= EVIDENCE_MOD_FINDINGS) level = 'moderata';
            return { level, rawMax, nFindings, nSites, aboveFloor: rawMax >= EVIDENCE_FLOOR };
        };

        const assessSeparation = (rawScores) => {
            const hi = Math.max(rawScores.crohn, rawScores.uc);
            const lo = Math.min(rawScores.crohn, rawScores.uc);
            if (hi === 0) return { ratio: 0, level: 'ambigua' };
            const ratio = (hi - lo) / hi;
            return { ratio, level: ratio >= SEPARATION_CLEAR ? 'netta' : ratio >= SEPARATION_MODERATE ? 'moderata' : 'ambigua' };
        };

        // Livello finale = quanto e' solida l'evidenza x quanto e' netto l'orientamento.
        const gradeConfidence = (evidence, separation) => {
            if (separation.level === 'ambigua') return 'ambigua';
            if (evidence.level === 'solida')   return separation.level === 'netta' ? 'alta' : 'probabile';
            if (evidence.level === 'moderata') return separation.level === 'netta' ? 'probabile' : 'suggestivo';
            return 'suggestivo';
        };

        // ==================== SCORING ====================
        const calculateIBDUScore = (st, rawScores, topoPattern) => {
            let ibduScore = 0;
            const hasGranulomas = st.specimens.some(s => s.findings.granulomi_epitelioidi === 'presente' && !s.mucinGranulomaLikely);
            const hasUCPattern = st.specimens.some(s => s.findings.plasmacellule_basale === 'presente' || s.findings.distorsione_architettura === 'presente');
            if (hasGranulomas && hasUCPattern) ibduScore += 60;
            if (topoPattern.skipLesions && hasUCPattern) ibduScore += 50;
            if (topoPattern.rectumSampled && !topoPattern.rectumInvolved && hasUCPattern) ibduScore += 40;
            if (Math.abs(rawScores.crohn - rawScores.uc) < 20 && rawScores.crohn > 30) ibduScore += 70;
            return ibduScore;
        };

        const calculateScoring = (st) => {
            let scores = { crohn: 0, uc: 0, ibdu: 0 };
            let granulomaScore = 0;
            st.specimens.forEach(specimen => {
                const f = specimen.findings;
                const siteType = specimen.siteType || 'colon';
                if (siteType === 'ileum') {
                    if (f.granulomi_epitelioidi === 'presente') {
                        const pts = specimen.mucinGranulomaLikely ? 20 : 150;
                        scores.crohn += pts; granulomaScore += pts;
                    } else if (f.granulomi_epitelioidi === 'sospetti') { scores.crohn += 25; granulomaScore += 25; }
                    if (f.erosioni_ulcerazioni === 'presente') scores.crohn += 50;
                    if (f.iperplasia_linfoide === 'presente') scores.crohn += 40;
                    if (f.atrofia_villi === 'marcata') scores.crohn += 30;
                    else if (f.atrofia_villi === 'moderata') scores.crohn += 15;
                    else if (f.atrofia_villi === 'lieve') scores.crohn += 5;
                    if (f.neutrofili_lamina_propria === 'marcata') { scores.crohn += 20; scores.uc += 10; }
                    else if (f.neutrofili_lamina_propria === 'moderata') { scores.crohn += 10; scores.uc += 5; }
                    else if (f.neutrofili_lamina_propria === 'lieve') scores.crohn += 5;
                    if (f.edema_lamina_propria === 'presente') scores.crohn += 15;
                    if (f.plasmacellule_aumentate === 'presente') scores.crohn += 15;
                    if (f.fibrosi_sottomucosa === 'marcata') scores.crohn += 25;
                    else if (f.fibrosi_sottomucosa === 'moderata') scores.crohn += 15;
                    else if (f.fibrosi_sottomucosa === 'lieve') scores.crohn += 5;
                } else {
                    if (f.granulomi_epitelioidi === 'presente') {
                        const pts = specimen.mucinGranulomaLikely ? 15 : 100;
                        scores.crohn += pts; granulomaScore += pts;
                    } else if (f.granulomi_epitelioidi === 'sospetti') { scores.crohn += 25; }
                    if (f.neutrofili_epitelio === 'marcata') { scores.uc += 40; scores.crohn += 20; }
                    else if (f.neutrofili_epitelio === 'moderata') { scores.uc += 25; scores.crohn += 15; }
                    else if (f.neutrofili_epitelio === 'lieve') { scores.uc += 15; scores.crohn += 10; }
                    if (f.ascessi_criptici === 'presente') { scores.uc += 30; scores.crohn += 15; }
                    if (f.plasmacellule_basale === 'presente') { scores.uc += 25; scores.crohn += 10; }
                    if (f.distorsione_architettura === 'presente') { scores.uc += 20; scores.crohn += 15; }
                    if (f.metaplasia_paneth === 'presente') scores.uc += 15;
                    if (f.ulcerazione === 'presente') { scores.crohn += 15; scores.uc += 10; }
                    if (f.fibrosi_sottomucosa === 'marcata') { scores.crohn += 25; scores.uc += 10; }
                    else if (f.fibrosi_sottomucosa === 'moderata') { scores.crohn += 15; scores.uc += 5; }
                }
            });
            if (st.ihcData.cd68_pattern === 'aggregati_profondi') scores.crohn += 35;
            else if (st.ihcData.cd68_pattern === 'diffuso_mucosa') { scores.uc += 20; scores.crohn += 10; }
            const topoPattern = analyzeTopographicPattern(st);
            const rawScores = { crohn: scores.crohn, uc: scores.uc };
            scores.ibdu = calculateIBDUScore(st, rawScores, topoPattern);
            const total = scores.crohn + scores.uc + scores.ibdu;
            let normalizedScores = { crohn: 0, uc: 0, ibdu: 0 };
            if (total > 0) {
                normalizedScores.crohn = Math.round((scores.crohn / total) * 100);
                normalizedScores.uc = Math.round((scores.uc / total) * 100);
                normalizedScores.ibdu = Math.round((scores.ibdu / total) * 100);
            }
            const granulomasDriven = rawScores.crohn > 0 && (granulomaScore / rawScores.crohn) > 0.5;
            // v3.2.0: ibduRaw e' il punteggio di contraddizione PRIMA della normalizzazione.
            // E' quello che deve far scattare l'IBDU (contraddizione morfologica), non la
            // vicinanza fra due percentuali.
            const hasTrueGranulomas = st.specimens.some(x => x.findings.granulomi_epitelioidi === 'presente' && !x.mucinGranulomaLikely);
            return { scores: normalizedScores, rawScores, ibduRaw: scores.ibdu, granulomaScore, granulomasDriven,
                     hasTrueGranulomas, evidence: assessEvidence(st, rawScores), separation: assessSeparation(rawScores) };
        };

        // ==================== ETICHETTE QUALITATIVE ====================
        const getScoreLabel = (score) => {
            if (score >= 80) return { text: 'Forte', cls: 'forte' };
            if (score >= 60) return { text: 'Compatibile', cls: 'compatibile' };
            if (score >= 40) return { text: 'Borderline', cls: 'borderline' };
            return { text: 'Basso', cls: 'basso' };
        };

        // ==================== INTERPRETAZIONE ====================
        // v3.2.0 — riscritta. Tre cambiamenti sostanziali rispetto alla 3.1.7:
        //  1. il livello di confidenza nasce da evidenza x separazione (vedi assessEvidence),
        //     non dalla percentuale normalizzata;
        //  2. il ramo "altre coliti" non scarta piu' il ragionamento IBD: se l'evidenza IBD
        //     supera la soglia minima, l'interpretazione IBD viaggia come reperto concomitante;
        //  3. l'IBDU nasce dalla contraddizione morfologica (ibduRaw), come dichiarato nel
        //     readme, e non dalla vicinanza fra due percentuali.
        const hasAltreColitiFindings = (st) =>
            (st.altreColiti.banda_collagene !== 'assente') ||
            (st.altreColiti.iel_aumentati !== 'assente') ||
            st.altreColiti.apoptosi_cripte !== 'assente' ||
            st.altreColiti.pattern_superficiale ||
            st.altreColiti.atrofia_ischemica ||
            st.altreColiti.membrane_ialine ||
            st.altreColiti.emorragia_recente ||
            st.altreColiti.ulcere_diaframma;

        // v3.2.0 — i reperti immunoistochimici non possono piu' convivere con "mucosa nella
        // norma": prima isAllNormal guardava solo la morfologia, e un CMV positivo usciva
        // sotto il titolo "Mucosa ileo-colica nella norma".
        const ihcRelevantFindings = (st) => {
            const out = [];
            if (st.ihcData.cmv_status === 'positivo') out.push('Immunoistochimica CMV positiva.');
            if (st.ihcData.cmv_status === 'dubbio') out.push('Immunoistochimica CMV dubbia.');
            if (st.ihcData.cd68_pattern === 'aggregati_profondi') out.push('CD68: aggregati macrofagici profondi.');
            if (st.ihcData.p53_pattern === 'overexpression' || st.ihcData.p53_pattern === 'null') out.push('p53 con pattern aberrante.');
            return out;
        };

        const isMorphologicallyNormal = (st) => st.specimens.length > 0 && !hasAltreColitiFindings(st) && st.specimens.every(s => {
            const f = s.findings;
            if (s.siteType === 'ileum') {
                return f.granulomi_epitelioidi === 'assente' && f.neutrofili_lamina_propria === 'assente' &&
                       f.erosioni_ulcerazioni === 'assente' && f.iperplasia_linfoide === 'assente' &&
                       f.edema_lamina_propria === 'assente' && f.atrofia_villi === 'assente' &&
                       f.plasmacellule_aumentate === 'assente' && f.fibrosi_sottomucosa === 'assente' &&
                       (!f.displasia || f.displasia === 'assente');
            }
            return f.granulomi_epitelioidi === 'assente' && f.neutrofili_epitelio === 'assente' &&
                   fval(f, 'neutrofili_lamina_propria') === 'assente' &&
                   f.ascessi_criptici === 'assente' && f.plasmacellule_basale === 'assente' &&
                   f.distorsione_architettura === 'assente' && f.metaplasia_paneth === 'assente' &&
                   f.ulcerazione === 'assente' && f.fibrosi_sottomucosa === 'assente' &&
                   (!f.displasia || f.displasia === 'assente');
        });

        const interpretAltreColiti = (st) => {
            if (!hasAltreColitiFindings(st)) return null;
            if (st.altreColiti.banda_collagene === 'ispessita' || st.altreColiti.banda_collagene === 'marcata') {
                const bandaText = st.altreColiti.banda_collagene_um
                    ? `Banda collagene subepiteliale: ${st.altreColiti.banda_collagene_um}μm (v.n. <10μm)`
                    : `Banda collagene subepiteliale ${st.altreColiti.banda_collagene === 'marcata' ? 'marcatamente ispessita (>20μm)' : 'ispessita (≥10μm)'}`;
                return { primary: 'Colite Collagenosica', level: st.altreColiti.banda_collagene === 'marcata' ? 'alta' : 'buona',
                    headline: 'Colite microscopica, tipo collagenosica',
                    description: `${bandaText}. Architettura ghiandolare conservata.`, epistemicNote: null };
            }
            if (st.altreColiti.iel_aumentati === 'aumentati' || st.altreColiti.iel_aumentati === 'marcati') {
                const ielText = st.altreColiti.iel_count
                    ? `Linfociti intraepiteliali: ${st.altreColiti.iel_count}/100 cellule epiteliali (v.n. <20)`
                    : `IEL ${st.altreColiti.iel_aumentati === 'marcati' ? 'marcatamente aumentati (>30/100)' : 'aumentati (≥20/100)'}`;
                return { primary: 'Colite Linfocitica', level: st.altreColiti.iel_aumentati === 'marcati' ? 'alta' : 'buona',
                    headline: 'Colite microscopica, tipo linfocitica',
                    description: `${ielText}. Architettura ghiandolare conservata.`, epistemicNote: null };
            }
            const ischemicFeatures = [st.altreColiti.atrofia_ischemica, st.altreColiti.membrane_ialine, st.altreColiti.emorragia_recente].filter(Boolean).length;
            if (ischemicFeatures >= 2) {
                return { primary: 'Colite Ischemica', level: ischemicFeatures === 3 ? 'alta' : 'suggestivo',
                    headline: 'Pattern compatibile con colite ischemica',
                    description: `Presenti ${ischemicFeatures}/3 criteri ischemici. Correlare con sede e fattori di rischio cardiovascolare.`, epistemicNote: null };
            }
            if (st.altreColiti.ulcere_diaframma) {
                return { primary: 'Enteropatia da FANS', level: 'alta', headline: 'Enteropatia/Colite da FANS',
                    description: 'Ulcere a diaframma presenti (patognomonico). Confermare anamnesi farmacologica.', epistemicNote: null };
            }
            if (st.altreColiti.apoptosi_cripte !== 'assente') {
                return { primary: 'Possibile Colite da FANS', level: 'suggestivo',
                    headline: 'Pattern suggestivo per colite da FANS',
                    description: `Apoptosi cripte ${st.altreColiti.apoptosi_cripte}. Considerare eziologia farmacologica.`, epistemicNote: null };
            }
            if (st.altreColiti.pattern_superficiale && st.altreColiti.architettura_conservata) {
                return { primary: 'Colite Infettiva', level: 'suggestivo',
                    headline: 'Pattern compatibile con colite infettiva',
                    description: 'Infiammazione superficiale con architettura conservata. Correlare con coprocoltura.', epistemicNote: null };
            }
            return null;
        };

        const interpretIBDPattern = (st, scoring) => {
            const { rawScores, ibduRaw, evidence, separation, hasTrueGranulomas } = scoring;
            const result = { primary: null, level: null, headline: null, description: null, epistemicNote: null };

            if (!evidence.aboveFloor) {
                result.primary = 'Indeterminato'; result.level = 'insufficiente';
                result.headline = 'Pattern istologico aspecifico';
                result.description = `Reperti morfologici insufficienti per orientamento diagnostico IBD (evidenza complessiva sotto la soglia minima: ${evidence.nFindings} reperto/i alterato/i su ${evidence.nSites} sede/i coinvolta/e).`;
                result.epistemicNote = 'Campionamento inadeguato, fase precoce di malattia o alterazioni non specifiche. Un singolo reperto non consente di nominare un’entità.';
                return result;
            }

            // IBDU per contraddizione morfologica (readme: "IBDU emerge da contraddizione
            // morfologica, non da debolezza dello score") oppure per orientamento ambiguo.
            const contradictory = ibduRaw >= IBDU_CONTRADICTION;
            if (contradictory || separation.level === 'ambigua') {
                result.primary = 'IBDU'; result.level = 'indeterminato'; result.headline = 'IBD non classificabile (IBDU)';
                if (contradictory) {
                    result.description = 'Pattern contraddittorio con features sovrapposte Crohn/RCU. Classificazione istologica non possibile.';
                    result.epistemicNote = 'IBDU con caratteristiche sovrapposte. Diagnosi definitiva richiede follow-up clinico-istologico prolungato.';
                } else {
                    result.description = 'Reperti compatibili con IBD ma senza orientamento prevalente fra Crohn e RCU.';
                    result.epistemicNote = 'Orientamento non separabile sui soli dati istologici. Rivalutazione con follow-up + correlazione clinico-endoscopica-radiologica INDISPENSABILE.';
                }
                return result;
            }

            const leansCrohn = rawScores.crohn > rawScores.uc;
            let level = gradeConfidence(evidence, separation);

            if (leansCrohn) {
                // Senza granulomi epitelioidi la biopsia mucosa non regge una conclusione
                // "forte" per Crohn: la transmuralita' non e' valutabile su mucosa.
                if (level === 'alta' && !hasTrueGranulomas) level = 'probabile';
                result.primary = 'Malattia di Crohn';
                if (level === 'alta') {
                    result.level = 'alta'; result.headline = 'Malattia di Crohn (pattern istologico fortemente suggestivo)';
                    result.description = 'Pattern morfologico e architetturale fortemente indicativo per malattia di Crohn.';
                } else if (level === 'probabile') {
                    result.level = 'probabile'; result.headline = 'Quadro compatibile con malattia di Crohn';
                    result.description = 'Pattern morfologico compatibile con malattia di Crohn. Correlazione con dati clinici, endoscopici e imaging NECESSARIA.';
                    result.epistemicNote = hasTrueGranulomas
                        ? 'Criteri multipli ma non patognomonici. Conferma clinico-radiologica essenziale.'
                        : 'Granulomi epitelioidi assenti: la biopsia mucosa non dimostra transmuralità. Conferma clinico-radiologica essenziale.';
                } else {
                    result.level = 'suggestivo'; result.headline = 'Pattern suggestivo ma non diagnostico per malattia di Crohn';
                    result.description = 'Pattern con alcune caratteristiche compatibili con Crohn, INSUFFICIENTE per diagnosi definitiva.';
                    result.epistemicNote = 'Istologia da sola NON consente diagnosi. Correlazione clinica, distribuzione endoscopica e imaging INDISPENSABILI.';
                }
                return result;
            }

            const activeSites = st.specimens.filter(s => s.siteType !== 'ileum' && (
                s.findings.neutrofili_epitelio !== 'assente' || s.findings.distorsione_architettura === 'presente' || s.findings.plasmacellule_basale === 'presente'
            )).map(s => s.site);
            const hasAcuteActivity = st.specimens.some(s => s.siteType !== 'ileum' && (
                s.findings.neutrofili_epitelio !== 'assente' || fval(s.findings,'neutrofili_lamina_propria') !== 'assente' ||
                s.findings.ascessi_criptici === 'presente' || s.findings.ulcerazione === 'presente'
            ));
            const isRemission = st.diagnosiVeloce.selected === 'IBD_REMISSIONE' || !hasAcuteActivity;
            // v3.3.0 — l'estensione (proctite / sinistra) e' affermabile solo se il campionamento
            // dimostra mucosa indenne a monte della malattia. Prima retto+sigma soli, entrambi
            // coinvolti, uscivano come "rettocolite ulcerosa sinistra": estensione inferita da
            // sedi mai campionate.
            const sampledSites = st.specimens.map(s => s.site);
            const leftSites = ['retto','sigma','discendente'], rightSites = ['trasverso','ascendente','cieco'];
            const sampledUninvolved = sites => sites.some(x => sampledSites.includes(x) && !activeSites.includes(x));
            const isProctitis = activeSites.length === 1 && activeSites.includes('retto')
                && sampledUninvolved(['sigma','discendente','trasverso','ascendente','cieco']);
            const isLeftSided = activeSites.every(s => leftSites.includes(s)) && activeSites.includes('retto')
                && sampledUninvolved(rightSites);
            const ucLabel = isProctitis ? 'proctite ulcerosa' : (isLeftSided && !isProctitis) ? 'rettocolite ulcerosa sinistra' : 'rettocolite ulcerosa';
            const ucLabelCap = ucLabel.charAt(0).toUpperCase() + ucLabel.slice(1);
            const remissionSuffix = isRemission ? ' in fase di remissione istologica' : '';
            result.primary = ucLabelCap;
            if (level === 'alta') {
                result.level = 'alta'; result.headline = `${ucLabelCap}${remissionSuffix} (pattern istologico fortemente suggestivo)`;
                result.description = `Pattern morfologico e distributivo fortemente indicativo per ${ucLabel}${remissionSuffix}.`;
            } else if (level === 'probabile') {
                result.level = 'probabile'; result.headline = `Quadro compatibile con ${ucLabel}${remissionSuffix}`;
                result.description = `Pattern morfologico compatibile con ${ucLabel}${remissionSuffix}.${isRemission ? ' Persistono alterazioni architetturali croniche residue.' : ' Correlazione con distribuzione endoscopica NECESSARIA.'}`;
                result.epistemicNote = isRemission ? null : 'Conferma con pattern topografico endoscopico (continuo, retto coinvolto, ileo indenne) essenziale.';
            } else {
                result.level = 'suggestivo'; result.headline = `Pattern suggestivo ma non diagnostico per ${ucLabel}`;
                result.description = `Features compatibili con ${ucLabel}, INSUFFICIENTE per diagnosi definitiva.`;
                result.epistemicNote = 'Verifica distribuzione continua, coinvolgimento rettale e risparmio ileale tramite endoscopia.';
            }
            return result;
        };

        const interpretScoringGraduated = (st, scoring) => {
            if (st.specimens.length === 0) {
                return { primary: null, level: 'nessun-campione', headline: 'Nessun campione inserito',
                    description: 'Non è stato inserito alcun campione: nessun giudizio istologico è possibile.',
                    epistemicNote: null, concurrent: null };
            }

            const ihcFindings = ihcRelevantFindings(st);

            if (isMorphologicallyNormal(st)) {
                if (ihcFindings.length) {
                    return { primary: 'Reperto IHC isolato', level: 'suggestivo',
                        headline: 'Morfologia priva di alterazioni significative — reperto immunoistochimico isolato',
                        description: `Non si osservano alterazioni istologiche significative nei campioni esaminati. ${ihcFindings.join(' ')}`,
                        epistemicNote: 'Il reperto immunoistochimico va correlato con clinica e dati virologici; da solo non definisce una malattia infiammatoria cronica.',
                        concurrent: null };
                }
                return { primary: 'Normale', level: 'normale', headline: 'Mucosa ileo-colica nella norma',
                    description: 'Non si osservano alterazioni istologiche significative nei campioni esaminati.',
                    epistemicNote: null, concurrent: null };
            }

            const ibd = interpretIBDPattern(st, scoring);
            const altre = interpretAltreColiti(st);

            if (altre) {
                // v3.2.0 — l'interpretazione IBD non viene piu' scartata: se supera la soglia
                // minima di evidenza viaggia come reperto concomitante. Prima un Crohn ileale
                // conclamato (230 punti grezzi) spariva perche' era spuntata la banda collagene.
                altre.concurrent = (ibd && ibd.level !== 'insufficiente')
                    ? { headline: ibd.headline, level: ibd.level, description: ibd.description }
                    : null;
                if (altre.concurrent) {
                    altre.epistemicNote = (altre.epistemicNote ? altre.epistemicNote + ' ' : '') +
                        'Coesistono reperti orientativi per malattia infiammatoria cronica intestinale (vedi sotto): le due condizioni possono sovrapporsi e la conclusione richiede correlazione clinico-endoscopica.';
                }
                return altre;
            }

            ibd.concurrent = null;
            if (ihcFindings.length) {
                ibd.description = `${ibd.description} ${ihcFindings.join(' ')}`;
            }
            return ibd;
        };

        // ==================== DISPLASIA ====================
        const generateDysplasiaReport = (st) => {
            const colonSpecs = st.specimens.filter(s => s.siteType !== 'ileum');
            const displasiaFindings = colonSpecs
                .filter(s => s.findings.displasia && s.findings.displasia !== 'assente')
                .map(s => ({ site: s.site, grade: s.findings.displasia, p53Support: st.ihcData.p53_pattern === 'overexpression' || st.ihcData.p53_pattern === 'null' }));
            if (displasiaFindings.length === 0) return null;
            const maxGrade = displasiaFindings.some(d => d.grade === 'HGD') ? 'HGD' :
                             displasiaFindings.some(d => d.grade === 'LGD') ? 'LGD' : 'IND';
            let recommendation = '';
            if (maxGrade === 'HGD') recommendation = 'HGD: Colectomia da considerare. Discussione multidisciplinare URGENTE.';
            else if (maxGrade === 'LGD') recommendation = 'LGD: Sorveglianza endoscopica stretta (3-6 mesi). Valutare resezione endoscopica se lesione visibile.';
            else recommendation = 'IND: Rivalutazione con campionamento esteso. Considerare review con patologo esperto.';
            return { present: true, maxGrade, findings: displasiaFindings, recommendation, p53Aberrant: displasiaFindings.some(d => d.p53Support) };
        };

        // ==================== NOTE METODOLOGICHE ====================
        const detectContradictoryPatterns = (st, scoring) => {
            const notes = [];
            // v3.2.0 — esisteva qui una SECONDA definizione di "tutto normale", diversa da quella
            // usata dall'interpretazione (ometteva displasia, metaplasia di Paneth e fibrosi):
            // due verita' sulla stessa domanda, destinate a divergere. Ora il predicato e' unico.
            if (st.specimens.length === 0 || isMorphologicallyNormal(st)) return notes;
            const hasGranulomas = st.specimens.some(s => s.findings.granulomi_epitelioidi === 'presente');
            const hasUCPattern = st.specimens.some(s => s.findings.plasmacellule_basale === 'presente' || s.findings.distorsione_architettura === 'presente');
            if (hasGranulomas && hasUCPattern) {
                notes.push({ type: 'CONTRADDITTORIO', title: 'Pattern contraddittorio: Granulomi + Cronicità tipo RCU',
                    features: ['Granulomi epitelioidi (caratteristica Crohn)', 'Alterazioni croniche tipo RCU (plasmacellule basali, distorsione di architettura)'],
                    interpretation: 'Scoring a fini DESCRITTIVI; affidabilità LIMITATA per features contraddittorie.',
                    suggestion: 'Pattern suggerisce IBDU con caratteristiche sovrapposte. Rivalutazione con follow-up clinico-istologico NECESSARIA.' });
            }
            if (!hasGranulomas && scoring.rawScores.crohn > scoring.rawScores.uc && scoring.evidence.aboveFloor) {
                const hasTransmuralEquivalent = st.specimens.some(s => s.findings.fibrosi_sottomucosa === 'marcata');
                if (!hasTransmuralEquivalent) {
                    notes.push({ type: 'LIMITAZIONE', title: 'Crohn senza features patognomoniche',
                        features: ['Pattern Crohn ma ASSENZA granulomi epitelioidi', 'ASSENZA evidenza di transmuralità', '⚠️ Biopsia mucosa NON dimostra transmuralità'],
                        interpretation: 'Diagnosi basata su criteri ASPECIFICI. Granulomi assenti nel 30-50% dei Crohn bioptici.',
                        suggestion: 'IMAGING MANDATORIO: entero-RM o TC per ispessimento parietale, fistole, stenosi, coinvolgimento mesenterico.' });
                }
            }
            // v3.2.0: la sovrapponibilita' si misura sul distacco relativo fra punteggi grezzi,
            // non sulla differenza fra due percentuali (che con pochi reperti e' rumore).
            if (scoring.evidence.aboveFloor && scoring.separation.level === 'ambigua') {
                notes.push({ type: 'INCERTEZZA', title: 'Pattern Crohn/RCU sovrapponibile',
                    features: ['Differenza tra orientamento Crohn e RCU non significativa'],
                    interpretation: 'Istologia INSUFFICIENTE per diagnosi definitiva.',
                    suggestion: 'Richiede: distribuzione endoscopica, imaging, risposta terapeutica, evoluzione clinica.' });
            }
            return notes;
        };

        const validateClinicalLogic = (st) => {
            const warnings = [];
            st.specimens.forEach(specimen => {
                const f = specimen.findings;
                const siteType = specimen.siteType || 'colon';
                if (f.granulomi_epitelioidi === 'presente') {
                    if (specimen.mucinGranulomaLikely) {
                        warnings.push({ type: 'GRANULOMA_CAUTION', site: specimen.site,
                            message: `🔍 ${specimen.site.toUpperCase()}: Granulomi marcati come "possibile rottura criptale"`,
                            severity: 'medium',
                            suggestion: 'Escludere granuloma mucinoso. Se persistono dubbi, considerare PAS-D.' });
                    } else if (siteType === 'ileum') {
                        if (f.atrofia_villi === 'assente' && f.plasmacellule_aumentate === 'assente') {
                            warnings.push({ type: 'DIAGNOSTIC_ALERT', site: specimen.site,
                                message: `🔍 ${specimen.site.toUpperCase()} (ILEO): Granulomi epitelioidi SENZA alterazioni croniche`,
                                severity: 'high',
                                suggestion: 'Considerare: TBC, Yersinia, sarcoidosi, Crohn precoce. Colorazioni Ziehl-Neelsen, PCR Mycobacterium.' });
                        }
                    } else {
                        if (f.distorsione_architettura === 'assente' && f.plasmacellule_basale === 'assente') {
                            warnings.push({ type: 'DIAGNOSTIC_ALERT', site: specimen.site,
                                message: `🔍 ${specimen.site.toUpperCase()}: Granulomi epitelioidi SENZA alterazioni croniche`,
                                severity: 'high',
                                suggestion: 'Considerare: TBC, sarcoidosi, Crohn precoce, iatrogeni. DD infettiva richiede colorazioni specifiche.' });
                        }
                    }
                }
            });
            return warnings;
        };

        // ==================== DESCRIZIONE MICROSCOPICA (REFERTO) ====================
        // v3.3.0 — il referto riportava per sede solo "Attiva"/"Quiescente". Qui i reperti
        // registrati diventano una descrizione morfologica: pattern (cronicita' / attivita'),
        // grado di attivita', reperti positivi. I negativi pertinenti (granulomi, displasia)
        // sono riassunti a livello di caso da describeCaseNegatives, per non ripeterli a ogni riga.
        const RIGHT_COLON_PANETH = ['cieco', 'ascendente'];
        const joinIt = arr => arr.length <= 1 ? (arr[0] || '')
            : arr.slice(0, -1).join(', ') + ' e ' + arr[arr.length - 1];

        // Grado di attivita' per sede (colon): ulcerazione > ascessi / criptite moderata-marcata >
        // criptite lieve o neutrofili solo in lamina propria. Stesso criterio del grading della
        // colite infettiva gia' presente nel referto, esteso alla lamina propria.
        const colonActivityGrade = (f) => {
            if (f.ulcerazione === 'presente') return 'severa';
            if (f.ascessi_criptici === 'presente' || f.neutrofili_epitelio === 'moderata' || f.neutrofili_epitelio === 'marcata') return 'moderata';
            if (f.neutrofili_epitelio === 'lieve' || fval(f, 'neutrofili_lamina_propria') !== 'assente') return 'lieve';
            return null;
        };

        const describeGranulomas = (specimen) => {
            const g = specimen.findings.granulomi_epitelioidi;
            if (g === 'presente') return specimen.mucinGranulomaLikely
                ? 'granulomi in rapporto a rottura criptica (criptolitici), di scarso valore discriminante'
                : 'granulomi epitelioidi non in rapporto a rottura criptica';
            if (g === 'sospetti') return 'aggregati istiocitari di incerta natura granulomatosa';
            return null;
        };

        const describeSpecimenMorphology = (specimen) => {
            const f = specimen.findings || {};
            if (specimen.siteType === 'ileum') {
                const activity = [], chronic = [], other = [];
                if (fval(f, 'neutrofili_lamina_propria') !== 'assente') activity.push(`infiltrato neutrofilo ${f.neutrofili_lamina_propria} della lamina propria`);
                if (f.erosioni_ulcerazioni === 'presente') activity.push('erosioni/ulcerazioni');
                if (fval(f, 'atrofia_villi') !== 'assente') chronic.push(`atrofia dei villi di grado ${f.atrofia_villi}`);
                if (f.plasmacellule_aumentate === 'presente') chronic.push('incremento della componente plasmacellulare');
                const gr = describeGranulomas(specimen); if (gr) other.push(gr);
                if (f.iperplasia_linfoide === 'presente') other.push('iperplasia linfoide');
                if (f.edema_lamina_propria === 'presente') other.push('edema della lamina propria');
                if (fval(f, 'fibrosi_sottomucosa') !== 'assente') other.push(`fibrosi sottomucosa ${f.fibrosi_sottomucosa}`);
                let head;
                if (activity.length && chronic.length) head = 'ileite cronica attiva';
                else if (activity.length) head = 'ileite attiva';
                else if (chronic.length) head = 'ileite cronica inattiva';
                else if (other.length) head = 'mucosa ileale con alterazioni aspecifiche';
                else return 'mucosa ileale con architettura villosa conservata, senza alterazioni infiammatorie significative.';
                const parts = [...chronic, ...activity, ...other];
                return `${head}: ${joinIt(parts)}.`;
            }

            const chronic = [], activity = [], other = [];
            if (f.distorsione_architettura === 'presente') chronic.push('distorsione dell’architettura criptica');
            if (f.plasmacellule_basale === 'presente') chronic.push('plasmocitosi basale');
            if (f.metaplasia_paneth === 'presente') {
                // Le cellule di Paneth sono fisiologiche nel colon destro: non sono metaplasia.
                if (RIGHT_COLON_PANETH.includes(specimen.site)) other.push('cellule di Paneth (reperto fisiologico in questa sede)');
                else chronic.push('metaplasia a cellule di Paneth');
            }
            if (f.neutrofili_epitelio && f.neutrofili_epitelio !== 'assente') activity.push(`criptite ${f.neutrofili_epitelio}`);
            if (f.ascessi_criptici === 'presente') activity.push('ascessi criptici');
            if (fval(f, 'neutrofili_lamina_propria') !== 'assente') activity.push(`neutrofili in lamina propria (${f.neutrofili_lamina_propria})`);
            if (f.ulcerazione === 'presente') activity.push('erosione/ulcerazione della mucosa');
            const gr = describeGranulomas(specimen); if (gr) other.push(gr);
            if (fval(f, 'fibrosi_sottomucosa') !== 'assente') other.push(`fibrosi sottomucosa ${f.fibrosi_sottomucosa}`);
            const dys = { indefinita: 'aree indefinite per displasia', LGD: 'displasia di basso grado', HGD: 'displasia di alto grado' }[f.displasia];
            if (dys) other.push(dys);

            const grade = colonActivityGrade(f);
            let head;
            if (chronic.length && grade) head = `colite cronica attiva (attività ${grade})`;
            else if (chronic.length) head = 'colite cronica quiescente';
            else if (grade) head = `flogosi attiva (attività ${grade}) senza alterazioni di cronicità`;
            else if (other.length) head = 'mucosa colica senza alterazioni infiammatorie di rilievo';
            else return 'mucosa colica con architettura criptica conservata, senza alterazioni infiammatorie significative.';
            const body = [];
            if (chronic.length) body.push(joinIt(chronic));
            if (activity.length) body.push(joinIt(activity));
            if (other.length) body.push(joinIt(other));
            return body.length ? `${head}: ${body.join('; ')}.` : `${head}.`;
        };

        // Negativi pertinenti a livello di caso: detti una volta sola, non a ogni sede.
        const describeCaseNegatives = (st) => {
            const out = [];
            const specs = st.specimens;
            if (specs.length && specs.every(s => (s.findings.granulomi_epitelioidi || 'assente') === 'assente'))
                out.push('Non si osservano granulomi epitelioidi nelle sedi esaminate.');
            const colon = specs.filter(s => s.siteType !== 'ileum');
            if (colon.length && colon.every(s => (s.findings.displasia || 'assente') === 'assente'))
                out.push('Negativo per displasia.');
            return out;
        };

        // Distribuzione delle alterazioni, detta solo per quanto il campionamento consente.
        const describeDistribution = (st) => {
            const topo = analyzeTopographicPattern(st);
            if (st.specimens.some(s => SPECIAL_SITES.includes(s.site))) return null;
            const involved = st.specimens.filter(hasInflammatoryFindings);
            if (involved.length === 0) return null;
            const bits = [];
            if (topo.continuity === 'continua') bits.push('alterazioni a distribuzione continua');
            else if (topo.continuity === 'discontinua') bits.push('alterazioni a distribuzione discontinua (sedi indenni interposte a sedi coinvolte)');
            else if (topo.continuity === 'indeterminabile') bits.push('continuità non valutabile per sedi intermedie non campionate');
            if (!topo.rectumSampled) bits.push('retto non campionato');
            else bits.push(topo.rectumInvolved ? 'retto coinvolto' : 'retto risparmiato');
            if (topo.ileumSampled) bits.push(topo.ileumInvolved ? 'ileo coinvolto' : 'ileo indenne');
            // Estensione prossimale: dimostrabile solo con una sede campionata e indenne a monte.
            const colonOrder = ['cieco','ascendente','trasverso','discendente','sigma','retto'];
            const colonSpecs = st.specimens.filter(s => colonOrder.includes(s.site));
            const involvedIdx = colonSpecs.filter(hasInflammatoryFindings).map(s => colonOrder.indexOf(s.site));
            if (involvedIdx.length) {
                const mostProximal = Math.min(...involvedIdx);
                const cleanAbove = colonSpecs.some(s => colonOrder.indexOf(s.site) < mostProximal && !hasInflammatoryFindings(s));
                if (!cleanAbove && mostProximal > 0) bits.push('estensione prossimale non definibile sul campionamento disponibile');
            }
            const txt = bits.join('; ');
            return 'Distribuzione: ' + txt + '.';
        };

        // FIX #3: rimossa guardia simulation che sopprimeva il flag MDT per casi da diagnosi veloce
        const shouldFlagMDT = (report) => {
            const reasons = [];
            if (report.contradictoryNotes && report.contradictoryNotes.length > 0) reasons.push('Pattern contraddittorio');
            if (report.scoring.ibduRaw >= IBDU_CONTRADICTION) reasons.push('Contraddizione morfologica (IBDU)');
            if (report.dysplasiaReport && (report.ihcData.p53_pattern === 'overexpression' || report.ihcData.p53_pattern === 'null')) reasons.push('Displasia con p53 aberrante');
            if (report.scoring.evidence.aboveFloor && report.scoring.separation.level === 'ambigua') reasons.push('Orientamento Crohn/RCU indistinguibile');
            return reasons.length > 0 ? reasons : null;
        };

  var api = {
    fval: fval, hasInflammatoryFindings: hasInflammatoryFindings, isSpecimenActive: isSpecimenActive,
    analyzeTopographicPattern: analyzeTopographicPattern,
    shouldShowNancy: shouldShowNancy, calculateNancyIndex: calculateNancyIndex,
    countAbnormalFindings: countAbnormalFindings, assessEvidence: assessEvidence,
    assessSeparation: assessSeparation, gradeConfidence: gradeConfidence,
    calculateIBDUScore: calculateIBDUScore, calculateScoring: calculateScoring,
    getScoreLabel: getScoreLabel,
    hasAltreColitiFindings: hasAltreColitiFindings, ihcRelevantFindings: ihcRelevantFindings,
    isMorphologicallyNormal: isMorphologicallyNormal, interpretAltreColiti: interpretAltreColiti,
    interpretIBDPattern: interpretIBDPattern, interpretScoringGraduated: interpretScoringGraduated,
    generateDysplasiaReport: generateDysplasiaReport,
    describeSpecimenMorphology: describeSpecimenMorphology, describeCaseNegatives: describeCaseNegatives,
    describeDistribution: describeDistribution, colonActivityGrade: colonActivityGrade,
    detectContradictoryPatterns: detectContradictoryPatterns,
    validateClinicalLogic: validateClinicalLogic, shouldFlagMDT: shouldFlagMDT,
    EVIDENCE_FLOOR: EVIDENCE_FLOOR, IBDU_CONTRADICTION: IBDU_CONTRADICTION,
    SPECIAL_SITES: SPECIAL_SITES
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.IBDEngine = api; }
})(typeof self !== 'undefined' ? self : this);
