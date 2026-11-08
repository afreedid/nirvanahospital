const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

const regex = /(?:src|href)="([^"]+)"/g;
let match;
const localFiles = [];
while ((match = regex.exec(html)) !== null) {
  const val = match[1];
  if (!val.startsWith('http') && !val.startsWith('#') && !val.startsWith('tel:') && !val.startsWith('mailto:') && !val.startsWith('javascript:')) {
    localFiles.push(val);
  }
}

console.log('Unique local assets referenced in index.html:');
const unique = [...new Set(localFiles)];
let missingCount = 0;
unique.forEach(f => {
  const cleanPath = f.split('?')[0].split('#')[0];
  const p = path.join(baseDir, cleanPath.replace(/\//g, path.sep));
  const exists = fs.existsSync(p);
  console.log((exists ? '✓ OK: ' : '✗ MISSING: ') + f);
  if (!exists) missingCount++;
});

console.log('Total missing assets:', missingCount);
