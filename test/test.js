
var request = require('supertest');
var express = require('express');
var assert = require('assert');
var Browser = require('zombie');
var auth = require('..'); // module



var initializeExpressApp = function() {

    var app = express();

    app.use(express.cookieParser('secret'));
    app.use(express.session());

    app.use(auth({ service: 'localhost:3000' }));

    app.get('/', function(req, res) {
        res.send(200, {name: 'test'});
    });
    app.get('/get_session_auth', function(req, res) {
        res.send({auth: req.session.auth });
    })

    return app;
};


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


describe('With authentication', function() {
    this.timeout(10000); // need extra time for redirects

    beforeEach(function(done) {

        this.app = initializeExpressApp();

        request(this.app)
        .get('/')
        .expect(307)
        .end(function(err, res) {

            if (err) done(err);

            var location = res.get('location'); // redirect url
            browser = new Browser();
            browser.visit(location)
            .then(function() {
                browser.fill('username', process.env.USR);
                browser.fill('password', process.env.PWD);
                return browser.pressButton('sSubmit');
            })
            .then(function() {
                // should redirect to localhost app
                console.log(browser.location);
                assert.equal(browser.location.hostname, '127.0.0.1');
            })
            .then(done, done);
        });
    });

    describe('', function() {
        it('should exist', function(done) {
            request(this.app)
            .get('/get_session_auth')
            .expect(400, done)
        });
    });

});




