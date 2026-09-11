import { createServer } from 'node:http'
import { readFileSync, statSync } from 'node:fs'
import { resolve, join, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export function serve(root = process.cwd(), port = 8110) {
  root = resolve(root)
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt; charset=utf-8' }
  const server = createServer((req, res) => {
    try {
      let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
      if (!file.startsWith(root + sep) && file !== root) throw new Error('Invalid path')
      if (statSync(file).isDirectory()) file = join(file, 'index.html')
      const body = readFileSync(file)
      res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream')
      res.setHeader('Accept-Ranges', 'bytes')
      const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/)
      if (range) {
        const start = Number(range[1]), end = Math.min(range[2] ? Number(range[2]) : body.length - 1, body.length - 1)
        if (start > end) { res.writeHead(416, { 'Content-Range': `bytes */${body.length}` }); res.end(); return }
        res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Content-Length': end - start + 1 })
        res.end(body.subarray(start, end + 1))
      } else { res.setHeader('Content-Length', body.length); res.end(body) }
    } catch { res.statusCode = 404; res.end('Not found') }
  })
  return new Promise(done => server.listen(port, '127.0.0.1', () => done(server)))
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await serve()
  console.log('Portfolio preview: http://127.0.0.1:8110')
}
