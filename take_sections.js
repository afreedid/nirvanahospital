const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\fareed\\.gemini\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff';

// Capture robotics section
const roboticsPath = path.join(artifactDir, 'robotics_section_final.png');
console.log('Capturing robotics section...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${roboticsPath}" http://localhost:8088/#robotics`);

// Capture footer
const footerPath = path.join(artifactDir, 'footer_final.png');
console.log('Capturing footer...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${footerPath}" http://localhost:8088/#contact`);

console.log('Done');
