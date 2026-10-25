/**
 * Post-build step that makes the production build work on GitHub Pages.
 *
 * An Angular app is a single-page application: the client-side router handles
 * every route, so the server only ever needs to serve ONE html file. GitHub
 * Pages, however, answers with its own 404 page for any path it has no file
 * for. That breaks deep links - opening /AngularConceptsPlayground/interview
 * directly, or reloading on it, would show GitHub's 404 instead of the app.
 *
 * The standard fix: ship a copy of index.html as 404.html. Pages serves that
 * for unknown paths, the app boots normally, the router reads the URL from the
 * address bar and renders the right route. The URL never changes.
 *
 * Runs automatically as part of `npm run build`.
 *
 * (A .nojekyll file is deliberately not written: this project deploys with
 *  GitHub Actions, which uploads the built folder as an artifact and serves it
 *  verbatim - Jekyll never runs, so there is nothing to opt out of.)
 */
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const browserDir = join('dist', 'angular-concepts-playground', 'browser');
const indexHtml = join(browserDir, 'index.html');

if (!existsSync(indexHtml)) {
  console.error(`[spa-fallback] ${indexHtml} not found - did "ng build" run?`);
  process.exit(1);
}

copyFileSync(indexHtml, join(browserDir, '404.html'));
console.log('[spa-fallback] wrote 404.html - deep links will work on GitHub Pages');
