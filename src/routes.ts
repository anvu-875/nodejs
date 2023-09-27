import fs from 'fs';
import { RequestListener } from 'http';

const requestHandler: RequestListener = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Send Message</title></head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message" required/><button type="submit">Add</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body: any[] = [];
        req.on('data', (churk) => {
            body.push(churk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my node.js server!</h1></body>');
    res.write('</html>');
    res.end();
};

export default requestHandler;