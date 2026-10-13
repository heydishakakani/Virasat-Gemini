import { icon, HERO_ART, CHOOSE_ART, AUTH_ART, SEARCH_ART } from './icons.js';
import { ASSETS, STATUS, GUIDANCE, NOMINEE_NOTE, CATEGORIES } from './data.js';

/* ---------------------------------------------------------------
   State lives in memory only. Nothing the person types here is saved
   to the browser or sent anywhere (the AI panel redacts numbers too).
---------------------------------------------------------------- */
const state = {
  deceased: { name: '', dob: '', dod: '', aadhaar: '' },
  applicant: { aadhaar: '', otpSent: false, verified: false, method: 'otp' },
  relationship: '',
  confirmed: false,
  submitted: false,
  filter: 'all',
  detailTab: 'overview'
};
let timers = [];
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const view = $('#view');

const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const digits = (v) => String(v).replace(/\D/g, '');
const groups4 = (v) => digits(v).slice(0, 12).replace(/(\d{4})(?=\d)/g, '$1 ');
const maskAadhaar = (v) => `XXXX XXXX ${digits(v).slice(-4)}`;
const fmtDate = (iso) => (iso ? new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
const dname = () => state.deceased.name.trim() || 'your loved one';
const fill = (t) => t.replace('{name}', state.deceased.name.trim() || 'Deceased person');
const go = (path) => { location.hash = '#' + path; };
const hydrateIcons = (root = document) => $$('[data-icon]', root).forEach((el) => { el.outerHTML = icon(el.dataset.icon); });

/* ---------------- views ---------------- */
const views = {};

views.landing = () => `
<section class="hero"><div class="wrap">
  <div class="hero-grid">
    <div>
      <span class="hero-kicker">For families, in life’s toughest moments</span>
      <h1>Find what they left behind.</h1>
      <p class="lead">Virasat helps you discover your loved one’s financial and other assets, check nominee details, and get clear next steps, with simple guidance and AI support.</p>
      <div class="hero-actions">
        <button class="btn btn-primary" data-action="video"><span data-icon="play"></span>Watch our story</button>
        <a class="btn" href="#/start">Get started free <span data-icon="arrow"></span></a>
      </div>
    </div>
    <div class="hero-art">${HERO_ART}
      <button class="play" data-action="video" aria-label="Watch our story"><span data-icon="play"></span></button>
      <p class="hero-quote">Their journey continues through the people they leave behind.</p>
    </div>
  </div>
  <div class="benefits">
    ${[
      ['search', 'Discover', 'all associated assets'],
      ['doc', 'Check nominee', 'gaps and missing details'],
      ['bulb', 'Get clear next steps', 'in simple language'],
      ['lock', 'Your information', 'stays private']
    ].map(([i, a, b]) => `<div class="benefit"><span class="ico"><span data-icon="${i}"></span></span><div><b>${a}</b><span>${b}</span></div></div>`).join('')}
  </div>
</div></section>

<section class="block" id="how"><div class="wrap">
  <div class="section-head"><h2>From questions to clarity.</h2><p>Enter a few details, confirm who you are, and see every asset linked to your loved one with simple guidance on nominees and next steps.</p></div>
  <div class="steps">
    ${[
      ['usercheck', 'Enter details of the deceased person', 'Name, date of birth and Aadhaar number to begin the search.'],
      ['shield', 'Verify identity and authorization', 'Confirm you are an authorized family member before seeing any information.'],
      ['search', 'Discover associated assets', 'We look for bank accounts, investments, insurance, property and other holdings.'],
      ['doc', 'Check nominee status and next steps', 'See where nominees are missing and get a clear checklist of what to do next.']
    ].map(([i, t, p]) => `<div class="step"><span class="ico"><span data-icon="${i}"></span></span><h3>${t}</h3><p>${p}</p></div>`).join('')}
  </div>
</div></section>

<section class="block" id="assets"><div class="wrap">
  <div class="assets-head"><div class="section-head"><h2>Assets we help find</h2><p>Virasat looks across these categories to give you a complete view of your loved one’s holdings.</p></div></div>
  <div class="asset-grid">
    ${CATEGORIES.map((c) => `<div class="asset-tile"><span class="ico"><span data-icon="${c.icon}"></span></span><div><b>${c.title}</b><br><span>${c.sub || '&nbsp;'}</span></div></div>`).join('')}
  </div>

  <div class="promise" id="promise">
    <h2>Careful with what you share.</h2>
    <ul>
      <li><span data-icon="lock"></span><span>Details you enter stay in your browser tab while you use Virasat. Closing the tab clears them.</span></li>
      <li><span data-icon="shield"></span><span>We never ask for passwords or bank PINs, and we never contact a bank on your behalf.</span></li>
      <li><span data-icon="info"></span><span>Virasat AI sends only your question and asset names to Google’s Gemini. Numbers are removed first.</span></li>
    </ul>
  </div>
</div></section>

<section class="block" id="faq"><div class="wrap">
  <div class="section-head"><h2>Questions you might have</h2></div>
  <div class="faq" style="margin-top:22px">
    <details open><summary>What is a nominee, and does it make them the owner?</summary><p>${NOMINEE_NOTE}</p></details>
    <details><summary>Is my family’s information sent anywhere?</summary><p>Not by the steps in this demo. The one exception is Virasat AI: when you ask it a question, the question and asset names go to Google’s Gemini to write an answer. Aadhaar, PAN and account-style numbers are stripped out first.</p></details>
    <details><summary>Are the results real?</summary><p>Not yet. This version is a working prototype, so the assets shown after a search are sample data. A real search would need connections to banks, registrars and insurers.</p></details>
    <details><summary>Do I need an account?</summary><p>You can start a search without one. An account will let you save progress and come back to it.</p></details>
  </div>
  <div class="cta-band"><h2>Start with what you know.</h2><p>It takes about two minutes to enter the first details.</p><a class="btn btn-primary" href="#/start">Get started free <span data-icon="arrow"></span></a></div>
</div></section>`;

views.login = () => `
<div class="screen"><div class="wrap">
  <div class="card auth">
    <div class="auth-form">
      <h1>Welcome to Virasat</h1>
      <p class="sub">Continue to your family’s record.</p>
      <div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true">Log in</button><button class="tab" role="tab" aria-selected="false" data-action="goto" data-to="/login-signup">Sign up</button></div>
      <div class="demo-note"><span data-icon="info"></span><span>Prototype: there is no real sign-in yet. Any entry continues to the demo.</span></div>
      <form data-form="login" novalidate>
        <div class="field"><label for="lg">Email or mobile number</label><input class="input" id="lg" autocomplete="username" placeholder="Enter your email or mobile number"></div>
        <button class="btn btn-primary btn-block" type="submit">Continue</button>
      </form>
      <div class="divider">or continue with</div>
      <div class="sso"><button class="btn" data-action="goto" data-to="/start">Continue with Google</button><button class="btn" data-action="goto" data-to="/start">Continue with Microsoft</button></div>
    </div>
    <div class="auth-art">${AUTH_ART}<p>A little clarity today.<br>A more secure tomorrow.</p></div>
  </div>
</div></div>`;

views.start = () => `
<div class="screen"><div class="wrap"><div class="choose">
  <h1>How would you like to use Virasat?</h1>
  <p class="sub">Select an option to get started.</p>
  <button class="option" data-action="goto" data-to="/step1"><span class="ico"><span data-icon="usercheck"></span></span><span><b>Check a deceased person’s assets</b><span>Find financial and other assets associated with a loved one who has passed away.</span></span></button>
  <button class="option" disabled><span class="ico"><span data-icon="users"></span></span><span><b>Manage my family’s assets</b><span>Keep track of assets, nominees and important documents for your family.</span></span><span class="tag">Coming soon</span></button>
  <div class="choose-art">${CHOOSE_ART}</div>
</div></div></div>`;

const stepper = (n) => `
<div class="stepper" aria-label="Step ${n} of 3">
  ${['Basic details', 'Identity verification', 'Review & submit'].map((l, i) => {
    const k = i + 1; const cls = k < n ? 'done' : k === n ? 'on' : '';
    return `<div class="s ${cls}"><span class="dot">${k < n ? icon('check').replace('<svg', '<svg width="12" height="12"') : k}</span><span class="lbl">${l}</span></div>${k < 3 ? '<span class="bar"></span>' : ''}`;
  }).join('')}
</div>`;

const privacyBox = (t) => `<div class="privacy"><span data-icon="lock"></span><span>${t}</span></div>`;

views.step1 = () => `
<div class="screen"><div class="wrap"><div class="card wizard">
  ${stepper(1)}
  <h1>Let’s start with some basic details</h1>
  <p class="sub">Enter the information as it appears on official documents.</p>
  <form data-form="step1" novalidate>
    <div class="field"><label for="nm">Full name (as per Aadhaar)</label><input class="input" id="nm" name="name" autocomplete="off" value="${esc(state.deceased.name)}" placeholder="Enter full name"><span class="err" data-err="name"></span></div>
    <div class="row-2">
      <div class="field"><label for="dob">Date of birth</label><input class="input" id="dob" name="dob" type="date" value="${esc(state.deceased.dob)}"><span class="err" data-err="dob"></span></div>
      <div class="field"><label for="dod">Date of death <span class="hint">(if available)</span></label><input class="input" id="dod" name="dod" type="date" value="${esc(state.deceased.dod)}"><span class="err" data-err="dod"></span></div>
    </div>
    <div class="field"><label for="aad">Aadhaar number</label><input class="input" id="aad" name="aadhaar" inputmode="numeric" autocomplete="off" value="${esc(groups4(state.deceased.aadhaar))}" placeholder="12-digit Aadhaar number"><span class="err" data-err="aadhaar"></span></div>
    ${privacyBox('This information is used only to find and verify associated assets. It stays in this browser tab and is not shared with banks or third parties.')}
    <div class="form-actions"><button class="btn" type="button" data-action="goto" data-to="/start">Cancel</button><button class="btn btn-primary" type="submit">Continue <span data-icon="arrow"></span></button></div>
  </form>
</div></div></div>`;

views.step2 = () => {
  const a = state.applicant;
  const tab = (id, l) => `<button class="tab" role="tab" aria-selected="${a.method === id}" data-action="method" data-id="${id}">${l}</button>`;
  const body = a.method === 'otp' ? `
    <div class="demo-note"><span data-icon="info"></span><span>Prototype: no OTP is sent. After “Send OTP”, enter any 6 digits.</span></div>
    <form data-form="step2" novalidate>
      <div class="field"><label for="aa">Your Aadhaar number</label><input class="input" id="aa" name="aadhaar" inputmode="numeric" autocomplete="off" value="${esc(groups4(a.aadhaar))}" placeholder="XXXX XXXX XXXX" ${a.otpSent ? 'readonly' : ''}><span class="err" data-err="aadhaar"></span></div>
      ${a.otpSent ? `<div class="field"><label for="otp">Enter the 6-digit OTP</label><input class="input" id="otp" name="otp" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="••••••"><span class="err" data-err="otp"></span></div>` : ''}
      <button class="btn btn-primary btn-block" type="submit">${a.otpSent ? 'Verify and continue' : 'Send OTP'}</button>
      ${a.otpSent ? '<p style="text-align:center;margin-top:12px"><button class="next" type="button" data-action="resend">Try another number</button></p>' : ''}
    </form>` : `<div class="demo-note"><span data-icon="info"></span><span>This method is not part of the prototype yet. Use Aadhaar OTP to continue.</span></div>`;
  return `
<div class="screen"><div class="wrap"><div class="card wizard">
  ${stepper(2)}
  <h1>Verify your identity and authorization</h1>
  <p class="sub">Confirm that you are an authorized family member to access this information.</p>
  <div class="tabs" role="tablist">${tab('otp', 'Aadhaar OTP')}${tab('upload', 'Aadhaar upload')}${tab('other', 'Other documents')}</div>
  ${body}
  <div style="margin-top:18px">${privacyBox('We use secure verification. Your data is not shared with third parties without your consent.')}</div>
  <div class="form-actions"><button class="btn" type="button" data-action="goto" data-to="/step1">Back</button></div>
</div></div></div>`;
};

views.step3 = () => {
  const d = state.deceased;
  const rel = ['Spouse', 'Son', 'Daughter', 'Parent', 'Sibling', 'Other family member'];
  return `
<div class="screen"><div class="wrap"><div class="card wizard">
  ${stepper(3)}
  <h1>Review your information</h1>
  <p class="sub">Please confirm the details before we begin the search.</p>
  <div class="summary"><h3>Deceased person’s details <button data-action="goto" data-to="/step1">Edit</button></h3>
    <dl><dt>Name</dt><dd>${esc(d.name)}</dd><dt>Date of birth</dt><dd>${fmtDate(d.dob)}</dd><dt>Date of death</dt><dd>${fmtDate(d.dod)}</dd><dt>Aadhaar number</dt><dd>${maskAadhaar(d.aadhaar)}</dd></dl></div>
  <form data-form="step3" novalidate>
    <div class="summary"><h3>Your relationship and authorization <button type="button" data-action="goto" data-to="/step2">Edit</button></h3>
      <div style="padding:14px 18px 6px"><div class="field"><label for="rel">Your relationship</label>
        <select class="input" id="rel" name="rel"><option value="">Select relationship</option>${rel.map((r) => `<option ${state.relationship === r ? 'selected' : ''}>${r}</option>`).join('')}</select><span class="err" data-err="rel"></span></div>
        <dl style="padding:0 0 10px;grid-template-columns:140px 1fr"><dt>Verification</dt><dd>Aadhaar OTP (${maskAadhaar(state.applicant.aadhaar)})</dd></dl></div></div>
    <label class="check"><input type="checkbox" name="ok" ${state.confirmed ? 'checked' : ''}><span>I confirm that I am an authorized family member and the information I provided is accurate.</span></label><span class="err" data-err="ok"></span>
    <div class="form-actions"><button class="btn" type="button" data-action="goto" data-to="/step2">Back</button><button class="btn btn-primary" type="submit">Submit and start search</button></div>
  </form>
</div></div></div>`;
};

const SEARCH_STEPS = ['Checking bank accounts', 'Checking investments and mutual funds', 'Checking insurance schemes', 'Checking property and land records', 'Checking other financial assets'];
views.searching = () => `
<div class="screen"><div class="wrap"><div class="card searching">
  <div class="search-art pulse">${SEARCH_ART}</div>
  <h1>Searching for associated assets</h1>
  <p class="sub">This may take a few minutes. We are checking multiple sources to find assets linked to ${esc(dname())}.</p>
  <ul class="checklist" id="checklist">${SEARCH_STEPS.map((t) => `<li><span class="mk">${icon('check')}</span>${t}</li>`).join('')}</ul>
  <div class="assure"><span data-icon="lock"></span><span>Prototype: this is a short simulation and the results are sample data. You can safely close this page.</span></div>
  <div class="form-actions" style="margin-top:18px;justify-content:center"><button class="btn btn-sm" data-action="goto" data-to="/start">Cancel search</button></div>
</div></div></div>`;

const statusChip = (s) => `<span class="status ${s}">${STATUS[s].label}</span>`;
const count = (s) => ASSETS.filter((a) => a.status === s).length;

views.results = () => {
  const list = ASSETS.filter((a) => state.filter === 'all' || a.status === state.filter);
  const f = (id, l, n) => `<button class="chip-filter" aria-pressed="${state.filter === id}" data-action="filter" data-id="${id}">${l} (${n})</button>`;
  return `
<div class="screen"><div class="wrap">
  <div class="demo-note"><span data-icon="info"></span><span>These are sample results for the prototype. A real search would query banks, registrars and insurers.</span></div>
  <div class="results-head"><div><h1>We found <em>${ASSETS.length}</em> associated assets</h1><p>Linked to ${esc(dname())}. Please review the details below.</p></div></div>
  <div class="kpis">
    <div class="kpi"><div><div class="n">${ASSETS.length}</div><div class="t">Total assets</div></div></div>
    <div class="kpi missing"><span class="kico">${icon('warn')}</span><div><div class="n">${count('missing')}</div><div class="t">Nominee missing</div></div></div>
    <div class="kpi review"><span class="kico">${icon('info')}</span><div><div class="n">${count('review')}</div><div class="t">Need review</div></div></div>
    <div class="kpi good"><span class="kico">${icon('check')}</span><div><div class="n">${count('present')}</div><div class="t">All good</div></div></div>
  </div>
  <div class="filters">${f('all', 'All', ASSETS.length)}${f('missing', 'Nominee missing', count('missing'))}${f('review', 'Need review', count('review'))}${f('present', 'All good', count('present'))}</div>
  <div class="card table-card"><table class="assets">
    <thead><tr><th>Asset</th><th>Type</th><th>Nominee status</th><th>Next step</th></tr></thead>
    <tbody>${list.map((a) => `<tr>
      <td><div class="asset-name"><span class="ico">${icon(a.icon)}</span>${a.name}</div></td>
      <td data-l="Type">${a.type}</td>
      <td data-l="Nominee">${statusChip(a.status)}</td>
      <td><button class="next" data-action="goto" data-to="/asset/${a.id}">${a.status === 'present' ? 'View details' : a.status === 'missing' ? 'Add nominee details' : 'Review details'}</button></td></tr>`).join('') || '<tr><td colspan="4" class="empty">Nothing in this group.</td></tr>'}</tbody>
  </table></div>
</div></div>`;
};

views.asset = (id) => {
  const a = ASSETS.find((x) => x.id === id);
  if (!a) return `<div class="screen"><div class="wrap"><p>That asset was not found. <a href="#/results">Back to results</a></p></div></div>`;
  const tabs = [['overview', 'Overview'], ['nominee', 'Nominee'], ['documents', 'Documents']];
  const tabBtn = ([k, l]) => `<button class="tab" role="tab" aria-selected="${state.detailTab === k}" data-action="dtab" data-id="${k}">${l}</button>`;
  const panels = {
    overview: `<dl class="kv">${Object.entries(a.kv).map(([k, v]) => `<dt>${k}</dt><dd>${esc(fill(v))}</dd>`).join('')}</dl>`,
    nominee: a.nominee
      ? `<dl class="kv"><dt>Nominee</dt><dd>${esc(a.nominee.name)}</dd><dt>Relationship</dt><dd>${esc(a.nominee.relationship)}</dd><dt>Status</dt><dd>${statusChip(a.status)}</dd></dl><p style="margin-top:16px;font-size:.88rem;color:var(--ink-soft)">${NOMINEE_NOTE}</p>`
      : `<p><b>No nominee found on record.</b></p><p style="margin-top:10px;color:var(--ink-soft);font-size:.92rem">${NOMINEE_NOTE}</p>`,
    documents: `<ul class="docs">${a.docs.map((d) => `<li>${icon('doc')}<span>${d}</span></li>`).join('')}</ul>`
  };
  return `
<div class="screen"><div class="wrap">
  <button class="back" data-action="goto" data-to="/results">← Back to results</button>
  <div class="card detail-head"><span class="ico">${icon(a.icon)}</span><div><h1>${a.name}</h1><div class="meta">${a.type}</div></div>${statusChip(a.status)}</div>
  <div class="detail-grid">
    <div class="card panel"><div class="tabs" role="tablist" style="margin-top:0">${tabs.map(tabBtn).join('')}</div>${panels[state.detailTab]}</div>
    <div class="card panel guidance"><h2>What to do next</h2>
      <ol>${GUIDANCE[a.status].map((t) => `<li>${t.replace('{where}', a.where)}</li>`).join('')}</ol>
      <button class="btn btn-primary btn-sm" data-action="ask-asset" data-id="${a.id}"><span data-icon="spark"></span>Ask Virasat AI about this</button>
    </div>
  </div>
</div></div>`;
};

/* ---------------- router ---------------- */
function clearTimers() { timers.forEach(clearTimeout); timers = []; }

function render() {
  clearTimers();
  const hash = location.hash.replace(/^#/, '') || '/';
  const [, root, arg] = hash.split('/');
  const needs1 = !state.deceased.name || !digits(state.deceased.aadhaar) || digits(state.deceased.aadhaar).length !== 12;
  let html; let scrollTo = null;

  switch (root || '') {
    case '': case 'how': case 'assets': case 'resources': case 'about': case 'privacy':
      html = views.landing();
      scrollTo = { how: 'how', assets: 'assets', resources: 'faq', about: 'promise', privacy: 'promise' }[root] || null;
      break;
    case 'login': case 'login-signup': html = views.login(); break;
    case 'start': html = views.start(); break;
    case 'step1': html = views.step1(); break;
    case 'step2': if (needs1) return go('/step1'); html = views.step2(); break;
    case 'step3': if (needs1) return go('/step1'); if (!state.applicant.verified) return go('/step2'); html = views.step3(); break;
    case 'searching': if (!state.submitted) return go('/step3'); html = views.searching(); break;
    case 'results': if (!state.submitted) return go('/start'); html = views.results(); break;
    case 'asset': if (!state.submitted) return go('/start'); html = views.asset(arg); break;
    default: html = views.landing();
  }
  view.innerHTML = html;
  hydrateIcons(view);
  if (root === 'searching') runSearch();
  if (scrollTo) requestAnimationFrame(() => document.getElementById(scrollTo)?.scrollIntoView({ block: 'start' }));
  else { window.scrollTo(0, 0); view.focus({ preventScroll: true }); }
  $('#nav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false');
  aiChipsRefresh();
}

function runSearch() {
  const items = $$('#checklist li');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step = reduce ? 250 : 1100;
  items.forEach((li, i) => {
    timers.push(setTimeout(() => { li.classList.add('now'); }, i * step));
    timers.push(setTimeout(() => { li.classList.remove('now'); li.classList.add('done'); }, i * step + step * 0.85));
  });
  timers.push(setTimeout(() => go('/results'), items.length * step + 500));
}

/* ---------------- forms & actions ---------------- */
function setErr(form, field, msg) {
  const e = $(`[data-err="${field}"]`, form); if (e) e.textContent = msg || '';
  const i = form.elements[field]; if (i && i.setAttribute) { msg ? i.setAttribute('aria-invalid', 'true') : i.removeAttribute('aria-invalid'); }
}

document.addEventListener('input', (e) => {
  if (e.target.name === 'aadhaar') { const p = e.target.selectionStart; e.target.value = groups4(e.target.value); }
  if (e.target.name === 'otp') e.target.value = digits(e.target.value).slice(0, 6);
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form]'); if (!form) return;
  e.preventDefault();
  const kind = form.dataset.form; const f = form.elements;
  if (kind === 'login') return go('/start');

  if (kind === 'step1') {
    let ok = true; const today = new Date().toISOString().slice(0, 10);
    const name = f.name.value.trim();
    const check = (field, bad, msg) => { setErr(form, field, bad ? msg : ''); if (bad) ok = false; };
    check('name', name.length < 2 || !/^[\p{L}][\p{L}\s.'-]+$/u.test(name), 'Enter the full name using letters only.');
    check('dob', !f.dob.value || f.dob.value > today, 'Enter a valid date of birth.');
    check('dod', f.dod.value && (f.dod.value > today || f.dod.value < f.dob.value), 'Date of death must be after birth and not in the future.');
    check('aadhaar', digits(f.aadhaar.value).length !== 12, 'Enter all 12 digits of the Aadhaar number.');
    if (!ok) return form.querySelector('[aria-invalid="true"]')?.focus();
    Object.assign(state.deceased, { name, dob: f.dob.value, dod: f.dod.value, aadhaar: digits(f.aadhaar.value) });
    return go('/step2');
  }

  if (kind === 'step2') {
    const a = state.applicant;
    if (!a.otpSent) {
      if (digits(f.aadhaar.value).length !== 12) { setErr(form, 'aadhaar', 'Enter all 12 digits of your Aadhaar number.'); return f.aadhaar.focus(); }
      a.aadhaar = digits(f.aadhaar.value); a.otpSent = true; render(); return $('#otp')?.focus();
    }
    if (digits(f.otp.value).length !== 6) { setErr(form, 'otp', 'Enter the 6-digit OTP.'); return f.otp.focus(); }
    a.verified = true; return go('/step3');
  }

  if (kind === 'step3') {
    let ok = true;
    if (!f.rel.value) { setErr(form, 'rel', 'Select your relationship.'); ok = false; } else setErr(form, 'rel', '');
    const box = f.ok; const err = $('[data-err="ok"]', form);
    if (!box.checked) { err.textContent = 'Please confirm before starting the search.'; ok = false; } else err.textContent = '';
    if (!ok) return;
    state.relationship = f.rel.value; state.confirmed = true; state.submitted = true;
    return go('/searching');
  }
});

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-action]'); if (!t) return;
  const act = t.dataset.action;
  if (act === 'goto') return go(t.dataset.to);
  if (act === 'method') { state.applicant.method = t.dataset.id; return render(); }
  if (act === 'resend') { state.applicant.otpSent = false; return render(); }
  if (act === 'filter') { state.filter = t.dataset.id; return render(); }
  if (act === 'dtab') { state.detailTab = t.dataset.id; return render(); }
  if (act === 'video') return openVideo();
  if (act === 'ask-asset') {
    const a = ASSETS.find((x) => x.id === t.dataset.id);
    openAI(); return ask(`What should I do next for the ${a.name}? Its nominee status is: ${STATUS[a.status].label.toLowerCase()}.`);
  }
});

/* header */
const header = $('#siteHeader');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 6), { passive: true });
$('#menuBtn').addEventListener('click', () => {
  const open = $('#nav').classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', String(open));
});

/* video dialog */
async function openVideo() {
  const dlg = $('#videoDlg'); const body = $('#videoBody');
  let ok = false;
  try { ok = (await fetch('/media/story.mp4', { method: 'HEAD' })).ok; } catch { /* offline */ }
  body.innerHTML = ok
    ? '<video controls autoplay playsinline src="/media/story.mp4"></video>'
    : '<div class="fallback"><p><b>Your story video goes here.</b></p><p style="margin-top:8px">Add a file named <code>story.mp4</code> to <code>public/media/</code> and it will play in this window.</p></div>';
  body.insertAdjacentHTML('beforeend', '<div class="form-actions" style="margin-top:14px"><button class="btn btn-sm" data-close>Close</button></div>');
  dlg.showModal();
}
$('#videoDlg').addEventListener('click', (e) => {
  if (e.target.matches('[data-close]') || e.target === e.currentTarget) { $('#videoBody video')?.pause(); e.currentTarget.close(); }
});

/* ---------------- Virasat AI ---------------- */
const ai = $('#ai'); const log = $('#aiLog'); const input = $('#aiInput'); const sendBtn = $('#aiSend');
let aiStarted = false;
const NUM_RE = /(?<!\d)\d(?:[\s-]?\d){7,}(?!\d)/g;     // 8+ digits, even if spaced: Aadhaar, phone, account
const PAN_RE = /\b[A-Z]{5}\d{4}[A-Z]\b/gi;

function redact(q) {
  const out = q.replace(NUM_RE, '[number removed]').replace(PAN_RE, '[ID removed]');
  return { text: out, changed: out !== q };
}
function bubble(text, cls) {
  const d = document.createElement('div'); d.className = 'msg ' + cls; d.textContent = text; log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
}
function aiChipsRefresh() {
  $('#aiChips').innerHTML = ['What is a nominee?', 'What documents are required?', 'How to claim a bank account?', 'What if there is no nominee?']
    .map((q) => `<button type="button">${q}</button>`).join('');
}
async function loadQuota() {
  try { const u = await (await fetch('/api/usage')).json(); $('#aiQuota').textContent = u.mock ? 'Demo mode: sample answers' : `${u.remaining} AI answers left today`; }
  catch { $('#aiQuota').textContent = 'AI server not running'; }
}
function openAI() {
  ai.classList.add('open'); $('#aiOpen').style.display = 'none';
  if (!aiStarted) { aiStarted = true; bubble('Hi, I’m Virasat AI. I can help with general information about assets, nominees and next steps. How can I help you today?', 'bot'); loadQuota(); }
  input.focus();
}
function closeAI() { ai.classList.remove('open'); $('#aiOpen').style.display = ''; $('#aiOpen').focus(); }
$('#aiOpen').addEventListener('click', openAI);
$('#aiClose').addEventListener('click', closeAI);
ai.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAI(); });
$('#aiChips').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) ask(b.textContent); });
$('#aiForm').addEventListener('submit', (e) => { e.preventDefault(); const q = input.value.trim(); if (q) { input.value = ''; ask(q); } });

async function ask(raw) {
  const { text, changed } = redact(raw);
  bubble(text, 'me');
  if (changed) bubble('I removed a long number from your message. Please don’t share ID or account numbers here.', 'bot');
  sendBtn.disabled = true;
  const wait = bubble('Thinking…', 'bot');
  const assets = state.submitted ? ASSETS.map((a) => ({ name: a.name, nominee: STATUS[a.status].nominee })) : [];
  try {
    const r = await fetch('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: text, assets }) });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) { wait.className = 'msg err'; wait.textContent = data.error || 'Something went wrong. Try again.'; }
    else { wait.textContent = data.answer; if (data.mock) $('#aiQuota').textContent = 'Demo mode: sample answers'; else $('#aiQuota').textContent = `${data.cached ? 'Saved answer, no quota used · ' : ''}${data.remaining} AI answers left today`; }
  } catch {
    wait.className = 'msg err'; wait.textContent = 'Can’t reach the Virasat server. Run npm start and open http://localhost:3000.';
  } finally { sendBtn.disabled = false; log.scrollTop = log.scrollHeight; }
}

/* boot */
hydrateIcons(document);
addEventListener('hashchange', render);
render();
