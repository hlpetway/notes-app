'use strict';

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var noteRoutes = require('./routes/noteRoutes');

var app = express();

//get all the notes
app.get('/api/v0_0_1/notes', noteRoutes.collection);

//connect to mongo server using mongoose

mongoose.connect('mongodb://localhost/notes-development');

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
    console.log('server listening on port' + app.get('port'));
});