var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var app = require('../../server.js').app;
var port = process.env.PORT || 3000;
var resourceUrl = 'http://localhost:' + port + '/api/v0_0_1/notes';

describe('Notes JSON api', function() {
    var id;

    //testing the POST function  of the JSON API
    it('can successfully create a new note', function(done) {
        superagent.post(resourceUrl)
            .send({
                body: 'a new note!'
            })
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body._id).to.not.be.eql(null);
                expect(res.body.body).to.be.eql('a new note!');
                id = res.body._id;

                done();
            });
    });

    //testing the GET function of the JSON API
    it('can successfully get a note', function(done) {
        superagent.get(resourceUrl + '/' + id)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body._id).to.be.eql(id);
                expect(res.body.body).to.be.eql('a new note!');

                done();
            });
    });

    it('can successfully update a note', function(done) {
        superagent.put(resourceUrl + '/' + id)
            .send({
                body: 'an updated note'
            })
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql("success!");

                done();
            });
    });

    it('can successfully delete a note', function(done) {
        superagent.del(resourceUrl + '/' + id)
            .end(function(err, res) {
                expect(err).to.eql(null);

                done();
            });
    });

});