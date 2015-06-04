'use strict';

var restify = require('restify');
var mongojs = require('mongojs');
var objectId = mongojs.ObjectID;

var config = require('./config.json');

var db = mongojs(config.db, ['autos']);
var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function () {
   console.log("Server started @ 3000");
});

server.get("/autos", function (req, res, next) {
   db.autos.find(function (err, autos) {
      res.writeHead(200, {
         'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(autos));
   });
   return next();
});

server.post("/autos", function (req, res, next) {
   var auto = req.params;
   db.autos.save(auto,
      function (err, data) {
         res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
	 });
         res.end(JSON.stringify(data));
      });
    return next();
});

server.get('/autos/:id', function (req, res, next) {
   db.autos.findOne({
      _id: objectId(req.param.id)
   }, function (err, data) {
      if (err) return console.error(err);
      res.writeHead(200, {
         'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(data));
   });
   return next();
});

server.del('/autos/:id', function (req, res, next) {
   db.autos.remove({
      _id: objectId(req.params.id)
   }, function (err, data) {
      if (err) return console.error(err);
      res.writeHead(200, {
         'Content-Type': 'application/json; charset=utf-8'
      });
      console.log(err);
      res.end(JSON.stringify(true));
   });
   return next();
});

