const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = 'C:\\Users\\fareed\\.gemini\\antigravity\\brain\\5b0336ca-affa-4919-b28e-96b32ebac8ff\\mobile_real_emulated.png';

try {
  execSync(`"${chromePath}" --headless=new --hide-scrollbars --window-size=412,915 --screenshot="${outPath}" http://localhost:8088/`);
  console.log('Done');
} catch (e) {
  console.error(e);
}
