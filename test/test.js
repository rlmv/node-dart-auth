
var request = require('supertest');
var express = require('express');
var assert = require('assert');
var auth = require('..'); // module


var app = express();

app.use(express.cookieParser('secret'));
app.use(express.session());

app.use(auth({ service: 't' }));
app.get('/', function(req, res) {
    res.send(200, {name: 'tobi'});
});

describe('Initialization', function() {
    describe('.auth()', function() {
        it('should throw error because of no service option', function() {
            assert.throws(auth); // equiv to calling ()
        });
    });

    describe('.auth({options})', function() {
        it('should initialize', function() {
            auth({ service: 'localhost:3000' });
        });
    });
});

describe('Should redirect GET /', function() {
 it('respond', function(done) {
    request(app)
    .get('/')
    .expect(307)
    .end(function(err, res) {
        if (err) throw err;
        var location = res.get('location'); // pull redirect url

        done();
    });
 });
});




