const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.mp4': 'video/mp4' };

http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const requested = path.resolve(root, `.${pathname}`);
  if (requested !== root && !requested.startsWith(root + path.sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  const target = fs.existsSync(requested) && fs.statSync(requested).isDirectory()
    ? path.join(requested, 'index.html')
    : requested;
  if (path.extname(target).toLowerCase() === '.mp4' && fs.existsSync(target)) {
    const size = fs.statSync(target).size;
    const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
    const start = range ? Number(range[1]) : 0;
    const end = range && range[2] ? Number(range[2]) : size - 1;
    if (start >= size || end >= size || end < start) {
      res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end();
      return;
    }
    res.writeHead(range ? 206 : 200, {
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      ...(range ? { 'Content-Range': `bytes ${start}-${end}/${size}` } : {})
    });
    if (req.method === 'HEAD') res.end();
    else fs.createReadStream(target, { start, end }).pipe(res);
    return;
  }
  fs.readFile(target, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(target).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8080, '127.0.0.1', () => console.log('Portfolio preview: http://127.0.0.1:8080'));
