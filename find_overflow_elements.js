const { spawn } = require('child_process');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless',
  '--disable-gpu',
  '--remote-debugging-port=9444',
  '--window-size=390,844',
  'http://localhost:8088/'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9444/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension://')) || tabs[0];
    console.log('Connecting to:', pageTab.title, pageTab.url);
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    let id = 1;
    function send(method, params = {}) {
      return new Promise(r => {
        const curId = id++;
        const handler = (e) => {
          const d = JSON.parse(e.data);
          if (d.id === curId) {
            ws.removeEventListener('message', handler);
            r(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true
    });
    await send('Page.navigate', { url: 'http://localhost:8088/' });
    await new Promise(r => setTimeout(r, 2000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        // Find which top-level element has width > 390
        const wideChildren = [];
        Array.from(document.body.children).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 390 || el.scrollWidth > 390) {
            wideChildren.push({
              tag: el.tagName,
              id: el.id,
              class: (el.className || '').slice(0, 40),
              width: Math.round(r.width),
              scrollWidth: el.scrollWidth
            });
          }
        });
        return {
          windowInnerWidth: window.innerWidth,
          docWidth: document.documentElement.offsetWidth,
          scrollWidth: document.documentElement.scrollWidth,
          wideChildren
        };
      })()`,
      returnByValue: true
    });

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    const fs = require('fs');
    fs.writeFileSync('C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff\\mobile_real_emulated.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved mobile_real_emulated.png');

    // Click mobile menu button
    await send('Runtime.evaluate', { expression: `document.getElementById('mobile-menu-btn').click()` });
    await new Promise(r => setTimeout(r, 400));

    const ssMenu = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff\\mobile_menu_open_verified.png', Buffer.from(ssMenu.data, 'base64'));
    console.log('Saved mobile_menu_open_verified.png');

    console.log('RESULT:', JSON.stringify(evalRes.result?.value, null, 2));
    chrome.kill();
    process.exit(0);
  } catch(e) {
    console.error(e);
    chrome.kill();
  }
}, 1500);
