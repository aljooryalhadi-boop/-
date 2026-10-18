export type GameMode = 'hunter' | 'transform' | 'signs' | 'detective' | 'rules' | 'analyzer';

export interface HunterWord {
  id: string;
  word: string;
  type: 'imperative' | 'past' | 'present' | 'noun';
  root?: string;
  explanation: string;
}

export interface TransformQuestion {
  id: string;
  presentVerb: string; // e.g. "تَكْتُبُ"
  targetPronoun: string; // e.g. "أنتَ (للمذكر)" or "أنتِ (للمؤنث)"
  pronounCode: 'anta' | 'anti' | 'antuma' | 'antum' | 'antunna';
  correctImperative: string; // e.g. "اكْتُبْ"
  options: string[];
  constructionSign: 'السكون' | 'حذف حرف العلة' | 'حذف النون';
  ruleExplanation: string;
}

export interface SignsQuestion {
  id: string;
  sentence: string; // Full sentence with highlighting
  imperativeWord: string; // e.g. "اسْعَ"
  correctSign: 'السكون' | 'حذف حرف العلة' | 'حذف النون';
  options: ('السكون' | 'حذف حرف العلة' | 'حذف النون')[];
  reason: string;
  pronoun: string;
}

export interface DetectiveQuestion {
  id: string;
  flawedSentence: string;
  wrongWord: string;
  correctWord: string;
  correctSentence: string;
  whyWrong: string;
  ruleHint: string;
}

export interface PlayerStats {
  score: number;
  stars: number;
  streak: number;
  maxStreak: number;
  gamesPlayed: number;
  playerName: string;
  unlockedBadges: string[];
}
