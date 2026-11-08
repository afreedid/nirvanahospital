const { spawn, execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff';

async function captureViews() {
  // 1. Mobile Full Screen with Floating Quick Action Dock
  const mobileFull = path.join(artifactDir, 'mobile_viewport_full_verified.png');
  console.log('Capturing mobile view...');
  execSync(`"${chromePath}" --headless --disable-gpu --window-size=390,844 --screenshot="${mobileFull}" http://localhost:8088/`);

  // 2. Mobile Hero close-up
  const mobileHero = path.join(artifactDir, 'mobile_hero_verified.png');
  console.log('Capturing mobile hero...');
  execSync(`"${chromePath}" --headless --disable-gpu --window-size=390,950 --screenshot="${mobileHero}" http://localhost:8088/`);

  // 3. Desktop Full Screen
  const desktopFull = path.join(artifactDir, 'desktop_view_verified.png');
  console.log('Capturing desktop full...');
  execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,1050 --screenshot="${desktopFull}" http://localhost:8088/`);

  // 4. Desktop Facilities Section
  const desktopFacilities = path.join(artifactDir, 'desktop_facilities_verified.png');
  console.log('Capturing desktop facilities...');
  execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,1100 --screenshot="${desktopFacilities}" http://localhost:8088/#gallery`);

  console.log('Visual captures complete.');
}

captureViews();
