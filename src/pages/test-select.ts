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
        <div class="card" style="border-color: var(--accent); border-width: 2px;">
          <div class="card__title" style="font-size: 1.25rem;">Комплексний тест ЄДКІ</div>
          <div class="card__description">100 питань з усіх розділів програми. Розподіл відповідає структурі реального іспиту. Час: 120 хвилин.</div>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <a href="#/test/comprehensive/training" class="btn btn--primary">Тренування</a>
            <a href="#/test/comprehensive/exam" class="btn btn--outline">Екзамен</a>
          </div>
        </div>
        <div class="card" style="border-color: var(--success); border-width: 2px;">
          <div class="card__title" style="font-size: 1.25rem;">ЄДКІ 2022-2023 (реальний іспит)</div>
          <div class="card__description">100 питань з реального іспиту ЄДКІ за 2022-2023 рік. Перевірте свою готовність на справжніх завданнях!</div>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <a href="#/test/real-exam-2023/training" class="btn btn--primary">Тренування</a>
            <a href="#/test/real-exam-2023/exam" class="btn btn--outline">Екзамен</a>
          </div>
        </div>
        <h2 style="margin: 1.5rem 0 1rem; font-size: 1.2rem; color: var(--text-secondary);">За темами</h2>
        ${cards}
      </div>
    </div>
  `;
}
