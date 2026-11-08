const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chrome = spawn(chromePath, [
  '--headless',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--window-size=390,844',
  'http://localhost:8088/'
]);

setTimeout(() => {
  http.get('http://localhost:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      console.log('Tabs:', tabs.length);
      const wsUrl = tabs[0].webSocketDebuggerUrl;
      console.log('WS URL:', wsUrl);
      
      const WebSocket = require('ws'); // wait, is ws installed?
    });
  });
}, 1000);
