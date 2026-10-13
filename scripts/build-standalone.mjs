// Builds standalone/virasat-guided.html: one file with CSS and JS inlined, so it opens by double-click.
// (The AI panel still needs the local server; without it the panel says so.)
import { build } from 'esbuild';
import fs from 'node:fs';

const js = (await build({ entryPoints: ['public/js/app.js'], bundle: true, format: 'iife', write: false })).outputFiles[0].text;
const css = fs.readFileSync('public/css/app.css', 'utf8');
let html = fs.readFileSync('public/guided.html', 'utf8');
html = html
  .replace('<link rel="stylesheet" href="/css/app.css">', `<style>\n${css}\n</style>`)
  .replace('<script src="/js/app.js" type="module"></script>', () => `<script>\n${js.replace(/<\/script>/g, '<\\/script>')}\n</script>`);
fs.writeFileSync('standalone/virasat-guided.html', html);
console.log('standalone/virasat-guided.html', Math.round(html.length / 1024) + ' KB');
