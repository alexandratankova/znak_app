import { LetterData } from './types';

export const ALPHABET_DATA: LetterData[] = [
  {
    id: 'az',
    char: 'А',
    name: 'Az',
    phonetic: '/a/',
    soundDescription: 'L\'inizio, un respiro aperto e puro.',
    glagolitic: 'Ⰰ',
    origin: 'Basata sulla lettera ebraica Aleph (א) o sul simbolo della croce.',
    variantDescription: 'Universale in tutti gli alfabeti cirillici. In bulgaro, la forma corsiva è spesso più arrotondata.',
    story: {
      origins: "La lettera Az non è solo un suono, è un concetto. Derivata dall'Aleph ebraica e dalla Alpha greca, nel Glagolitico assumeva la forma di una croce, simboleggiando il principio divino della cristianizzazione slava.",
      evolution: "Mentre la forma originale glagolitica era complessa e sacra, l'evoluzione cirillica ha abbracciato la semplicità geometrica della 'A' greca. Pietro il Grande, nella sua riforma civile, eliminò ogni ornamento superfluo, rendendola identica alla controparte latina.",
      curiosity: "Nell'antico sistema numerico cirillico, Az valeva 1. Il nome stesso 'Az' significava 'Io' in antico slavo ecclesiastico, ponendo l'identità personale all'inizio assoluto dell'alfabeto."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'La prima lettera, simbolo dell\'io e dell\'inizio divino.', poeticText: 'Io sono il principio.' },
      { period: 'Evoluzione', year: 'XIV Secolo', description: 'Forme più arrotondate nei manoscritti slavi.', poeticText: 'Un arco verso il cielo.' },
      { period: 'Modernità', year: '1708', description: 'Riformata simile alla A latina.', poeticText: 'Semplicità universale.' }
    ],
    wordInAction: { word: 'Ангел', phonetic: 'angel', meaning: 'Angelo', explanation: 'Angelo – messaggero divino nelle culture slave. Nella tradizione ortodossa, gli angeli sono intermediari tra il cielo e la terra, custodi delle anime.', introPhrase: 'Messaggeri tra cielo e terra.', lang: 'ru-RU' }
  },
  {
    id: 'buki',
    char: 'Б',
    name: 'Buki',
    phonetic: '/b/',
    soundDescription: 'Un colpo di tamburo smorzato.',
    glagolitic: 'Ⰱ',
    origin: 'Una variante della lettera greca Beta.',
    variantDescription: 'Presente in tutte le varianti. In serbo e macedone la forma corsiva può variare leggermente nel tratto superiore.',
    story: {
      origins: "Buki deriva dalla Beta greca, ma con una modifica strutturale necessaria per distinguerla dalla lettera Vedi. È il secondo pilastro dell'alfabeto, rappresentando la sostanza materiale dopo l'inizio spirituale di Az.",
      evolution: "Nei manoscritti medievali, la parte superiore della lettera si allungava orizzontalmente come un tetto protettivo. Questa caratteristica 'architettonica' è sopravvissuta alla riforma di Pietro il Grande, conferendo alla lettera il suo aspetto distintivo moderno.",
      curiosity: "Il nome 'Buki' è collegato alla parola 'Bukva' (lettera) e all'albero di faggio, su cui venivano incisi i primi segni runici pre-cristiani."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Originariamente significava "Lettere" o "Libro".', poeticText: 'La conoscenza incisa.' },
      { period: 'Medioevo', year: 'XV Secolo', description: 'La parte superiore si allungò orizzontalmente.', poeticText: 'Un tetto che protegge il suono.' },
      { period: 'Modernità', year: 'XVIII Secolo', description: 'Distinta nettamente dalla "V" (В).', poeticText: 'Identità consolidata.' }
    ],
    wordInAction: { word: 'Брат', phonetic: 'brat', meaning: 'Fratello', explanation: 'Brat – fratello. Radice comune a molte lingue slave. In slavo ecclesiastico «брат» indicava la fratellanza spirituale della comunità cristiana.', introPhrase: 'Un legame che trascende il sangue.', lang: 'ru-RU' }
  },
  {
    id: 'vedi',
    char: 'В',
    name: 'Vedi',
    phonetic: '/v/',
    soundDescription: 'Il vibrare di una corda tesa.',
    glagolitic: 'Ⰲ',
    origin: 'Identica alla Beta greca (Β).',
    variantDescription: 'Forma standard identica alla B latina, ma con suono "V". Universale.',
    story: {
      origins: "Vedi è una copia diretta della Beta greca (che nel greco bizantino si pronunciava già 'V'). Nel Glagolitico, tuttavia, aveva una forma completamente diversa, simile a due cerchi impilati.",
      evolution: "La sua storia è un gioco di specchi con la lettera Buki. Mentre Buki mantenne il suono esplosivo /b/, Vedi ereditò la forma della B latina ma il suono fricativo /v/, creando un 'falso amico' per i lettori occidentali.",
      curiosity: "Il nome imperativo 'Vedi' significa 'Sappi' o 'Vedi'. L'alfabeto iniziava quindi con un messaggio: 'Io (Az) Lettere (Buki) Conosco (Vedi)'."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Sapere" o "Vedere".', poeticText: 'L\'occhio della mente.' },
      { period: 'Stile Ustav', year: 'XIII Secolo', description: 'Forme squadrate e monumentali.', poeticText: 'Pietra su pietra.' },
      { period: 'Pietro il Grande', year: '1708', description: 'Arrotondata per la stampa civile.', poeticText: 'Curve morbide di inchiostro.' }
    ],
    wordInAction: { word: 'Вода', phonetic: 'voda', meaning: 'Acqua', explanation: 'Voda – acqua, elemento sacro nella cultura slava. Fonte di vita e purificazione, protagonista di rituali e leggende popolari.', introPhrase: 'Il vibrare di una corda tesa.', lang: 'ru-RU' }
  },
  {
    id: 'glagol',
    char: 'Г',
    name: 'Glagol',
    phonetic: '/g/',
    soundDescription: 'Il tuono lontano prima della tempesta.',
    glagolitic: 'Ⰳ',
    origin: 'Dalla Gamma greca (Γ).',
    variantDescription: 'In russo è standard (Γ). In ucraino rappresenta una H sonora. In bulgaro corsivo appare spesso come una "z" specchiata.',
    story: {
      origins: "Derivata direttamente dalla Gamma greca, Glagol rappresenta l'atto del parlare. La sua forma angolare e aperta suggerisce un movimento verso l'esterno, l'emissione della voce.",
      evolution: "Mentre la forma stampata è rimasta fedele al greco, il corsivo russo l'ha trasformata in una linea fluida simile a una 's' specchiata, dimostrando l'adattabilità della calligrafia slava alla velocità di scrittura.",
      curiosity: "La parola 'Glagol' significava 'Verbo' o 'Parola'. I missionari Cirillo e Metodio la scelsero per sottolineare l'importanza della predicazione orale."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Parlare" o "Verbo".', poeticText: 'La parola che crea.' },
      { period: 'Corsivo', year: 'XVII Secolo', description: 'Diventa più fluida nella scrittura veloce.', poeticText: 'Un fiume che scorre.' },
      { period: 'Modernità', year: 'XX Secolo', description: 'Linee essenziali e ortogonali.', poeticText: 'L\'angolo della ragione.' }
    ],
    wordInAction: { word: 'Гора', phonetic: 'gora', meaning: 'Montagna', explanation: 'Gora – montagna. Nel folklore slavo le montagne sono dimora di spiriti e luoghi di culto. Il tuono che rimbomba tra le vette.', introPhrase: 'Il tuono lontano prima della tempesta.', lang: 'ru-RU' }
  },
  {
    id: 'dobro',
    char: 'Д',
    name: 'Dobro',
    phonetic: '/d/',
    soundDescription: 'Il passo deciso su un pavimento di legno.',
    glagolitic: 'Ⰴ',
    origin: 'Dalla Delta greca (Δ).',
    variantDescription: 'In russo ha base piatta. In bulgaro e serbo corsivo assume spesso la forma di una "g" latina minuscola.',
    story: {
      origins: "Dobro nasce dalla Delta greca, ma i copisti slavi la modificarono presto, aggiungendo delle 'gambe' alla base triangolare, trasformandola in una struttura simile a un tempio o una casa.",
      evolution: "Questa modifica estetica aveva uno scopo pratico: stabilizzare la lettera sulla riga di base nei manoscritti Ustav. La riforma di Pietro il Grande codificò questa forma a 'trono', rendendola unica nel panorama tipografico europeo.",
      curiosity: "Significa 'Bene'. È una lettera solida, quadrata, che visivamente comunica stabilità e rettitudine morale."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Bene" o "Buono".', poeticText: 'La base della virtù.' },
      { period: 'Manoscritti', year: 'XVI Secolo', description: 'Sviluppa le "gambe" lunghe caratteristiche.', poeticText: 'Radici profonde nella terra.' },
      { period: 'Tipografia', year: '1800', description: 'Base piatta e squadrata nei caratteri serif.', poeticText: 'Un tempio solido.' }
    ],
    wordInAction: { word: 'Дом', phonetic: 'dom', meaning: 'Casa', explanation: 'Dom – casa, il focolare. In russo «дом» evoca stabilità, radici e protezione. Un passo deciso su un pavimento di legno.', introPhrase: 'Il passo deciso su un pavimento di legno.', lang: 'ru-RU' }
  },
  {
    id: 'est',
    char: 'Е',
    name: 'Est',
    phonetic: '/je/',
    soundDescription: 'L\'esistenza che si manifesta.',
    glagolitic: 'Ⰵ',
    origin: 'Dalla Epsilon greca (Ε).',
    variantDescription: 'Universale. Pronunciata "Ye" in russo, "E" in bulgaro e ucraino.',
    story: {
      origins: "Copiata dalla Epsilon greca, Est è una delle lettere più antiche e immutate. Nel Glagolitico aveva una forma più complessa, ma il Cirillico optò subito per la chiarezza classica.",
      evolution: "La sua evoluzione è meno morfologica e più fonetica. In russo, ha acquisito una qualità 'iotizzata' (ye), ammorbidendo la consonante precedente, una caratteristica che definisce la 'melodia' della lingua russa.",
      curiosity: "La terza persona singolare del verbo essere: 'È'. Una lettera che afferma l'esistenza stessa."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "È" o "Esiste".', poeticText: 'Io esisto qui.' },
      { period: 'Medioevo', year: 'XII Secolo', description: 'Usata ampiamente nei testi ecclesiastici.', poeticText: 'Luce divina.' },
      { period: 'Oggi', year: 'XXI Secolo', description: 'Una delle vocali più frequenti.', poeticText: 'Presenza costante.' }
    ],
    wordInAction: { word: 'Ель', phonetic: 'jel', meaning: 'Abete', explanation: 'Jel – abete. L\'albero del Natale ortodosso, simbolo di eternità e rinascita. L\'esistenza che si manifesta nel verde delle foreste russe.', introPhrase: 'L\'esistenza che si manifesta.', lang: 'ru-RU' }
  },
  {
    id: 'yo',
    char: 'Ё',
    name: 'Yo',
    phonetic: '/jo/',
    soundDescription: 'Una sorpresa improvvisa e gioiosa.',
    glagolitic: '-',
    origin: 'Variante della Е introdotta nel 1783.',
    variantDescription: 'Esclusiva dell\'alfabeto russo e bielorusso. Spesso i puntini vengono omessi nella stampa rapida.',
    story: {
      origins: "La lettera più giovane dell'alfabeto. Fu introdotta nel 1783 dalla principessa Dashkova durante una riunione accademica, per sostituire il digramma 'io'.",
      evolution: "Nonostante la sua utilità, la Yo ha sempre lottato per il riconoscimento. Spesso omessa nella stampa (sostituita dalla E), rimane una lettera 'facoltativa' ma essenziale per la corretta pronuncia.",
      curiosity: "Esiste un monumento dedicato alla lettera Ё nella città di Ulyanovsk. È l'unica lettera che porta sempre l'accento tonico."
    },
    timeline: [
      { period: 'Invenzione', year: '1783', description: 'Introdotta dalla principessa Dashkova.', poeticText: 'Due occhi sopra la E.' },
      { period: 'Stampa', year: '1797', description: 'Popolarizzata dallo storico Karamzin.', poeticText: 'Nuova voce.' },
      { period: 'Uso', year: 'Oggi', description: 'Spesso omessa nella scrittura veloce.', poeticText: 'Facoltativa ma vitale.' }
    ],
    wordInAction: { word: 'Ёлка', phonetic: 'jolka', meaning: 'Abete', explanation: 'Jolka – l\'albero di Natale. La tradizione dello ёлка risale all\'epoca zarista. Una sorpresa improvvisa e gioiosa sotto le decorazioni.', introPhrase: 'Una sorpresa improvvisa e gioiosa.', lang: 'ru-RU' }
  },
  {
    id: 'zhe',
    char: 'Ж',
    name: 'Zhivete',
    phonetic: '/ʐ/',
    soundDescription: 'Il ronzio vitale di un insetto dorato.',
    glagolitic: 'Ⰶ',
    origin: 'Possibile origine copta (Janja).',
    variantDescription: 'Forma unica e universale in tutto il mondo slavo. In bulgaro il tratto centrale può variare in altezza.',
    story: {
      origins: "Una lettera misteriosa senza equivalente greco. Probabilmente importata dall'alfabeto copto o creata ex novo in Glagolitico per rappresentare un suono tipicamente slavo.",
      evolution: "La sua simmetria radiale a sei bracci la rende unica. I calligrafi l'hanno sempre trattata come un simbolo solare o un 'ragno', mantenendo la sua complessità anche nelle font moderne sans-serif.",
      curiosity: "Il nome Zhivete significa 'Vivete' (imperativo plurale). È un simbolo di vita, energia e fertilità nel folklore tipografico."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Vivere".', poeticText: 'Il pulsare della vita.' },
      { period: 'Simbolismo', year: 'Medioevo', description: 'Simbolo di vita e complessità.', poeticText: 'Raggi che si incrociano.' },
      { period: 'Forma', year: '1708', description: 'Simmetria perfetta a sei bracci.', poeticText: 'Stella terrestre.' }
    ],
    wordInAction: { word: 'Жизнь', phonetic: 'zhizn', meaning: 'Vita', explanation: 'Zhizn – vita. Parola dal suono vibrante e vitale. Il ronzio di un insetto dorato che anima ogni sillaba.', introPhrase: 'Il ronzio vitale di un insetto dorato.', lang: 'ru-RU' }
  },
  {
    id: 'ze',
    char: 'З',
    name: 'Zemlya',
    phonetic: '/z/',
    soundDescription: 'Il sibilo del vento tra l\'erba.',
    glagolitic: 'Ⰷ',
    origin: 'Dalla Zeta greca (Ζ).',
    variantDescription: 'Universale. Simile al numero 3, distinta dalla "E" per orientamento e funzione.',
    story: {
      origins: "Deriva dalla Zeta greca, ma ha arrotondato le sue forme nei secoli per distinguersi dalla E e dalla Э. Nel Glagolitico aveva una forma complessa con un anello pendente.",
      evolution: "La somiglianza con il numero '3' non è casuale; la forma corsiva ha influenzato quella stampata. È una lettera 'terrena' e sonora, contrapposta alla 'S' sorda.",
      curiosity: "Zemlya significa 'Terra'. Insieme a Zhivete e Ze (S), forma una triade di suoni sibilanti che danno alle lingue slave il loro carattere distintivo."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Terra".', poeticText: 'Il suolo che ci sostiene.' },
      { period: 'Evoluzione', year: 'XIV Secolo', description: 'Assunse la forma simile al numero 3.', poeticText: 'Curve sinuose.' },
      { period: 'Oggi', year: 'XX Secolo', description: 'Distinta dalla E corsiva.', poeticText: 'Suono vibrante.' }
    ],
    wordInAction: { word: 'Звезда', phonetic: 'zvezda', meaning: 'Stella', explanation: 'Zvezda – stella. La stella polare guidava i viandanti slavi. Il sibilo del vento tra l\'erba sotto un cielo stellato.', introPhrase: 'Il sibilo del vento tra l\'erba.', lang: 'ru-RU' }
  },
  {
    id: 'i',
    char: 'И',
    name: 'Izhe',
    phonetic: '/i/',
    soundDescription: 'Un filo di seta teso tra due punti.',
    glagolitic: 'Ⰸ',
    origin: 'Dalla Eta greca (Η).',
    variantDescription: 'In russo è la "I" principale. In ucraino è "Y" (suono duro). In bulgaro corsivo appare come una "u" latina.',
    story: {
      origins: "Un prestito diretto dalla Eta greca (H). Inizialmente usata per il suono /e/ lungo, nel sistema slavo è passata a rappresentare la /i/.",
      evolution: "La trasformazione della barra orizzontale (H) in diagonale (И) è un'evoluzione stilistica tarda, consolidata con la riforma di Pietro il Grande per distinguerla dalla N latina.",
      curiosity: "In russo moderno funziona come una congiunzione 'e'. È il connettore universale della lingua, unendo parole e frasi."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Che" o "Il quale".', poeticText: 'Connessione.' },
      { period: 'Cambio', year: 'XIII Secolo', description: 'La barra orizzontale divenne diagonale.', poeticText: 'Ascesa.' },
      { period: 'Moderna', year: '1708', description: 'Simile alla N specchiata latina.', poeticText: 'Specchio ingannevole.' }
    ],
    wordInAction: { word: 'Игра', phonetic: 'igra', meaning: 'Gioco', explanation: 'Igra – gioco. Dal teatro medievale ai videogiochi, il gioco è parte essenziale della cultura slava. Un filo di seta teso tra due punti.', introPhrase: 'Un filo di seta teso tra due punti.', lang: 'ru-RU' }
  },
  {
    id: 'ikratkoye',
    char: 'Й',
    name: 'I Kratkoye',
    phonetic: '/j/',
    soundDescription: 'Un tocco breve e fugace.',
    glagolitic: '-',
    origin: 'Variante della И con breve.',
    variantDescription: 'Usata in russo, ucraino, bulgaro e bielorusso. Assente in serbo (sostituita da J).',
    story: {
      origins: "Non una lettera originale, ma una modifica diacritica della И. Il 'breve' (la piccola curva sopra) indica la natura semivocalica del suono.",
      evolution: "Divenne una lettera indipendente solo nel XVIII secolo. Prima di allora, il suono /j/ era spesso non scritto o integrato nelle vocali iotizzate.",
      curiosity: "Chiamata 'I breve'. È essenziale per creare dittonghi e chiudere le sillabe, agendo come un ponte rapido tra i suoni."
    },
    timeline: [
      { period: 'Introduzione', year: 'XVII Secolo', description: 'Distinzione tra vocale e semivocale.', poeticText: 'Il cappello del suono.' },
      { period: 'Stampa', year: '1735', description: 'Ufficializzata nell\'alfabeto civile.', poeticText: 'Riconoscimento.' },
      { period: 'Funzione', year: 'Oggi', description: 'Forma dittonghi essenziali.', poeticText: 'Legame rapido.' }
    ],
    wordInAction: { word: 'Йог', phonetic: 'jog', meaning: 'Yoga', explanation: 'Jog – yoga, prestito dal sanscrito. Un tocco breve e fugace che unisce Oriente e mondo slavo.', introPhrase: 'Un tocco breve e fugace.', lang: 'ru-RU' }
  },
  {
    id: 'ka',
    char: 'К',
    name: 'Kako',
    phonetic: '/k/',
    soundDescription: 'Il crepitio di un ramo spezzato.',
    glagolitic: 'Ⰺ',
    origin: 'Dalla Kappa greca (Κ).',
    variantDescription: 'Forma universale identica alla K latina. In bulgaro corsivo le aste possono essere più alte.',
    story: {
      origins: "Copia fedele della Kappa greca. La sua forma angolare è rimasta straordinariamente stabile per oltre un millennio.",
      evolution: "Invariata nella struttura, ma variabile nelle proporzioni. Nei font moderni cirillici, le 'braccia' della K spesso si incontrano sul fusto principale in modo diverso rispetto alla K latina.",
      curiosity: "Il nome 'Kako' significa 'Come'. È una lettera interrogativa e comparativa per eccellenza."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Come".', poeticText: 'Paragone.' },
      { period: 'Forma', year: 'Medioevo', description: 'Stabile nei secoli.', poeticText: 'Struttura affidabile.' },
      { period: 'Oggi', year: 'XX Secolo', description: 'Identica alla K latina.', poeticText: 'Universalità.' }
    ],
    wordInAction: { word: 'Книга', phonetic: 'kniga', meaning: 'Libro', explanation: 'Kniga – libro. La parola condivide la radice con «князь» (principe). Il crepitio di un ramo spezzato, le pagine che si voltano.', introPhrase: 'Il crepitio di un ramo spezzato.', lang: 'ru-RU' }
  },
  {
    id: 'el',
    char: 'Л',
    name: 'Lyudi',
    phonetic: '/l/',
    soundDescription: 'L\'acqua che lambisce la riva.',
    glagolitic: 'Ⰾ',
    origin: 'Dalla Lambda greca (Λ).',
    variantDescription: 'Standard russo a "piazza" piatta. In bulgaro è spesso triangolare (Λ).',
    story: {
      origins: "Discendente della Lambda greca. In origine era triangolare (Λ), una forma che sopravvive nel cirillico bulgaro.",
      evolution: "I copisti russi appiattirono la cima della lettera (Л) per scopi estetici e per riempire meglio lo spazio della riga, creando il caratteristico 'podio' quadrato che la distingue oggi.",
      curiosity: "Significa 'Gente' o 'Popolo'. È una lettera sociale, che rappresenta la collettività nel nome stesso."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Gente" o "Persone".', poeticText: 'Un tetto per la comunità.' },
      { period: 'Slavo', year: 'XIV Secolo', description: 'La cima si appiattì ("El" quadrata).', poeticText: 'Un podio solido.' },
      { period: 'Oggi', year: 'XX Secolo', description: 'Esiste in forma a punta (Λ) o quadrata (Л).', poeticText: 'Variante stilistica.' }
    ],
    wordInAction: { word: 'Любовь', phonetic: 'ljubov', meaning: 'Amore', explanation: 'Ljubov – amore. Parola centrale nella letteratura russa, da Pushkin a Tolstoj. L\'acqua che lambisce la riva dell\'anima.', introPhrase: 'L\'acqua che lambisce la riva.', lang: 'ru-RU' }
  },
  {
    id: 'em',
    char: 'М',
    name: 'Myslete',
    phonetic: '/m/',
    soundDescription: 'Il mormorio profondo del pensiero.',
    glagolitic: 'Ⰿ',
    origin: 'Dalla Mu greca (Μ).',
    variantDescription: 'Forma universale, identica alla M latina.',
    story: {
      origins: "Derivata dalla Mu greca. Una delle lettere più stabili e universali tra gli alfabeti greco, latino e cirillico.",
      evolution: "Mentre la forma è rimasta identica, il significato simbolico è profondo. Nella tradizione calligrafica slava, la M era spesso disegnata molto larga, occupando spazio come un pensiero che si espande.",
      curiosity: "Myslete: l'imperativo 'Pensate'. Un invito alla riflessione intellettuale posto proprio al centro dell'alfabeto."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Pensare".', poeticText: 'Riflessione interiore.' },
      { period: 'Calligrafia', year: 'XVII Secolo', description: 'Linee morbide nei corsivi.', poeticText: 'Onde mentali.' },
      { period: 'Stampa', year: '1708', description: 'Simile alla M latina.', poeticText: 'Simmetria.' }
    ],
    wordInAction: { word: 'Мать', phonetic: 'mat', meaning: 'Madre', explanation: 'Mat – madre. La Rodina-mat (Madre Patria) è un simbolo potente della cultura russa. In ucraino, Мрія (Mriya) significa Sogno ed era il nome dell\'aereo più grande del mondo, l\'Antonov An-225.', introPhrase: 'Il mormorio profondo del pensiero.', lang: 'ru-RU' }
  },
  {
    id: 'en',
    char: 'Н',
    name: 'Nash',
    phonetic: '/n/',
    soundDescription: 'Una negazione ferma ma calma.',
    glagolitic: 'Ⱀ',
    origin: 'Dalla Nu greca (Ν).',
    variantDescription: 'Universale. Identica alla H latina ma rappresenta il suono "N".',
    story: {
      origins: "Viene dalla Nu greca (che assomiglia a una 'v'). Inizialmente scritta come una N, nel tempo la barra diagonale si è raddrizzata.",
      evolution: "La trasformazione in una forma identica all'H latina è una delle grandi fonti di confusione per gli studenti occidentali. Questo cambiamento avvenne gradualmente nei manoscritti del XVI secolo.",
      curiosity: "Significa 'Nostro'. In contrapposizione a 'Vedi' (Tu sai) e 'Az' (Io), Nash rappresenta la proprietà collettiva e l'appartenenza."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Nostro".', poeticText: 'Appartenenza.' },
      { period: 'Cambio', year: 'XVI Secolo', description: 'La barra diagonale divenne orizzontale.', poeticText: 'Un ponte tra noi.' },
      { period: 'Confusione', year: 'XVIII Secolo', description: 'Identica alla H latina ma suono diverso.', poeticText: 'Falso amico.' }
    ],
    wordInAction: { word: 'Ночь', phonetic: 'noch', meaning: 'Notte', explanation: 'Noch – notte. Simbolo del mistero e del sonno nelle tradizioni slave. Una negazione ferma ma calma che avvolge il mondo.', introPhrase: 'Una negazione ferma ma calma.', lang: 'ru-RU' }
  },
  {
    id: 'o',
    char: 'О',
    name: 'On',
    phonetic: '/o/',
    soundDescription: 'Un cerchio perfetto, infinito.',
    glagolitic: 'Ⱁ',
    origin: 'Dalla Omicron greca (Ο).',
    variantDescription: 'Forma base universale.',
    story: {
      origins: "La forma più antica e universale di scrittura: il cerchio. Derivata dalla Omicron greca e dalla Ayin fenicia.",
      evolution: "Non ha subito evoluzioni morfologiche significative. È il perno visivo attorno al quale ruotano le lettere più complesse. In russo, quando non accentata, si riduce foneticamente a una 'a' (akanje).",
      curiosity: "Significa 'Lui' o 'Quello'. È anche un prefisso comune che indica un'azione che copre l'intera superficie di qualcosa."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Lui" o "Quello".', poeticText: 'Totalità.' },
      { period: 'Forma', year: 'Sempre', description: 'Il cerchio non è mai cambiato.', poeticText: 'Eterno ritorno.' },
      { period: 'Uso', year: 'Oggi', description: 'Vocale fondamentale.', poeticText: 'Il centro del suono.' }
    ],
    wordInAction: { word: 'Огонь', phonetic: 'ogon', meaning: 'Fuoco', explanation: 'Ogon – fuoco. Elemento purificatore e distruttore. Un cerchio perfetto, infinito, che danza nelle stufe russe.', introPhrase: 'Un cerchio perfetto, infinito.', lang: 'ru-RU' }
  },
  {
    id: 'pe',
    char: 'П',
    name: 'Pokoy',
    phonetic: '/p/',
    soundDescription: 'Il silenzio di una porta che si chiude.',
    glagolitic: 'Ⱂ',
    origin: 'Dalla Pi greca (Π).',
    variantDescription: 'Russo standard squadrato. In bulgaro e serbo corsivo spesso simile a una "n" minuscola latina.',
    story: {
      origins: "Adattamento della Pi greca. I copisti slavi ne accentuarono gli angoli retti, rendendola un portale architettonico.",
      evolution: "Il suo nome 'Pokoy' significa Pace, Riposo o Quiete. La sua forma stabile, con due gambe solide e un tetto piatto, incarna visivamente questo concetto di stasi e tranquillità.",
      curiosity: "Nella corsiva russa minuscola, assomiglia a una 'n' latina, creando un altro punto di confusione per i principianti."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Pace" o "Riposo".', poeticText: 'Quiete statica.' },
      { period: 'Stile', year: 'XVI Secolo', description: 'Squadrata e architettonica.', poeticText: 'Un portale.' },
      { period: 'Modernità', year: '1708', description: 'Base della stabilità.', poeticText: 'Pilastri.' }
    ],
    wordInAction: { word: 'Папа', phonetic: 'papa', meaning: 'Papà', explanation: 'Papa – papà. Il silenzio di una porta che si chiude, il rifugio sicuro. Parola universale ma dal suono slavo distintivo.', introPhrase: 'Il silenzio di una porta che si chiude.', lang: 'ru-RU' }
  },
  {
    id: 'er',
    char: 'Р',
    name: 'Rtsy',
    phonetic: '/r/',
    soundDescription: 'Il rombo di un motore in lontananza.',
    glagolitic: 'Ⱃ',
    origin: 'Dalla Rho greca (Ρ).',
    variantDescription: 'Universale. Identica alla P latina ma rappresenta il suono "R".',
    story: {
      origins: "Dalla Rho greca. Sebbene identica alla 'P' latina, porta il suono vibrante /r/.",
      evolution: "Nel Glagolitico aveva una forma angolare simile a una chiave. La versione cirillica ha abbracciato la curva greca, mantenendo però il tratto discendente lungo nei manoscritti.",
      curiosity: "Rtsy è un imperativo arcaico: 'Parla!' o 'Dì!'. È la lettera dell'oratore, che vibra e richiede attenzione."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Dì" o "Parla".', poeticText: 'L\'ordine di parlare.' },
      { period: 'Confusione', year: 'XVIII Secolo', description: 'Sembra una P latina ma vibra.', poeticText: 'Inganno visivo.' },
      { period: 'Suono', year: 'Oggi', description: 'Forte e vibrante.', poeticText: 'Energia pura.' }
    ],
    wordInAction: { word: 'Рука', phonetic: 'ruka', meaning: 'Mano', explanation: 'Ruka – mano. La mano che scrive, che lavora, che benedice. Il rombo di un motore in lontananza che costruisce.', introPhrase: 'Il rombo di un motore in lontananza.', lang: 'ru-RU' }
  },
  {
    id: 'es',
    char: 'С',
    name: 'Slovo',
    phonetic: '/s/',
    soundDescription: 'Il fruscio della seta.',
    glagolitic: 'Ⱄ',
    origin: 'Dalla Sigma lunata greca (ϲ).',
    variantDescription: 'Universale. Simile alla C latina ma suono sibilante.',
    story: {
      origins: "Deriva dalla 'Sigma lunata' (ϲ), una variante semplificata della Sigma greca usata nei manoscritti bizantini.",
      evolution: "La sua forma a mezzaluna è rimasta costante. In un alfabeto pieno di linee rette e angoli, la 'C' offre una pausa curva e morbida.",
      curiosity: "Slovo significa 'Parola'. È la radice del termine 'Slavi' (Sloveni), coloro che possiedono la parola, in contrapposizione ai 'Nemtsy' (Tedeschi/Muti), coloro che non parlano la lingua comprensibile."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Parola".', poeticText: 'Il verbo umano.' },
      { period: 'Forma', year: 'Medioevo', description: 'Aperta come una luna crescente.', poeticText: 'Accoglienza.' },
      { period: 'Oggi', year: 'XX Secolo', description: 'Identica alla C latina.', poeticText: 'Semplicità curva.' }
    ],
    wordInAction: { word: 'Солнце', phonetic: 'solnce', meaning: 'Sole', explanation: 'Solnce – sole. Centro del culto pagano slavo prima del cristianesimo. Il fruscio della seta tra i raggi.', introPhrase: 'Il fruscio della seta.', lang: 'ru-RU' }
  },
  {
    id: 'tverdo',
    char: 'Т',
    name: 'Te',
    phonetic: '/t/',
    soundDescription: 'Il ticchettio di un orologio meccanico.',
    glagolitic: 'Ⱅ',
    origin: 'Dalla Tau greca (Τ).',
    variantDescription: 'In russo standard è una T. In serbo e bulgaro corsivo assume forma di "m" minuscola con tratto sopra.',
    story: {
      origins: "Direttamente dalla Tau greca. Un pilastro centrale che sostiene un architrave: la struttura più semplice e stabile.",
      evolution: "La variante corsiva (specialmente in serbo e bulgaro) è radicalmente diversa, apparendo come una 'm' rovesciata o con una barra sopra, mostrando come la scrittura manuale possa divergere dalla stampa.",
      curiosity: "Tverdo significa 'Solido', 'Duro' o 'Fermo'. È la lettera della certezza e della determinazione."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Solido" o "Fermo".', poeticText: 'Il martello che batte.' },
      { period: 'Calligrafia', year: 'XVII Secolo', description: 'A tre gambe nel corsivo (m minuscola).', poeticText: 'Supporto triplo.' },
      { period: 'Standard', year: '1708', description: 'T maiuscola classica.', poeticText: 'Equilibrio perfetto.' }
    ],
    wordInAction: { word: 'Труд', phonetic: 'trud', meaning: 'Lavoro', explanation: 'Trud – lavoro, fatica. Valore fondante nella cultura sovietica e slava. Il ticchettio di un orologio meccanico nel tempo che passa.', introPhrase: 'Il ticchettio di un orologio meccanico.', lang: 'ru-RU' }
  },
  {
    id: 'uk',
    char: 'У',
    name: 'Uk',
    phonetic: '/u/',
    soundDescription: 'Il richiamo del gufo nella notte.',
    glagolitic: 'Ⱆ',
    origin: 'Dalla Upsilon greca (Υ).',
    variantDescription: 'Universale. Simile alla Y latina ma è la vocale "U".',
    story: {
      origins: "Originariamente un digramma (O + Ypsilon) per imitare il suono greco 'ou'. Col tempo, la O è caduta, lasciando solo la coda.",
      evolution: "La semplificazione da 'Оу' a 'У' è uno dei primi esempi di ottimizzazione calligrafica slava. La forma attuale ricorda la 'y' minuscola latina.",
      curiosity: "La sua coda discendente permette ai calligrafi di aggiungere fioriture eleganti sotto la riga di base."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Inizialmente un digramma (O+Y).', poeticText: 'Doppia origine.' },
      { period: 'Semplificazione', year: '1708', description: 'Divenne un singolo glifo.', poeticText: 'Unità.' },
      { period: 'Forma', year: 'Oggi', description: 'Simile alla y latina.', poeticText: 'Convergenza.' }
    ],
    wordInAction: { word: 'Ухо', phonetic: 'uho', meaning: 'Orecchio', explanation: 'Uho – orecchio. L\'organo che raccoglie il richiamo del gufo nella notte, le voci degli antenati.', introPhrase: 'Il richiamo del gufo nella notte.', lang: 'ru-RU' }
  },
  {
    id: 'ef',
    char: 'Ф',
    name: 'Fert',
    phonetic: '/f/',
    soundDescription: 'Il soffio che spegne la candela.',
    glagolitic: 'Ⱇ',
    origin: 'Dalla Phi greca (Φ).',
    variantDescription: 'Universale. Usata principalmente per parole di origine greca o straniera.',
    story: {
      origins: "Importata direttamente dalla Phi greca. Il suono /f/ non era nativo delle lingue slave antiche.",
      evolution: "Per secoli è stata una lettera 'straniera', usata quasi esclusivamente nei nomi propri e termini teologici greci (es. Filosofia).",
      curiosity: "Il nome 'Fert' potrebbe derivare dall'onomatopea del soffio, o dalla posizione delle mani sui fianchi ('stare in fert'), che la forma della lettera ricorda."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Nome incerto, forse onomatopeico.', poeticText: 'Mani sui fianchi.' },
      { period: 'Uso', year: 'Medioevo', description: 'Solo per parole straniere.', poeticText: 'L\'intruso.' },
      { period: 'Rarità', year: 'Oggi', description: 'Poca frequenza nel lessico slavo nativo.', poeticText: 'Esotico.' }
    ],
    wordInAction: { word: 'Фонарь', phonetic: 'fonar', meaning: 'Lanterna', explanation: 'Fonar – lanterna. Il soffio che spegne la candela non spenga mai la luce della conoscenza nelle scuole slave.', introPhrase: 'Il soffio che spegne la candela.', lang: 'ru-RU' }
  },
  {
    id: 'kha',
    char: 'Х',
    name: 'Kher',
    phonetic: '/x/',
    soundDescription: 'Una risata gutturale.',
    glagolitic: 'Ⱈ',
    origin: 'Dalla Chi greca (Χ).',
    variantDescription: 'Universale. Identica alla X latina ma suono aspirato.',
    story: {
      origins: "Dalla Chi greca. Una croce di Sant'Andrea che rappresenta il suono gutturale /x/ (come 'Bach').",
      evolution: "Simbolo potente di cancellazione e incrocio. La sua simmetria diagonale la rende una delle lettere più dinamiche graficamente.",
      curiosity: "In antico, 'Kher' era usata come abbreviazione per Cristo (Khristos), conferendole una valenza sacra nonostante il suono aspro."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Abbreviazione divina.', poeticText: 'Incrocio sacro.' },
      { period: 'Simbolismo', year: 'Sempre', description: 'La croce di Sant\'Andrea.', poeticText: 'Cancellazione e unione.' },
      { period: 'Forma', year: 'Oggi', description: 'Simmetria diagonale perfetta.', poeticText: 'X.' }
    ],
    wordInAction: { word: 'Хлеб', phonetic: 'hleb', meaning: 'Pane', explanation: 'Hleb – pane. Simbolo sacro di ospitalità slava. «Хлеб-соль» (pane e sale) è il gesto di benvenuto più antico. Una risata gutturale di gioia.', introPhrase: 'Una risata gutturale.', lang: 'ru-RU' }
  },
  {
    id: 'tse',
    char: 'Ц',
    name: 'Tse',
    phonetic: '/ts/',
    soundDescription: 'Il taglio netto di una lama.',
    glagolitic: 'Ⱌ',
    origin: 'Dalla lettera ebraica Tsade (צ).',
    variantDescription: 'Universale. La piccola coda in basso a destra è il tratto distintivo.',
    story: {
      origins: "Una delle poche lettere cirilliche di chiara origine semitica (Ebraico Tsade), introdotta perché il greco non aveva un segno per il suono /ts/.",
      evolution: "La forma si è evoluta in una 'P' squadrata con una piccola coda (descender) a destra. Questa coda è il vestigio della calligrafia ebraica corsiva.",
      curiosity: "È un suono molto comune nelle lingue slave, spesso alla fine delle parole, dando un senso di chiusura netta e precisa."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Suono non greco, origine semitica.', poeticText: 'Radice orientale.' },
      { period: 'Forma', year: 'XVII Secolo', description: 'Simile alla P con una coda.', poeticText: 'L\'uncino.' },
      { period: 'Oggi', year: 'XX Secolo', description: 'Dura e precisa.', poeticText: 'Zoccolo.' }
    ],
    wordInAction: { word: 'Цветок', phonetic: 'tsvetok', meaning: 'Fiore', explanation: 'Tsvetok – fiore. Il taglio netto di una lama che recide uno stelo, la bellezza effimera. Radice di «цвет» (colore).', introPhrase: 'Il taglio netto di una lama.', lang: 'ru-RU' }
  },
  {
    id: 'che',
    char: 'Ч',
    name: 'Che',
    phonetic: '/tɕ/',
    soundDescription: 'Il ciuffo di vapore di un treno.',
    glagolitic: 'Ⱍ',
    origin: 'Forse dalla Tsade ebraica (צ).',
    variantDescription: 'Universale. Assomiglia al numero 4.',
    story: {
      origins: "Anche questa probabilmente di origine semitica (Tsade), adattata per il suono dolce /ch/.",
      evolution: "La sua forma ricorda una coppa o il numero 4. È una lettera 'aperta' in alto, pronta a ricevere il suono successivo.",
      curiosity: "Il nome antico 'Cherv' significava 'Verme' o 'Rosso' (dal verme della cocciniglia usato per la tintura). Una connessione inaspettata tra suono e colore."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Significa "Verme" (forma antica).', poeticText: 'La coppa.' },
      { period: 'Evoluzione', year: 'XIV Secolo', description: 'Assomiglia al numero 4.', poeticText: 'Sedia aperta.' },
      { period: 'Oggi', year: 'XXI Secolo', description: 'Tratto distintivo slavo.', poeticText: 'Quattro.' }
    ],
    wordInAction: { word: 'Чай', phonetic: 'chaj', meaning: 'Tè', explanation: 'Chaj – tè. Arrivato dalla Via della Seta, il tè è rituale quotidiano in Russia. Il ciuffo di vapore che si alza dalla samovar.', introPhrase: 'Il ciuffo di vapore di un treno.', lang: 'ru-RU' }
  },
  {
    id: 'sha',
    char: 'Ш',
    name: 'Sha',
    phonetic: '/ʂ/',
    soundDescription: 'Il fruscio delle foglie secche.',
    glagolitic: 'Ⱎ',
    origin: 'Dalla lettera ebraica Shin (ש).',
    variantDescription: 'Universale. Tre barre verticali collegate in basso.',
    story: {
      origins: "Un prestito diretto dall'ebraico Shin (ש). Cirillo e Metodio riconobbero che questo segno semitico era perfetto per il suono sibilante ricco slavo.",
      evolution: "Un vero 'tridente' tipografico. La sua larghezza e le tre aste verticali creano un ritmo forte nel testo scritto, interrompendo il flusso delle lettere più strette.",
      curiosity: "La Shin ebraica rappresenta un dente; la Sha cirillica ne conserva l'aspetto 'mordace' e multiplo."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Dal semitico "Dente".', poeticText: 'Il tridente.' },
      { period: 'Forma', year: 'Sempre', description: 'Tre aste verticali unite.', poeticText: 'Molteplicità.' },
      { period: 'Suono', year: 'Oggi', description: 'Un sibilo ampio e basso.', poeticText: 'Silenzio rumoroso.' }
    ],
    wordInAction: { word: 'Школа', phonetic: 'shkola', meaning: 'Scuola', explanation: 'Shkola – scuola. Dal greco «scholē» (tempo libero). Il fruscio delle foglie secche dei libri che si aprono.', introPhrase: 'Il fruscio delle foglie secche.', lang: 'ru-RU' }
  },
  {
    id: 'shcha',
    char: 'Щ',
    name: 'Shcha',
    phonetic: '/ɕː/',
    soundDescription: 'Zuppa che bolle vivacemente.',
    glagolitic: 'Ⱋ',
    origin: 'Legatura di Ш + Т.',
    variantDescription: 'Russo e Ucraino. In Bulgaro si pronuncia "Sht".',
    story: {
      origins: "Nata come legatura (fusione) tra Sha (Ш) e Te (Т) per scrivere velocemente il suono /sht/ o /shch/.",
      evolution: "La 'T' sottostante si è ridotta a una piccola coda centrale o laterale nel corso dei secoli. È la lettera con più tratti verticali dell'alfabeto.",
      curiosity: "È la 'prova del fuoco' per gli stranieri. La sua pronuncia varia: 'sht' in bulgaro, 'shch' in ucraino, e un lungo e morbido 'shh' in russo moderno."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Una fusione di suoni.', poeticText: 'Il tridente con la coda.' },
      { period: 'Evoluzione', year: 'XVIII Secolo', description: 'Stabilizzata con la piccola coda destra.', poeticText: 'Appendice.' },
      { period: 'Oggi', year: 'XX Secolo', description: 'Suono lungo e morbido.', poeticText: 'Flusso continuo.' }
    ],
    wordInAction: { word: 'Щи', phonetic: 'schi', meaning: 'Minestra', explanation: 'Schi – zuppa di cavolo, piatto nazionale russo. Zuppa che bolle vivacemente sul fuoco della cucina contadina.', introPhrase: 'Zuppa che bolle vivacemente.', lang: 'ru-RU' }
  },
  {
    id: 'tverdy',
    char: 'Ъ',
    name: 'Tverdy Znak',
    phonetic: '-',
    soundDescription: 'Una pausa improvvisa, un muro.',
    glagolitic: 'Ⱏ',
    origin: 'Modifica della O e I.',
    variantDescription: 'In russo è il "segno duro" (muto). In bulgaro è una vocale vera e propria.',
    story: {
      origins: "Anticamente una vocale brevissima (Jer). Con la caduta delle vocali deboli, ha perso il suo suono ma ha mantenuto la funzione di 'indurire' la consonante precedente.",
      evolution: "Dopo la rivoluzione russa del 1918, rischiò di scomparire (sostituita dall'apostrofo), ma sopravvisse come separatore silenzioso.",
      curiosity: "Chiamato 'Segno Duro'. È un muro di silenzio all'interno della parola, che costringe il lettore a una breve pausa glottale."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Vocale ultra-breve in antico slavo.', poeticText: 'Il respiro mozzato.' },
      { period: 'Riforma', year: '1918', description: 'Rimossa alla fine delle parole.', poeticText: 'Il grande silenzio.' },
      { period: 'Funzione', year: 'Oggi', description: 'Separa consonante e vocale.', poeticText: 'Il divisore.' }
    ],
    wordInAction: { word: 'Объект', phonetic: 'obekt', meaning: 'Oggetto', explanation: 'Obekt – oggetto. Una pausa improvvisa, un muro tra soggetto e mondo. Il segno duro (Ъ) che separa e definisce.', introPhrase: 'Una pausa improvvisa, un muro.', lang: 'ru-RU' }
  },
  {
    id: 'yery',
    char: 'Ы',
    name: 'Yery',
    phonetic: '/ɨ/',
    soundDescription: 'Un suono gutturale profondo.',
    glagolitic: 'Ⱐ',
    origin: 'Legatura di Ъ + І.',
    variantDescription: 'Russo e Bielorusso. Assente in Ucraino, Bulgaro e Serbo (sostituita da I).',
    story: {
      origins: "Un'invenzione composita: il segno duro (Ъ) unito alla I decimale (І). Rappresenta un suono profondo e gutturale unico delle lingue slave orientali.",
      evolution: "Non inizia mai una parola in russo (tranne rari nomi geografici). È sempre una lettera 'interna', nascosta nel corpo del testo.",
      curiosity: "Spesso descritta come il suono che si fa quando si viene colpiti allo stomaco. È l'anima oscura e profonda della fonetica russa."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Fusione di due lettere.', poeticText: 'Due in uno.' },
      { period: 'Unicità', year: 'Sempre', description: 'Non inizia mai una parola.', poeticText: 'L\'eterno secondo.' },
      { period: 'Suono', year: 'Oggi', description: 'Difficile per i non nativi.', poeticText: 'L\'anima russa.' }
    ],
    wordInAction: { word: 'Рыба', phonetic: 'ryba', meaning: 'Pesce', explanation: 'Ryba – pesce. Simbolo cristiano per eccellenza. Un suono gutturale profondo che abita le acque dei fiumi slavi.', introPhrase: 'Un suono gutturale profondo.', lang: 'ru-RU' }
  },
  {
    id: 'myagky',
    char: 'Ь',
    name: 'Myagky Znak',
    phonetic: 'ʲ',
    soundDescription: 'Ammorbidisce come velluto.',
    glagolitic: 'Ⱑ',
    origin: 'Modifica della O e I.',
    variantDescription: 'Universale. "Segno morbido", non ha suono proprio ma modifica la consonante precedente.',
    story: {
      origins: "La controparte 'morbida' del segno duro. Anticamente una vocale breve frontale, oggi è un modificatore puro.",
      evolution: "La sua forma ricorda una 'b' minuscola ma più piccola. È l'agente della gentilezza nella lingua, trasformando suoni duri in suoni palatali e affettuosi.",
      curiosity: "Senza questa lettera, molte distinzioni grammaticali e semantiche crollerebbero. È piccola, silenziosa, ma potente."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Vocale ultra-breve anteriore.', poeticText: 'La carezza.' },
      { period: 'Funzione', year: 'Oggi', description: 'Palatalizza la consonante precedente.', poeticText: 'Dolcezza.' },
      { period: 'Forma', year: '1708', description: 'Simile alla b latina.', poeticText: 'Piccola e potente.' }
    ],
    wordInAction: { word: 'Соль', phonetic: 'sol', meaning: 'Sale', explanation: 'Sol – sale. Con il pane, simbolo di ospitalità. Ammorbidisce come velluto il sapore della vita.', introPhrase: 'Ammorbidisce come velluto.', lang: 'ru-RU' }
  },
  {
    id: 'e',
    char: 'Э',
    name: 'E Oborot.',
    phonetic: '/ɛ/',
    soundDescription: 'Un\'esclamazione aperta.',
    glagolitic: '-',
    origin: 'Forma specchiata della Є.',
    variantDescription: 'Russo e Bielorusso. Assente in altri alfabeti slavi.',
    story: {
      origins: "Letteralmente 'E rovesciata' (Oborotnoye). Creata per rappresentare la 'E' aperta non iotizzata nei prestiti stranieri, poiché la 'E' russa si era ormai palatalizzata.",
      evolution: "Mikhail Lomonosov, il grande polimatico russo, la detestava, considerandola brutta e non necessaria. Ciononostante, sopravvisse per necessità fonetica.",
      curiosity: "È la lettera dell'esotico: inizia parole come 'Elettricità', 'Era', 'Etica'. Rappresenta il ponte verso l'Occidente."
    },
    timeline: [
      { period: 'Introduzione', year: 'XVII Secolo', description: 'Per distinguere il suono E duro.', poeticText: 'La E rovesciata.' },
      { period: 'Critica', year: 'XVIII Secolo', description: 'Lomonosov la odiava.', poeticText: 'Controversia.' },
      { period: 'Uso', year: 'Oggi', description: 'In parole straniere e pronomi.', poeticText: 'L\'alieno.' }
    ],
    wordInAction: { word: 'Эхо', phonetic: 'eho', meaning: 'Eco', explanation: 'Eho – eco. Un\'esclamazione aperta che rimbalza tra le montagne. La lettera dell\'esotico e dell\'Occidente.', introPhrase: 'Un\'esclamazione aperta.', lang: 'ru-RU' }
  },
  {
    id: 'yu',
    char: 'Ю',
    name: 'Yu',
    phonetic: '/ju/',
    soundDescription: 'Un bacio lanciato al vento.',
    glagolitic: 'Ⱓ',
    origin: 'Legatura di I + O.',
    variantDescription: 'Russo, Ucraino, Bulgaro. Assente in Serbo (sostituita da "Ju").',
    story: {
      origins: "Una legatura grafica tra Iota (I) e Omicron (O). Nel greco antico non esisteva un segno unico per questo suono.",
      evolution: "La linea di connessione tra le due parti si è accorciata nei secoli, fondendo i due elementi in un unico glifo armonioso che rappresenta il suono /ju/.",
      curiosity: "La sua forma ricorda il pianeta Saturno o una testa di profilo. È una lettera 'rotonda' e musicale."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Greco OI ligatura.', poeticText: 'Connessione circolare.' },
      { period: 'Forma', year: '1708', description: 'I collegata a O.', poeticText: 'Il pianeta e il satellite.' },
      { period: 'Suono', year: 'Oggi', description: 'Vocale iotizzata.', poeticText: 'Gioventù.' }
    ],
    wordInAction: { word: 'Юг', phonetic: 'jug', meaning: 'Sud', explanation: 'Jug – sud. Direzione cardinale, punto di riferimento. Un bacio lanciato al vento verso terre calde.', introPhrase: 'Un bacio lanciato al vento.', lang: 'ru-RU' }
  },
  {
    id: 'ya',
    char: 'Я',
    name: 'Ya',
    phonetic: '/ja/',
    soundDescription: 'L\'affermazione dell\'io.',
    glagolitic: 'Ⱔ',
    origin: 'Legatura di I + A (A iotizzata).',
    variantDescription: 'Russo, Ucraino, Bulgaro. Assente in Serbo (sostituita da "Ja").',
    story: {
      origins: "Deriva dalla 'Yus piccola' (ѧ), una lettera nasale antica. Pietro il Grande ne ridisegnò radicalmente la forma ispirandosi alla 'R' latina corsiva.",
      evolution: "Il passaggio da un simbolo nasale complesso a una 'R specchiata' è una delle trasformazioni più drastiche della storia del cirillico.",
      curiosity: "È l'ultima lettera dell'alfabeto, ma significa 'Io'. Un paradosso poetico: l'individuo è alla fine, umile ma essenziale."
    },
    timeline: [
      { period: 'Origine', year: 'IX Secolo', description: 'Evoluzione della Yus piccola (ѧ).', poeticText: 'Il mio essere.' },
      { period: 'Riforma', year: '1708', description: 'Pietro il Grande la ridisegnò come R rovesciata.', poeticText: 'Specchio della R.' },
      { period: 'Significato', year: 'Sempre', description: 'Ultima lettera, ma significa "Io".', poeticText: 'La fine è l\'inizio.' }
    ],
    wordInAction: { word: 'Яйцо', phonetic: 'jajco', meaning: 'Uovo', explanation: 'Jajco – uovo. Simbolo di rinascita. L\'affermazione dell\'io che si schiude dall\'ultima lettera dell\'alfabeto.', introPhrase: 'L\'affermazione dell\'io.', lang: 'ru-RU' }
  }
];