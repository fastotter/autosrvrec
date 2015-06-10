#!/usr/bin/env node
'use string';

var restify = require('restify');
var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});

var yargs = require('yargs')
   .usage('Usage: $0 <command> [options]')
   .count('verbose')
   .alias('v', 'verbose')
   .command('getautos', 'get all or specific auto')
   .command('del', 'delete autos')
   .demand(1, 'must provide a valid command'),
   argv = yargs.argv;

var command = argv._[0];

var restify = require('restify');
var client = restify.createJsonClient({
   url: 'http://localhost:3000'
});

switch (command) {
    case 'getautos':
        argv = yargs.reset()
            .usage('$0 getautos')
            .help('help')
            .option('i',{
                alias: 'id',
                demand: false,
                //default: '{}',
		describe: '_id of auto in database'
            })
        .argv;

        console.log('getautos command received');
        var endpoint = '/autos';
        if (argv.i != null) {
            endpoint = endpoint + '/' + argv.id;
        }
	console.log(endpoint);
        console.log('i value is ');
        console.log(argv.id);
        client.get(endpoint, function (err, req, res, autos) {
        if (err) {
            console.log("An error occurred >>>>>>");
	    console.log(err);
         } else {
             console.log(autos);
         }
         });
        break;

    case 'del':
        argv = yargs.reset()
            .usage('$0 del')
            .help('h')
            .example('$0 del', 'delete autos')
            .argv;

        console.log('del command received');
	break;
    default:
        yargs.showHelp();
	process.exit(1);
}
