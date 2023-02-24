export interface TodoItem {
  id: string;
  text: string;
  time: Date;
  users: User[];
  substance: Substance;
}

export interface User {
  id: string;
  name: string;
}

export interface Substance {
  id: string;
  name: string;
  nickname: string;
  fullName: string;
  dose?: {
    min?: number;
    max?: number;
    unit?: 'ml' | 'mg' | 'g';
  }
  duration?: {
    min?: number;
    max?: number;
  }
}
