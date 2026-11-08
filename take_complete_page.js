const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff';

// Take full page desktop screenshot (1440 width, height 6000)
const fullDesktop = path.join(artifactDir, 'nirvana_hospital_complete_desktop.png');
console.log('Capturing complete page...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,6500 --screenshot="${fullDesktop}" http://localhost:8088/`);

console.log('Done full page!');
