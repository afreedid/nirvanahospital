const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff';

// We can test that filterFacilities function exists and works
const testPath = path.join(artifactDir, 'test_tab_filtered.png');
console.log('Testing category filter...');
// Let's take a screenshot after running a small snippet in chrome
