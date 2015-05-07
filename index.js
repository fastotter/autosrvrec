var restify = require('restify');
var mongojs = require('mongojs');

var db = mongojs('mongodb://bart:simpson@ds031632.mongolab.com:31632/fodb', ['autos']);

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
