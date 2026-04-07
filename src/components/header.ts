import { toggleTheme, getCurrentTheme } from '../theme';

export function renderHeader(): string {
  const icon = getCurrentTheme() === 'light' ? '🌙' : '☀️';
  return `
    <header class="header">
      <div class="container">
        <span class="header__logo" data-link="/">ЄДКІ 125</span>
        <nav class="header__nav">
          <a href="#/topics" class="header__link">Теми</a>
          <a href="#/tests" class="header__link">Тести</a>
          <button class="theme-toggle" id="theme-toggle">${icon}</button>
        </nav>
      </div>
    </header>
  `;
}

export function bindHeaderEvents(): void {
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    toggleTheme();
    const btn = document.querySelector('#theme-toggle');
    if (btn) btn.textContent = getCurrentTheme() === 'light' ? '🌙' : '☀️';
  });

  document.querySelector('.header__logo')?.addEventListener('click', () => {
    window.location.hash = '#/';
  });
}
