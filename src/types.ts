export interface Question {
  id: number;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuestionSet {
  topic: string;
  timeLimit?: number;
  questions: Question[];
}

export interface TopicMeta {
  id: string;
  title: string;
  description: string;
}
