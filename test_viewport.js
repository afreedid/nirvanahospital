const http = require('http');

// Let's inspect index.html in node by checking all text strings and elements that might exceed 390px
const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\fareed\\.gemini\\antigravity\\scratch\\nirvana-hospital\\index.html', 'utf8');

console.log('HTML length:', html.length);

// Check all classes with w-, min-w-, grid-, etc.
const matches = html.match(/class="[^"]*"/g) || [];
matches.forEach(m => {
  if (m.includes('min-w-') || m.includes('w-[') || m.includes('w-fit')) {
    console.log(m);
  }
});
