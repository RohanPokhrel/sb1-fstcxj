export type Mood = 'peaceful' | 'happy' | 'neutral' | 'anxious' | 'disturbing';

export interface Dream {
  id: string;
  date: Date;
  title: string;
  description: string;
  mood: Mood;
  tags: string[];
  symbols: string[];
  isPublic: boolean;
}

export interface DreamEntry {
  dream: Dream;
  onSave: (dream: Dream) => void;
}