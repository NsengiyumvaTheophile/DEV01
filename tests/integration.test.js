const http = require('http');
const fs = require('fs');
const path = require('path');
const projectDir = path.join(__dirname, '..');

describe('DevOps Application HTTP Integration Tests', () => {
    let server;
    let baseUrl;

    beforeAll(async () => {
        server = http.createServer((req, res) => {
            const page = req.url === '/' ? 'index.html' : req.url.replace(/^\//, '');
            if (!['index.html', 'hello.html'].includes(page)) {
                res.writeHead(404);
                return res.end('Not Found');
            }
            const filePath = path.join(projectDir, page);
            if (!fs.existsSync(filePath)) {
                res.writeHead(404);
                return res.end('Not Found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(fs.readFileSync(filePath));
        });
        await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
        baseUrl = `http://127.0.0.1:${server.address().port}`;
    });

    afterAll(async () => {
        if (server) await new Promise(resolve => server.close(resolve));
    });

    test('homepage returns HTTP 200 and expected heading', async () => {
        const response = await fetch(`${baseUrl}/`);
        expect(response.status).toBe(200);
        expect(await response.text()).toContain('Hello World from DevOps!');
    });

    test('hello page returns HTTP 200 and expected heading', async () => {
        const response = await fetch(`${baseUrl}/hello.html`);
        expect(response.status).toBe(200);
        expect(await response.text()).toContain('Hello World from Jenkins!');
    });

    test('homepage navigation link points to hello.html', () => {
        const content = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
        expect(content).toContain('href="hello.html"');
    });
});
