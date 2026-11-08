const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = 'C:\\Users\\fareed\\.gemini\\antigravity\\scratch\\nirvana-hospital';
const destDir = 'C:\\Users\\fareed\\Downloads\\nirvana-hospital';
const zipPath = 'C:\\Users\\fareed\\Downloads\\nirvana-hospital.zip';

// 1. Copy files recursively
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === '.vercel' || entry.name === 'node_modules') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying files to Downloads...');
copyRecursive(srcDir, destDir);
console.log('Copied to', destDir);

// 2. Create zip using tar or PowerShell on only the essential site files
try {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  console.log('Creating zip archive...');
  // Use Windows built-in tar.exe to create zip
  execSync(`tar -a -c -f "${zipPath}" -C "${destDir}" index.html assets`);
  console.log('Zip created successfully at', zipPath);
  const stat = fs.statSync(zipPath);
  console.log('Zip size:', stat.size, 'bytes');
} catch (e) {
  console.error('Zip creation error:', e.message);
}
