import { topics } from '../content';

export function renderTopics(): string {
  const cards = topics.map(t => `
    <a href="#/topic/${t.id}" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div class="card__title">${t.title}</div>
      <div class="card__description">${t.description}</div>
    </a>
  `).join('');

  return `
    <div class="page">
      <div class="container">
        <h1 class="page__title">Теоретичні матеріали</h1>
        ${cards}
      </div>
    </div>
  `;
}
