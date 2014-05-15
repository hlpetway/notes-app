var Note = require('../models/note');

module.exports.collection = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    //use the find function that comes with
    //And then a callback for when users comes back.
    Note.find({}, function(err, users) {
        if (err) {
            res.send(500, {
                err: err
            });
            return false;
        }
        res.send(users);
        //if no errors sends the users array to the response.
    });
};

exports.findById = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Note.findOne({
        "_id": req.params.id
    }, function(err, user) {
        if (err) {
            res.send(500, {
                error: err
            });
            return false;
        }
        res.send(user);
    });
};

exports.create = function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    var note = new Note({
        body: req.body.body
    });
    note.save(function(err, resNote) {
        if (err) {
            res.send(500, {
                error: err
            });
            return false;
        }
        res.send(resNote);
    });
};

exports.update = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.dir(req.body);
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