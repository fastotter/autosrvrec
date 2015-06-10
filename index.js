'use strict';

var restify = require('restify')
    , config = require('./config')
    , util = require('util')
    , mongojs = require('mongojs')
    , objectId = mongojs.ObjectId
    , db = mongojs(config.db, ['autos'])
    , server = restify.createServer()
    ;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function () {
    console.log("Server started @ 3000");
});

server.get("/autos", function (req, res, next) {
    db.autos.find(function (err, autos) {
        if(err){ return res.send(500, err); }
        res.send(200, autos);
        return next();
    });
});

server.post("/autos", function (req, res, next) {
    var auto = req.params;
    db.autos.save(auto, function (err, data) {
        if(err){ return res.send(500, err); }
        res.send(201, data);
        return next();
    });
});

server.get('/autos/:id', function (req, res, next) {
    db.autos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, data) {
        if(err) { return res.send(500, err); }
        if(!data) { return res.send(404); }
        res.send(200, data);
        return next();
    });
});

server.del('/autos/:id', function (req, res, next) {
   db.autos.remove({
      _id: objectId(req.params.id)
   }, function (err, data) {
      if(err){ return res.send(500, err); }
      res.send(204);
      return next();
   });
});

