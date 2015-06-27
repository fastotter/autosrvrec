#!/usr/bin/env node
'use string';

var assert = require("assert");
var restify = require('restify');

var client = restify.createJsonClient({
   url: 'http://localhost:3000'
});


describe('endpoint /autos', function() {
   //describe('test GET /autos', function() {
      it('should return 200 for GET', function(done) {
         client.get('/autos', function(err, req, res, autos) {
            assert.ifError(err);
            assert.equal(200, res.statusCode, 'status code not 200');
            done();
         });
      });
      it('should return 405 for DELETE', function(done) {
         client.del('/autos', function(err, req, res, obj) {
            assert.equal(405, res.statusCode, 'status code not 405');
            done();
         });
      });
   //});
});
