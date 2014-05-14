var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
    // now we tell it what our data looks like inside our notes obj.
    body: String
});

module.exports = mongoose.model('Note', noteSchema);
//will automatically create a notes collection inside mongodb, done 
//by mongoose for us. A really fancy obj with methods.