var Note = require('../models/note');

module.exports.collection = function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    Note.find({}, function(err, notes) {
        if (err) {
            res.send(500, {
                err: err
            });
            return false;
        }
        res.send(notes);

    });
};

exports.findById = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Note.findOne({
        "_id": req.params.id
    }, function(err, note) {
        if (err) {
            res.send(500, {
                error: err
            });
            return false;
        }
        res.send(note);
    });
};

exports.home = function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('./app/js/index.html');
};

exports.create = function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    var note = new Note({
        body: req.body.body
    });
    note.save(function(err, newNote) {
        if (err) {
            res.send(500, {
                error: err
            })
            return false;
        }
        res.send(newNote);
    });
};

exports.update = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var note = req.body;
    var id = req.params.id;
    delete note._id;

    Note.update({
        '_id': id
    }, note, function(err) {
        if (err) {
            res.send(500, {
                error: err
            });
            return false;
        }
        res.send({
            msg: "success!"
        });
    });
};

exports.destroy = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Note.remove({
        '_id': req.params.id
    }, function(err) {
        if (err) {
            res.send(500, {
                error: err
            });
            return false;
        }
        res.send({
            "message": "success!"
        });
    });
};
