import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const port = 3002; // Ensure this matches the proxy target
const host = 'localhost';

const basePath = path.resolve(__dirname, '../varastot/autovarasto');

const palvelin = http.createServer((req, res) => {
    const filePath = path.join(basePath, req.url);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ viesti: `Resurssia ${req.url} ei löytynyt`, tyyppi: 'virhe' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
    });
});

palvelin.listen(port, host, () => console.log(`${host}:${port} palvelee`));


