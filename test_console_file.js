const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

try {
  const output = execSync(`"${chromePath}" --headless --disable-gpu --enable-logging=stderr --v=1 "file:///C:/Users/fareed/Downloads/nirvana-hospital/index.html"`, { encoding: 'utf8', timeout: 5000 });
  console.log('OUTPUT:', output);
} catch (e) {
  console.log('STDERR:', e.stderr ? e.stderr.toString() : '');
  console.log('STDOUT:', e.stdout ? e.stdout.toString() : '');
}
