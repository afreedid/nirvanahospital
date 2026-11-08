const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff';

// Capture focused facilities screenshot
const facZoom = path.join(artifactDir, 'facilities_showcase_verified.png');
console.log('Capturing facilities showcase...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,1200 --screenshot="${facZoom}" http://localhost:8088/#gallery`);

console.log('Done!');
