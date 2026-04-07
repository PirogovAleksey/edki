import { topics } from '../content';

export function renderTestSelect(): string {
  const cards = topics.map(t => `
    <div class="card">
      <div class="card__title">${t.title}</div>
      <div class="card__description">${t.description}</div>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <a href="#/test/${t.id}/training" class="btn btn--primary">Тренування</a>
        <a href="#/test/${t.id}/exam" class="btn btn--outline">Екзамен</a>
      </div>
    </div>
  `).join('');

  return `
    <div class="page">
      <div class="container">
        <h1 class="page__title">Тестування</h1>
        ${cards}
      </div>
    </div>
  `;
}
