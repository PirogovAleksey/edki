const STORAGE_KEY = 'edki-theme';

type Theme = 'light' | 'dark';

function getStoredTheme(): Theme {
  return (localStorage.getItem(STORAGE_KEY) as Theme) || 'light';
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function initTheme(): void {
  applyTheme(getStoredTheme());
}

export function toggleTheme(): void {
  const current = getStoredTheme();
  applyTheme(current === 'light' ? 'dark' : 'light');
}

export function getCurrentTheme(): Theme {
  return getStoredTheme();
}
