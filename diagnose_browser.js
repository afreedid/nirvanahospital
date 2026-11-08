const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runDiagnosis() {
  const chrome = spawn(chromePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9333',
    '--window-size=390,844',
    'http://localhost:8088/'
  ]);

  // wait 1.5s for chrome to start
  await new Promise(r => setTimeout(r, 1500));

  try {
    const res = await fetch('http://127.0.0.1:9333/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:8088')) || tabs[0];
    console.log('Target Tab:', pageTab.title, pageTab.url);

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    let msgId = 1;
    const callbacks = new Map();

    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        callbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const consoleLogs = [];

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const cb = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) cb.reject(data.error);
        else cb.resolve(data.result);
      } else if (data.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push({ type: data.params.type, text: data.params.args.map(a => a.value || a.description).join(' ') });
      } else if (data.method === 'Runtime.exceptionThrown') {
        consoleLogs.push({ type: 'EXCEPTION', text: data.params.exceptionDetails.text, exception: data.params.exceptionDetails.exception?.description });
      }
    };

    await new Promise(resolve => ws.onopen = resolve);
    console.log('Connected to Chrome DevTools Protocol via native WebSocket.');

    await sendCommand('Runtime.enable');
    await sendCommand('Page.enable');
    await sendCommand('DOM.enable');

    // Navigate and wait for Page.loadEventFired
    await new Promise(async (resolve) => {
      const onMsg = (event) => {
        const d = JSON.parse(event.data);
        if (d.method === 'Page.loadEventFired') {
          ws.removeEventListener('message', onMsg);
          resolve();
        }
      };
      ws.addEventListener('message', onMsg);
      await sendCommand('Page.navigate', { url: 'file:///C:/Users/fareed/Downloads/nirvana-hospital/index.html' });
    });

    // Small delay to allow any requestAnimationFrame or JS renders to finish
    await new Promise(r => setTimeout(r, 1000));

    // 1. Evaluate any initial console errors
    const errors = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        return {
          windowToggle: typeof window.toggleMobileMenu,
          windowFilter: typeof window.filterFacilities,
          windowEmergency: typeof window.openEmergencyModal,
          windowBooking: typeof window.startBookingFor,
          windowNextBooking: typeof window.nextBookingStep,
          departmentsCount: document.querySelectorAll('#departments-grid > div').length,
          reviewsCount: document.querySelectorAll('#reviews-container > div').length,
          facilityCardsCount: document.querySelectorAll('.facility-card').length,
          mobileNavHidden: document.getElementById('mobile-nav-panel')?.classList.contains('hidden')
        };
      })()`,
      returnByValue: true
    });
    console.log('Initial Window & DOM status:', errors.result.value);

    // 2. Test Mobile Menu Toggle Button Click
    const clickMobileMenu = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.getElementById('mobile-menu-btn');
        if (!btn) return 'NO_BUTTON';
        btn.click();
        const panel = document.getElementById('mobile-nav-panel');
        return {
          clicked: true,
          panelHiddenAfterClick: panel ? panel.classList.contains('hidden') : 'NO_PANEL',
          panelDisplay: panel ? window.getComputedStyle(panel).display : 'none'
        };
      })()`,
      returnByValue: true
    });
    console.log('Mobile menu button click test:', clickMobileMenu.result.value);

    // 3. Test Facility Tabs Filter Click
    const clickTab = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const surgicalTab = document.querySelector('.facility-tab-btn[data-filter="surgical"]');
        if (!surgicalTab) return 'NO_TAB';
        surgicalTab.click();
        
        const allCards = Array.from(document.querySelectorAll('.facility-card')).map(c => ({
          cat: c.getAttribute('data-category'),
          display: c.style.display,
          opacity: c.style.opacity
        }));
        return {
          tabFound: true,
          tabActive: surgicalTab.classList.contains('active'),
          cardsStatus: allCards
        };
      })()`,
      returnByValue: true
    });
    console.log('Facility tab click test:', clickTab.result.value);

    // 4. Test Appointment Wizard Next Step Click
    const clickWizard = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = document.querySelector('#wizard-step-1 button[onclick*="nextBookingStep"]');
        if (!nextBtn) return 'NO_NEXT_BTN';
        nextBtn.click();
        return {
          step1Hidden: document.getElementById('wizard-step-1').classList.contains('hidden'),
          step2Hidden: document.getElementById('wizard-step-2').classList.contains('hidden')
        };
      })()`,
      returnByValue: true
    });
    console.log('Wizard step 1 -> step 2 test:', clickWizard.result.value);

    console.log('Console Logs & Exceptions during test:', consoleLogs);

    ws.close();
  } catch (err) {
    console.error('Diagnosis failed:', err);
  } finally {
    chrome.kill();
  }
}

runDiagnosis();
