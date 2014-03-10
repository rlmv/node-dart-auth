
var request = require('supertest');
var express = require('express');
var assert = require('assert');
var Browser = require('zombie');
var auth = require('..'); // module

var app = express();

app.use(express.cookieParser('secret'));
app.use(express.session());

app.use(auth({ service: 't' }));
app.get('/', function(req, res) {
    res.send(200, {name: 'test'});
});


describe('Environment', function() {
    it('USR and PWD environment vars must exist', function() {
        assert.ok(process.env.PWD);
        assert.ok(process.env.USR);
    });
});


describe('Initialization', function() {
    describe('.auth()', function() {
        it('should throw error because of no service option', function() {
            assert.throws(auth); // equiv to calling ()
        });
    });

    describe('.auth({options})', function() {
        it('should initialize without error', function() {
            auth({ service: 'localhost:3000' });
        });
    });
});

describe('Should redirect GET /', function() {
    this.timeout(10000); // need extra time for redirects

    it('redirect and authenticate', function(done) {
        request(app)
        .get('/')
        .expect(307)
        .end(function(err, res) {
  
            if (err) throw err;
            var location = res.get('location'); // pull redirect url

            browser = new Browser();
            browser.visit(location)
            .then(function() {
                browser.fill('username', process.env.USR);
                browser.fill('password', process.env.PWD);
                return browser.pressButton('sSubmit');
            })
            .then(function() {
                // should redirect to localhost app
                assert.equal(browser.location.hostname, '127.0.0.1');
            })
            .then(done, done);
        });
    });
});




