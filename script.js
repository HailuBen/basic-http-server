const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    // console.log(`Request incoming from: ${request.url}`);   //show url location of request

    let fileName = '';  //fileName variable to hold an html page

    if (request.url === '/') {
        fileName = 'index.html';
    } else if (request.url === '/about') {
        fileName = 'about.html';
    } else if (request.url === '/contact') {
        fileName = 'contact.html';
    } else {
        fileName='404.html';    //404 error page for unknown routes
        response.statusCode = 404;   //error code
    }

    fs.readFile(fileName, 'utf8', (error, data) =>{
        if (error){
            response.statusCode=500;
            response.setHeader('Content-Type', 'text/plain');
            response.end('Internal server error');
            return;
        }
        response.setHeader('Content-Type', 'text/html');
        response.end(data);
    });
});

server.listen(3000, () => { //port 3000
    console.log('✓ Server is running at http://localhost:3000/');
});