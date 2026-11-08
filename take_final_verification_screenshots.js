const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff';

// 1. Desktop full screenshot
const desktopPath = path.join(artifactDir, 'desktop_view_final.png');
console.log('Capturing desktop full screenshot...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,3200 --screenshot="${desktopPath}" http://localhost:8088/`);

// 2. Mobile full screenshot (390x844 viewport ratio)
const mobilePath = path.join(artifactDir, 'mobile_view_final.png');
console.log('Capturing mobile view screenshot...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=390,2800 --screenshot="${mobilePath}" http://localhost:8088/`);

// 3. Desktop Header & Doctor Card close-up
const heroPath = path.join(artifactDir, 'hero_doctor_final.png');
console.log('Capturing hero & doctor close-up screenshot...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,950 --screenshot="${heroPath}" http://localhost:8088/`);

// 4. Mobile Hero & Doctor Card close-up
const mobileHeroPath = path.join(artifactDir, 'mobile_hero_final.png');
console.log('Capturing mobile hero close-up screenshot...');
execSync(`"${chromePath}" --headless --disable-gpu --window-size=390,950 --screenshot="${mobileHeroPath}" http://localhost:8088/`);

console.log('All screenshots captured successfully.');
