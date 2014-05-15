'use strict';

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var noteRoutes = require('./routes/noteRoutes');

//connect to mongo server using mongoose

mongoose.connect('mongodb://localhost/notes-development');

var app = express();

app.use(bodyparser());

app.set('port', process.env.PORT || 3000);

//all our methods we can perform with body-parser
app.get('/api/v0_0_1/notes', noteRoutes.collection);
app.get('/api/v0_0_1/note/:id', noteRoutes.findById);
app.post('/api/v0_0_1/notes', noteRoutes.create);
app.put('/api/v0_0_1/note/:id', noteRoutes.update);
app.delete('/api/v0_0_1/note/:id', noteRoutes.destroy);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('server listening on port' + app.get('port'));
});