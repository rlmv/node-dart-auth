
var request = require('supertest');
var express = require('express');
var assert = require('assert');
var auth = require('..'); // module


var app = express();

app.use(express.cookieParser('secret'));
app.use(express.session());

app.get('/', function(req, res) {
    res.send(200, {name: 'tobi'});
});


/*exports.testNoService = function(test) {
    test.throws(app.use(auth()));
    test.done();
};

exports.testInitService = function(test) {
    test.doesNotThrow(app.use(auth));
    test.done();
}*/


describe('Middleware', function() {

    describe('.auth()', function() {
        it('should throw error because of no service', function() {
            assert.throws(auth); // equiv to calling ()
        });
    });

    describe('.auth({options})', function() {
        it('should initialize', function() {
            auth({ service: 'localhost:3000' });
        });
    });
});
/*        it('respond', function(done) {
        request(app)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        });
    });
*/



