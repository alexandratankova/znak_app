export interface TimelineEvent {
  period: string;
  year: string;
  description: string;
  poeticText: string;
}

export interface LetterStory {
  origins: string;
  evolution: string;
  curiosity: string;
}

export interface WordInAction {
  word: string;       // Parola cirillica (es. "Брат")
  phonetic: string;  // Trascrizione latina (es. "brat")
  meaning: string;   // Significato italiano (es. "Fratello")
  explanation?: string;   // Spunto culturale (es. "Mriya era il nome dell'aereo più grande del mondo")
  introPhrase?: string;   // Frase poetica introduttiva (es. "Il vibrare di una corda tesa")
  lang?: string;     // Codice lingua per TTS (ru-RU, uk-UA, bg-BG...)
  image?: string;    // URL immagine (opzionale)
}

export interface LetterData {
  id: string;
  char: string;
  name: string;
  phonetic: string;
  soundDescription: string;
  glagolitic: string;
  origin: string;
  timeline: TimelineEvent[];
  variantDescription: string;
  story: LetterStory;
  wordInAction?: WordInAction;  // Parola iconica per "Il cuore della parola"
}

export type GameState = 'playing' | 'success' | 'error';