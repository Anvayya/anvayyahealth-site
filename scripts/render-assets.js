// One-off asset renderer: rasterizes the favicon SVG and the OG social-share
// card to PNG using headless Chromium (Playwright). Not part of the site
// runtime — run manually with `node scripts/render-assets.js` if the brand
// mark ever changes.
const path = require('path');
const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');

const ASSETS = path.join(__dirname, '..', 'assets');

const faviconSvg = require('fs').readFileSync(path.join(ASSETS, 'favicon.svg'), 'utf8');

const ogHtml = `
<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face { font-family: 'serif-fallback'; src: local('Georgia'); }
  html,body{margin:0;padding:0;}
  .card{
    width:1200px;height:630px;position:relative;overflow:hidden;
    background:
      radial-gradient(1100px 520px at 82% -10%, rgba(216,139,58,.16), transparent 60%),
      radial-gradient(900px 600px at 5% 112%, rgba(0,0,0,.18), transparent 60%),
      #1F4F4A;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    font-family: Georgia, 'Times New Roman', serif;
    color:#FBF6EE;
  }
  .mark{font-size:150px;line-height:1;color:#FBF6EE;}
  .wave{margin-top:6px;}
  .word{font-size:96px;font-weight:600;letter-spacing:-1px;margin-top:14px;color:#FBF6EE;}
  .tag{font-size:34px;font-style:italic;color:#D88B3A;margin-top:10px;}
  .sub{font-size:26px;color:rgba(251,246,238,.65);margin-top:26px;letter-spacing:2px;text-transform:uppercase;}
</style></head>
<body>
  <div class="card">
    <div class="mark">अ</div>
    <svg class="wave" width="220" height="44" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12 C16 2,28 2,40 12 S64 22,76 12 S100 2,116 12" stroke="#FBF6EE" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M4 12 C16 22,28 22,40 12 S64 2,76 12 S100 22,116 12" stroke="#D88B3A" stroke-width="2.6" stroke-linecap="round"/>
    </svg>
    <div class="word">Anvayya</div>
    <div class="tag">Your Gut, Our Guide</div>
    <div class="sub">Built on your biology</div>
  </div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });

  // OG image
  await page.setContent(ogHtml);
  await page.waitForTimeout(50);
  await page.screenshot({ path: path.join(ASSETS, 'og-image.png') });

  // Favicon sizes
  const sizes = [16, 32, 48, 180, 512];
  for (const size of sizes) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<!doctype html><html><body style="margin:0">${faviconSvg}</body></html>`);
    await page.evaluate((s) => {
      const svg = document.querySelector('svg');
      svg.setAttribute('width', s);
      svg.setAttribute('height', s);
    }, size);
    await page.waitForTimeout(30);
    const name = size === 180 ? 'apple-touch-icon.png' : size === 512 ? 'icon-512.png' : `favicon-${size}.png`;
    await page.screenshot({ path: path.join(ASSETS, name), omitBackground: true });
  }

  await browser.close();
  console.log('Assets rendered to', ASSETS);
})();
