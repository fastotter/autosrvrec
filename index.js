var restify = require('restify');
var mongojs = require('mongojs');

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function () {
   console.log("Server started @ 3000");
});

server.get("/autos", function (req, res, next) {
   res.send("list of autos in DB will be displayed");
   return next();
});
