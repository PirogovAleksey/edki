import { initTheme } from './theme';
import { addRoute, initRouter } from './router';
import { renderHeader, bindHeaderEvents } from './components/header';
import { renderHome } from './pages/home';
import { renderTopics } from './pages/topics';
import { renderTopic } from './pages/topic';
import { renderTestSelect } from './pages/test-select';
import { startTest, cleanupTest } from './pages/test';

const app = document.getElementById('app')!;

function setPage(html: string): void {
  cleanupTest();
  app.innerHTML = renderHeader() + '<main id="page-content">' + html + '</main>';
  bindHeaderEvents();
}

async function setPageAsync(htmlPromise: Promise<string>): Promise<void> {
  cleanupTest();
  app.innerHTML = renderHeader() + '<main id="page-content"><div class="page"><div class="container"><p>Завантаження...</p></div></div></main>';
  bindHeaderEvents();
  const html = await htmlPromise;
  document.getElementById('page-content')!.innerHTML = html;
}

// Routes
addRoute('/', () => setPage(renderHome()));
addRoute('/topics', () => setPage(renderTopics()));
addRoute('/topic/:id', (params) => setPageAsync(renderTopic(params.id)));
addRoute('/tests', () => setPage(renderTestSelect()));
addRoute('/test/:id/:mode', async (params) => {
  cleanupTest();
  app.innerHTML = renderHeader() + '<main id="page-content"><div class="page"><div class="container"><p>Завантаження...</p></div></div></main>';
  bindHeaderEvents();
  await startTest(params.id, params.mode as 'training' | 'exam');
});

// Init
initTheme();
initRouter();
