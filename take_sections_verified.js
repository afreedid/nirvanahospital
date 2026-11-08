const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff';

// Let's capture the robotics section and footer specifically
const roboticsImg = path.join(artifactDir, 'robotics_verified.png');
const footerImg = path.join(artifactDir, 'footer_verified.png');

console.log('Capturing robotics section...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,800 --screenshot="${roboticsImg}" "http://localhost:8088/#robotics"`);

console.log('Capturing footer...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,750 --screenshot="${footerImg}" "http://localhost:8088/#contact"`);

console.log('Done');
