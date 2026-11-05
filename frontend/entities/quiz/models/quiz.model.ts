export const AnswerType = {
  Boolean: 'BOOLEAN',
  Input: 'INPUT',
  Checkbox: 'CHECKBOX',
} as const;

export type AnswerType = (typeof AnswerType)[keyof typeof AnswerType];

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  text: string;
  answerType: AnswerType;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizSummary {
  id: string;
  title: string;
  questionCount: number;
}
