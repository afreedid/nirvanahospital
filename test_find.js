const { execSync } = require('child_process');

const code = `
const http = require('http');

// Let's inspect index.html directly
const fs = require('fs');
const html = fs.readFileSync('C:/Users/fareed/.gemini/antigravity/scratch/nirvana-hospital/index.html', 'utf8');

// Check for any hardcoded widths or tags
console.log('Done reading');
`;

console.log('Ready');
