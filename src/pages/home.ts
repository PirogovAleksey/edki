export function renderHome(): string {
  return `
    <div class="page">
      <div class="container">
        <h1 class="page__title">Підготовка до ЄДКІ</h1>
        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
          Спеціальність 125 — Кібербезпека та захист інформації
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="#/topics" class="btn btn--primary">Теоретичні матеріали</a>
          <a href="#/tests" class="btn btn--outline">Пройти тест</a>
        </div>
      </div>
    </div>
  `;
}
