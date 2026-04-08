type RouteParams = Record<string, string>;
type RouteHandler = (params: RouteParams) => void;

interface Route {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
}

const routes: Route[] = [];

export function addRoute(path: string, handler: RouteHandler): void {
  const keys: string[] = [];
  const pattern = new RegExp(
    '^' + path.replace(/:(\w+)/g, (_, key) => {
      keys.push(key);
      return '([^/]+)';
    }) + '$'
  );
  routes.push({ pattern, keys, handler });
}

export function navigate(path: string): void {
  window.location.hash = '#' + path;
}

function matchRoute(hash: string): void {
  const path = hash.replace(/^#/, '') || '/';

  for (const route of routes) {
    const match = path.match(route.pattern);
    if (match) {
      const params: RouteParams = {};
      route.keys.forEach((key, i) => {
        try { params[key] = decodeURIComponent(match[i + 1]); } catch { params[key] = match[i + 1]; }
      });
      route.handler(params);
      return;
    }
  }

  navigate('/');
}

export function initRouter(): void {
  window.addEventListener('hashchange', () => {
    matchRoute(window.location.hash);
  });
  matchRoute(window.location.hash || '#/');
}
