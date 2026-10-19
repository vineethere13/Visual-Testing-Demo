const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'public');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8' };
http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const file = path.resolve(root, '.' + requested);
  if (!file.startsWith(root + path.sep) && file !== path.join(root, 'index.html')) return res.writeHead(403).end('Forbidden');
  fs.readFile(file, (err, data) => {
    if (err) return res.writeHead(404).end('Not found');
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }); res.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('Demo app: http://127.0.0.1:4173'));
