const http = require('http');
const { execSync } = require('child_process');

// We can launch chrome with remote debugging or print out
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlScript = `
(() => {
  const overflows = [];
  document.querySelectorAll('*').forEach(el => {
    if (el.scrollWidth > 390) {
      overflows.push({
        tag: el.tagName,
        id: el.id,
        class: el.className,
        scrollWidth: el.scrollWidth
      });
    }
  });
  console.log(JSON.stringify(overflows.slice(0, 15), null, 2));
})()
`;

// Or simpler: let's inject a script into index.html temporarily that logs overflows, or let's inspect the main sections
