const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {test} = require('node:test');
const {runInNewContext} = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(
  readFileSync(join(__dirname, '../src/utils/clarity.ts'), 'utf8'),
  {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}},
).outputText;

function browser({host = 'www.lheureuxlabs.com', mode = 'production', blocked = false} = {}) {
  let cookies = '';
  let reloaded = false;
  const scripts = [];
  const document = {
    get cookie() { return cookies; },
    set cookie(value) {
      if (!blocked) cookies = value.split(';')[0];
    },
    getElementById: (id) => scripts.find((script) => script.id === id),
    createElement: () => ({}),
    head: {appendChild: (script) => scripts.push(script)},
  };
  const window = {
    location: {
      hostname: host,
      protocol: 'https:',
      reload: () => { reloaded = true; },
    },
  };
  const exports = {};
  runInNewContext(source, {
    exports, document, window, console, process: {env: {NODE_ENV: mode}},
  });
  return {api: exports, document, window, scripts, reloaded: () => reloaded};
}

test('no Clarity request before consent or after refusal', () => {
  const {api, scripts} = browser();
  assert.equal(api.readConsent(), null);
  api.startClarity();
  assert.equal(scripts.length, 0);
  assert.equal(api.saveConsent('declined'), true);
  api.startClarity();
  assert.equal(scripts.length, 0);
});

test('acceptance loads Clarity once and denies advertising consent', () => {
  const {api, scripts, window} = browser();
  api.saveConsent('accepted');
  api.startClarity();
  api.startClarity();
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, 'https://www.clarity.ms/tag/zcdex5g68p');
  assert.equal(scripts[0].async, true);
  assert.equal(window.clarity.q[0][0], 'consentv2');
  assert.equal(window.clarity.q[0][1].analytics_Storage, 'granted');
  assert.equal(window.clarity.q[0][1].ad_Storage, 'denied');
});

test('returning visitors retain their explicit choice', () => {
  const {api, document, scripts} = browser();
  document.cookie = 'site_analytics=accepted';
  api.startClarity();
  assert.equal(scripts.length, 1);
});

test('local development and preview domains never send analytics', () => {
  for (const options of [{mode: 'development'}, {host: 'localhost'}, {host: 'preview.example.com'}]) {
    const {api, scripts} = browser(options);
    api.saveConsent('accepted');
    api.startClarity();
    assert.equal(scripts.length, 0);
  }
});

test('withdrawal denies consent, clears cookies and unloads the SDK', () => {
  const {api, window, reloaded} = browser();
  api.saveConsent('accepted');
  api.startClarity();
  api.saveConsent('declined');
  api.stopClarity();
  assert.equal(api.readConsent(), 'declined');
  assert.equal(window.clarity.q[1][1].analytics_Storage, 'denied');
  assert.equal(window.clarity.q[1][1].ad_Storage, 'denied');
  assert.equal(window.clarity.q[2][0], 'consent');
  assert.equal(window.clarity.q[2][1], false);
  assert.equal(reloaded(), true);
});

test('blocked cookies cannot accidentally enable analytics', () => {
  const {api, scripts} = browser({blocked: true});
  assert.equal(api.saveConsent('accepted'), false);
  api.startClarity();
  assert.equal(scripts.length, 0);
});
