// Builds two single-file pages in standalone/ that open by double-click and link to each other:
//   virasat-landing.html  (the Evernote-style landing page)
//   virasat-guided.html   (the guided flow)
// Keep both files in the same folder. Virasat AI / Ask Virasat still need the local server.
import { build } from 'esbuild';
import fs from 'node:fs';

const js = (await build({ entryPoints: ['public/js/app.js'], bundle: true, format: 'iife', write: false })).outputFiles[0].text;
const css = fs.readFileSync('public/css/app.css', 'utf8');

let guided = fs.readFileSync('public/guided.html', 'utf8')
  .replace('<link rel="stylesheet" href="/css/app.css">', () => `<style>\n${css}\n</style>`)
  .replace('<script src="/js/app.js" type="module"></script>', () => `<script>\n${js.replace(/<\/script>/g, '<\\/script>')}\n</script>`)
  .replace(/href="\/(#[^"]*)?"/g, (_, h = '') => `href="virasat-landing.html${h}"`);

const landing = fs.readFileSync('public/index.html', 'utf8').replaceAll('/guided.html#/start', 'virasat-guided.html#/start');

fs.mkdirSync('standalone', { recursive: true });
fs.rmSync('standalone/virasat.html', { force: true });
fs.writeFileSync('standalone/virasat-guided.html', guided);
fs.writeFileSync('standalone/virasat-landing.html', landing);
console.log('built standalone/virasat-landing.html and virasat-guided.html');
