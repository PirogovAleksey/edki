import type { TopicMeta, QuestionSet } from './types';

export const topics: TopicMeta[] = [
  {
    id: 'legal-framework',
    title: 'Нормативно-правове забезпечення кібербезпеки',
    description: 'Законодавство України, НД ТЗІ, ДСТУ, ISO 27001, Common Criteria.',
  },
  {
    id: 'network-security',
    title: 'Комп\'ютерні мережі та мережева безпека',
    description: 'Моделі OSI/TCP-IP, адресація, мережеві атаки, фаєрволи, IDS/IPS, VPN.',
  },
  {
    id: 'security-technologies',
    title: 'Технології захисту інформації',
    description: 'Класифікація загроз, засоби захисту, управління доступом, SIEM, захист ОС.',
  },
  {
    id: 'security-audit',
    title: 'Аудит інформаційної безпеки',
    description: 'Методологія аудиту, оцінка вразливостей, тестування на проникнення.',
  },
  {
    id: 'software-security',
    title: 'Безпека програмного забезпечення',
    description: 'OWASP Top 10, SDLC, безпека ОС, веб-вразливості, контейнеризація.',
  },
  {
    id: 'cryptography',
    title: 'Криптографічний захист інформації',
    description: 'Симетричне та асиметричне шифрування, хеш-функції, ЕЦП, українські стандарти.',
  },
  {
    id: 'incident-management',
    title: 'Управління інцидентами кібербезпеки',
    description: 'Реагування на інциденти, цифрова криміналістика, CERT-UA, відновлення.',
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
