import { topics, loadTheory } from '../content';

export async function renderTopic(topicId: string): Promise<string> {
  const meta = topics.find(t => t.id === topicId);
  if (!meta) return '<div class="page"><div class="container"><p>Тему не знайдено.</p></div></div>';

  const html = await loadTheory(topicId);

  return `
    <div class="page">
      <div class="container">
        <a href="#/topics" style="color: var(--text-secondary); font-size: 0.9rem;">← Всі теми</a>
        <div class="theory-content" style="margin-top: 1rem;">
          ${html}
        </div>
        <div style="margin-top: 2rem;">
          <a href="#/tests" class="btn btn--primary">Пройти тест</a>
        </div>
      </div>
    </div>
  `;
}
