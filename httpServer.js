const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json'})
    res.end({
        message: "Hello Testing"
    })
}).listen('3002', '127.0.0.1')