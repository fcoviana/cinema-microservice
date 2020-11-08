var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const moviesServiceProxy = httpProxy('http://localhost:3000');
const citiesServiceProxy = httpProxy('http://localhost:3001');
const cinemasServiceProxy = httpProxy('http://localhost:3001');

// Proxy request
app.get('/movies', (req, res, next) => {
    moviesServiceProxy(req, res, next);
})

app.get('/cities', (req, res, next) => {
    citiesServiceProxy(req, res, next);
})

app.get('/cinemas', (req, res, next) => {
    cinemasServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(4000);