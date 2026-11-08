const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8088;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/log?')) {
    console.log('CLIENT_LOG:', decodeURIComponent(req.url.slice(5)));
    res.writeHead(200);
    return res.end('ok');
  }
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  
  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Nirvana Hospital Web Server running:`);
  console.log(`- Local:   http://localhost:${PORT}/`);
  console.log(`- Mobile Wi-Fi (Any phone on network): http://192.168.1.7:${PORT}/`);
});
