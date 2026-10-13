// Landing page markup (Evernote edition). Styles live in css/landing.css under .lp.
export const LANDING = `<div class="lp">
<section class="hero">
  <h1>Every asset, checked for a nominee</h1>
  <p>List what your family member owned. Virasat routes each asset through a nominee check and tells you exactly what to do next.</p>
  <div class="hero-actions">
    <a class="btn-primary" href="#/start">Start asset review</a>
    <div class="alt">Already reviewing? <a href="#/login">Log in</a></div>
  </div>
</section>

<div class="shot-wrap reveal" id="screenshot">
  <div class="shot">
    <div class="shot-bar">
      <div class="crumb">&#128220; Family assets</div>
      <span class="sep">/</span>
      <div class="crumb">Nominee review</div>
    </div>
    <div class="shot-body">
      <div class="shot-side">
        <div class="si active">&#128220; All assets</div>
        <div class="si">&#9989; Nominee set</div>
        <div class="si">&#10060; Missing nominee</div>
        <div class="si">&#10067; Unknown</div>
        <div class="si">&#128274; Privacy</div>
      </div>
      <div class="shot-main">
        <h3>Family assets · 5 listed</h3>
        <div class="asset-row"><div class="name"><span class="icon">&#127974;</span>Bank account — HDFC savings</div><span class="status yes">Nominee set</span></div>
        <div class="asset-row"><div class="name"><span class="icon">&#128200;</span>Mutual fund — SBI Bluechip</div><span class="status no">Missing nominee</span></div>
        <div class="asset-row"><div class="name"><span class="icon">&#128737;&#65039;</span>Insurance — LIC policy</div><span class="status yes">Nominee set</span></div>
        <div class="asset-row"><div class="name"><span class="icon">&#127968;</span>Property — Family home</div><span class="status unknown">Unknown</span></div>
        <div class="asset-row"><div class="name"><span class="icon">&#128188;</span>Provident fund</div><span class="status yes">Nominee set</span></div>
      </div>
    </div>
  </div>
</div>

<div class="strip reveal">
  <div class="si-item"><div class="si-icon">&#128220;</div><span>One list, every asset</span></div>
  <div class="si-item"><div class="si-icon">&#9989;</div><span>Plain yes / no / unknown</span></div>
  <div class="si-item"><div class="si-icon">&#128274;</div><span>Private by default</span></div>
  <div class="si-item"><div class="si-icon">&#9200;</div><span>Ten minutes to start</span></div>
</div>

<div id="features">
  <div class="feat-row reveal">
    <div class="feat-copy">
      <span class="tag">Clarity</span>
      <h2>Nominee status, made clear</h2>
      <p>Every asset you add gets a plain yes, no, or unknown, so you know at a glance what's straightforward and what needs more paperwork. No more digging through statements to find out.</p>
    </div>
    <div class="feat-visual">
      <div class="fv-title">Nominee status</div>
      <div class="fv-item yes"><span>Bank account</span><span class="sdot"></span></div>
      <div class="fv-item no"><span>Mutual fund</span><span class="sdot"></span></div>
      <div class="fv-item unknown"><span>Property</span><span class="sdot"></span></div>
      <div class="fv-item yes"><span>Insurance</span><span class="sdot"></span></div>
    </div>
  </div>

  <div class="feat-row rev reveal">
    <div class="feat-copy">
      <span class="tag">Privacy</span>
      <h2>Private by default</h2>
      <p>Nothing you enter here is submitted to a bank, registrar, or government body. It stays yours until you choose to act on it — Virasat is a private worksheet, not a filing system.</p>
    </div>
    <div class="feat-visual lock-visual">
      <div class="lock-icon">&#128274;</div>
      <p>Your family's records stay on your list, not on a server anyone else can query.</p>
    </div>
  </div>
</div>

<div class="grid3 reveal">
  <div class="card">
    <div class="ic">&#128220;</div>
    <h3>One list, every asset</h3>
    <p>Bank accounts, mutual funds, insurance, property. Add them all in one place instead of piecing it together across institutions.</p>
  </div>
  <div class="card">
    <div class="ic">&#9989;</div>
    <h3>Nominee status, made clear</h3>
    <p>A plain yes, no, or unknown for every asset — so you know exactly where more paperwork is needed.</p>
  </div>
  <div class="card">
    <div class="ic">&#128274;</div>
    <h3>Private by default</h3>
    <p>Nothing is submitted anywhere automatically. It stays yours until you decide to act on it.</p>
  </div>
</div>

<div class="faq reveal" id="faq">
  <h2>Questions you might have</h2>
  <details open>
    <summary>Is my family's financial data sent anywhere?<span class="plus">+</span></summary>
    <p>Virasat never submits what you enter to a bank, registrar, insurer, or government body. The one exception is the optional Virasat AI help panel: when you use it, your question and the names of your listed assets are sent to Google&rsquo;s Gemini to write an answer, with ID and account-style numbers removed first.</p>
  </details>
  <details>
    <summary>What kinds of assets can I add?<span class="plus">+</span></summary>
    <p>Bank accounts, mutual funds, insurance policies, property, and other holdings — anything a family member owned that now needs a nominee check.</p>
  </details>
  <details>
    <summary>What does a "nominee check" actually tell me?<span class="plus">+</span></summary>
    <p>For each asset, Virasat gives a plain yes, no, or unknown for whether a nominee is on file, so you immediately see what's straightforward and what needs follow-up paperwork.</p>
  </details>
  <details>
    <summary>How long does it take to set up?<span class="plus">+</span></summary>
    <p>Most families list their first few assets in under ten minutes. You can add more as you find them — there's no need to have everything at once.</p>
  </details>
  <details>
    <summary>Do I need an account to try it?<span class="plus">+</span></summary>
    <p>You can start an asset review right away. Creating an account just lets you save your progress and come back to it later.</p>
  </details>
</div>

<div class="cta-band reveal">
  <h2>Start sorting out the estate</h2>
  <p>List the first asset in under two minutes — no account required to begin.</p>
  <a class="btn-primary" href="#/start">Start asset review</a>
</div>

</div>`;
