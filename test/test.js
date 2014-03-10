

var request = require('supertest');
var express = require('express');

var app = express();

app.use(express.cookieParser('secret'));
app.use(express.session());

app.get('/', function(req, res) {
    res.send(200, {name: 'tobi'});
});

describe('GET /', function() {
    it('respond', function(done) {
        request(app)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        });
    });
});

