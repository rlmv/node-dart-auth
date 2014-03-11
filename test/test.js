
var url = require('url');
var express = require('express');
var assert = require('assert');
var Browser = require('zombie');
var auth = require('..'); // module

var protocol = 'http';
var hostname = 'localhost';
var port = 4000;
var site = url.format({
    protocol: protocol,
    hostname: hostname,
    port: port
});

var runTestServer = function(callback) {

    var app = express();

    app.use(express.cookieParser('secret'));
    app.use(express.session());
    app.use(auth({ service: site }));

    app.get('/', function(req, res) {
        // hackity hack, send auth data in <auth> tags
        res.send(200, '<auth>'+JSON.stringify(req.session.auth)+'</auth>');
    });

    app.listen(port, callback);
};


describe('USR and PWD environment vars', function() {
    it('must exist to run tests', function() {
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
            auth({ service: site });
        });
    });
});


describe('With authentication', function() {
    this.timeout(10000); // need extra time for redirects

    beforeEach(function(done) {
        var browser = this.browser = new Browser({ site: site });
        runTestServer(function() {
            browser.visit('/')
            .then(function() {
                browser.fill('username', process.env.USR);
                browser.fill('password', process.env.PWD);
                return browser.pressButton('sSubmit');
            })
            .then(function() {
                // should redirect to localhost app
                describe('CAS server', function() {
                    it('should redirect to localhost', function() {
                        assert.equal(browser.location.hostname, 'localhost');
                    });
                });
            })
            .then(done, done);
        });
    });

    it('should connect', function(done) {
        var browser = this.browser;
        browser.visit('/')
        .then(function() {

            assert.ok(browser.success);

            var auth = JSON.parse(browser.text('auth'));
            describe('Auth session should exist', function() {
                it('', function() {
                    assert.ok(auth);
                });
                it('with netid field', function() {
                    assert.ok(auth.netid);        
                });        
                it('with name field', function() {
                    assert.ok(auth.name);        
                });     
                it('with username field', function() {
                    assert.ok(auth.username);        
                });     
            });
        })
        .then(done, done);
    });
});




