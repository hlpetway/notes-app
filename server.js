'use strict';

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var noteRoutes = require('./routes/noteRoutes');

//added this and the ref below.
var mongoURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/notes-development';

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyparser.json());
app.use(express.static(__dirname + '/dist/'));

//all our methods we can perform with body-parser
app.get('/api/v0_0_1/notes', noteRoutes.collection);
app.get('/api/v0_0_1/notes/:id', noteRoutes.findById);
app.post('/api/v0_0_1/notes', noteRoutes.create);
app.put('/api/v0_0_1/notes/:id', noteRoutes.update);
app.delete('/api/v0_0_1/notes/:id', noteRoutes.destroy);
//connect to mongo server using mongoose
mongoose.connect(mongoURI);
var mongo

//get the json & html into the DOM
app.get('/', noteRoutes.home);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('server listening on port' + app.get('port'));
});
