// Inline SVG icons (24x24, stroke-based) and the larger illustrations.
const s = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;

export const ICONS = {
  logo: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 29V13" stroke="#12453a" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M16 15C9 15 5 10 5 4c7 0 11 4 11 11Z" fill="#12453a"/><path d="M16 19c6 0 11-4 11-11-7 0-11 4-11 11Z" fill="#2c7a4d"/><path d="M16 24c-4 0-8-2-9-7 5 0 8 3 9 7Z" fill="#7bb08d"/></svg>`,
  arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  play: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>`,
  spark: s('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>'),
  send: s('<path d="M4 12l16-8-6 16-2-7z"/>'),
  search: s('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>'),
  doc: s('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>'),
  bulb: s('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
  lock: s('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  bank: s('<path d="M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>'),
  chart: s('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  shield: s('<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>'),
  person: s('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>'),
  home: s('<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>'),
  gov: s('<path d="M3 20h18M5 20V10M19 20V10M9 20V10M15 20V10M12 3l9 5H3z"/>'),
  trend: s('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),
  grid: s('<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>'),
  check: s('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 'stroke-width="2.4"'),
  warn: s('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.5v.01"/>'),
  info: s('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>'),
  users: s('<circle cx="9" cy="8.5" r="3"/><path d="M3 19c.6-3 3-4.6 6-4.6s5.4 1.600 6 4.600"/><circle cx="17" cy="9.500" r="2.300"/><path d="M17 14.200c2.200 0 3.600 1.300 4 3.800"/>'),
  usercheck: s('<circle cx="10" cy="8" r="3.500"/><path d="M3.500 20c.7-3.600 3.200-5.500 6.500-5.500"/><path d="M15 17l2 2 4-4"/>'),
  insurance: s('<path d="M12 21s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 11c0 5.500-7 10-7 10z"/>'),
  wallet: s('<rect x="3" y="6" width="18" height="13" rx="2.500"/><path d="M3 10h18M16 14.500h2"/>'),
  folder: s('<path d="M3 7a2 2 0 0 1 2-2h4l2 2.500h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')
};

export const icon = (n) => ICONS[n] || '';

// Hero: an arched window onto a river pavilion at first light. Drawn, not photographed,
// so the page works before real photography or the story video is added.
export const HERO_ART = `
<svg viewBox="0 0 400 440" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a riverside pavilion at sunrise">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d9a2"/><stop offset=".55" stop-color="#f0bf8b"/><stop offset="1" stop-color="#e8a577"/></linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a98a"/><stop offset="1" stop-color="#9c8a6a"/></linearGradient>
    <radialGradient id="sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6dc"/><stop offset="1" stop-color="#fff6dc" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="400" height="440" fill="url(#sky)"/>
  <circle cx="250" cy="170" r="120" fill="url(#sun)"/>
  <circle cx="250" cy="175" r="30" fill="#fff3d0"/>
  <g fill="#b88a68" opacity=".55"><path d="M0 250 L70 215 L120 240 L190 205 L260 245 L330 215 L400 240 V300 H0Z"/></g>
  <g fill="#8d6a52">
    <rect x="95" y="228" width="210" height="16"/>
    <rect x="105" y="212" width="190" height="18"/>
    <path d="M200 150 c-26 0 -42 22 -42 62 h84 c0 -40 -16 -62 -42 -62Z"/>
    <rect x="198" y="132" width="4" height="20"/>
    <path d="M128 196 c-12 0 -19 10 -19 24 h38 c0 -14 -7 -24 -19 -24Z"/>
    <path d="M272 196 c-12 0 -19 10 -19 24 h38 c0 -14 -7 -24 -19 -24Z"/>
  </g>
  <g fill="#f0c9a0" opacity=".9"><path d="M182 244v-26a18 18 0 0 1 36 0v26z"/><path d="M122 244v-18a10 10 0 0 1 20 0v18z"/><path d="M258 244v-18a10 10 0 0 1 20 0v18z"/></g>
  <rect y="244" width="400" height="120" fill="url(#water)"/>
  <g stroke="#fff3d0" stroke-width="2" opacity=".5" stroke-linecap="round"><path d="M150 262h100M170 276h60M130 290h140"/></g>
  <g fill="#8d6a52" opacity=".35"><rect x="105" y="246" width="190" height="10"/></g>
  <rect y="352" width="400" height="90" fill="#e9d6ae"/>
  <g fill="#3d7a52"><ellipse cx="46" cy="400" rx="14" ry="46" transform="rotate(-24 46 400)"/><ellipse cx="78" cy="410" rx="12" ry="40" transform="rotate(14 78 410)"/><ellipse cx="22" cy="420" rx="12" ry="38" transform="rotate(-48 22 420)"/></g>
  <g fill="#2c6a47"><ellipse cx="352" cy="400" rx="14" ry="48" transform="rotate(26 352 400)"/><ellipse cx="324" cy="414" rx="11" ry="38" transform="rotate(-16 324 414)"/><ellipse cx="378" cy="418" rx="12" ry="36" transform="rotate(46 378 418)"/></g>
</svg>`;

export const CHOOSE_ART = `
<svg viewBox="0 0 680 190" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a river and pavilion">
  <defs><linearGradient id="cs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dcaa"/><stop offset="1" stop-color="#eebf8f"/></linearGradient></defs>
  <rect width="680" height="190" fill="url(#cs)"/>
  <circle cx="470" cy="70" r="26" fill="#fff3d0"/>
  <g fill="#9a7458"><rect x="250" y="82" width="180" height="12"/><path d="M340 40c-22 0-36 18-36 42h72c0-24-14-42-36-42z"/><rect x="338" y="26" width="4" height="16"/><path d="M276 62c-10 0-16 9-16 20h32c0-11-6-20-16-20zM404 62c-10 0-16 9-16 20h32c0-11-6-20-16-20z"/></g>
  <rect y="94" width="680" height="96" fill="#d9ad8c"/>
  <g stroke="#fff3d0" stroke-width="2" opacity=".5" stroke-linecap="round"><path d="M270 112h140M300 128h80M240 144h200"/></g>
  <g fill="#2f6e4a"><ellipse cx="40" cy="170" rx="14" ry="44" transform="rotate(-20 40 170)"/><ellipse cx="640" cy="170" rx="14" ry="44" transform="rotate(22 640 170)"/></g>
</svg>`;

export const AUTH_ART = `
<svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <rect width="300" height="380" fill="#efdcae"/>
  <circle cx="210" cy="90" r="46" fill="#fbecc4"/>
  <g fill="#3d7a52"><ellipse cx="60" cy="300" rx="20" ry="70" transform="rotate(-18 60 300)"/><ellipse cx="108" cy="318" rx="16" ry="58" transform="rotate(14 108 318)"/><ellipse cx="24" cy="330" rx="16" ry="54" transform="rotate(-44 24 330)"/></g>
  <g fill="#2c6a47"><ellipse cx="240" cy="320" rx="18" ry="62" transform="rotate(20 240 320)"/><ellipse cx="282" cy="336" rx="14" ry="48" transform="rotate(-10 282 336)"/></g>
  <rect x="104" y="318" width="110" height="46" rx="6" fill="#b9825a"/><rect x="116" y="296" width="92" height="30" rx="5" fill="#d39a6d"/>
</svg>`;

export const SEARCH_ART = `
<svg viewBox="0 0 150 130" aria-hidden="true">
  <g fill="#7bb08d"><ellipse cx="26" cy="92" rx="9" ry="30" transform="rotate(-26 26 92)"/><ellipse cx="124" cy="92" rx="9" ry="30" transform="rotate(26 124 92)"/><ellipse cx="44" cy="100" rx="7" ry="22" transform="rotate(10 44 100)"/></g>
  <rect x="42" y="30" width="60" height="76" rx="6" fill="#fffdf8" stroke="#e7dcc3" stroke-width="2"/>
  <path d="M52 48h30M52 60h40M52 72h26" stroke="#d6caa9" stroke-width="3" stroke-linecap="round"/>
  <circle cx="92" cy="78" r="20" fill="#fffdf8" fill-opacity=".7" stroke="#12453a" stroke-width="4"/>
  <path d="M106 93l16 16" stroke="#12453a" stroke-width="5" stroke-linecap="round"/>
</svg>`;
