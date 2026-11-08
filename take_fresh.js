const { execSync } = require('child_process');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
execSync(`"${chrome}" --headless --disable-gpu --window-size=390,844 --screenshot="C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff\\mobile_viewport_fresh.png" http://localhost:8088/?v=2`);
console.log('Saved mobile_viewport_fresh.png');
