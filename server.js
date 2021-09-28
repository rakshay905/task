// Modules to be required
const express = require('express');
const http = require('http');
const fs = require('fs')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

// Files to be required
const api = require('./api/routes/api');


// Static values to be used
const hostname = 'localhost';
const port = 5000;

// Modules to be used by the application
const app = express();
// controllers

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('12345-12345-12345-12345'));

// 
app.use('/api', api);



app.use(express.static(__dirname + '/dist/task'))

app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, `dist/task/index.html`));  
  });

app.use((req, res, next) => {
    console.log('HEY!');
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    res.json('You have reached the server!!!');
    res.end();
});


const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server running at port http://${hostname}:${port}`);
});

var options = {
    key: fs.readFileSync(__dirname + '/bin/localhost_3000.key'),
    cert : fs.readFileSync(__dirname + '/bin/localhost_3000.cert')
};

