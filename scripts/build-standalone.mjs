// Builds standalone/virasat.html: the whole site (landing page + guided flow) as ONE file
// that opens by double-click. Only Virasat AI needs the local server (npm run dev / npm start).
import { build } from 'esbuild';
import fs from 'node:fs';

const js = (await build({ entryPoints: ['public/js/app.js'], bundle: true, format: 'iife', write: false })).outputFiles[0].text;
const css = ['public/css/app.css', 'public/css/landing.css'].map((f) => fs.readFileSync(f, 'utf8')).join('\n');
const html = fs.readFileSync('public/index.html', 'utf8')
  .replace('<link rel="stylesheet" href="/css/app.css">', () => `<style>\n${css}\n</style>`)
  .replace('<link rel="stylesheet" href="/css/landing.css">', '')
  .replace('<script src="/js/app.js" type="module"></script>', () => `<script>\n${js.replace(/<\/script>/g, '<\\/script>')}\n</script>`);

fs.mkdirSync('standalone', { recursive: true });
for (const old of ['virasat-guided.html', 'virasat-landing.html']) fs.rmSync('standalone/' + old, { force: true });
fs.writeFileSync('standalone/virasat.html', html);
console.log('built standalone/virasat.html', Math.round(html.length / 1024) + ' KB');
