const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff';

const mobileEmulated = path.join(artifactDir, 'mobile_emulated_iphone.png');

console.log('Capturing real mobile emulation screenshot...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=390,844 --user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1" --screenshot="${mobileEmulated}" http://localhost:8088/`);

console.log('Done!');
