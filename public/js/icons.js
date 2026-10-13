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
