const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server= http.createServer(app);

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.set('view engine', 'ejs');

const routes = require('./routes');
routes(app); routes

const port = process.env.PORT ? process.env.PORT : 3000;

server.listen(port, () => {
	console.log(`Listening on *.${port}...`);
});

