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