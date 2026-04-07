import type { TopicMeta, QuestionSet } from './types';

export const topics: TopicMeta[] = [
  {
    id: 'cryptography',
    title: 'Криптографія',
    description: 'Симетричне та асиметричне шифрування, хеш-функції, ЕЦП.',
  },
  {
    id: 'network-security',
    title: 'Мережева безпека',
    description: 'Протоколи, фаєрволи, IDS/IPS, VPN, мережеві атаки.',
  },
];

export async function loadQuestions(topicId: string): Promise<QuestionSet> {
  const module = await import(`../content/questions/${topicId}.json`);
  return module.default as QuestionSet;
}

export async function loadTheory(topicId: string): Promise<string> {
  const module = await import(`../content/topics/${topicId}.md`);
  return module.html as string;
}
