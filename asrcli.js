#!/usr/bin/env node

var yargs = require('yargs')
   .usage('$0 command')
   .command('getautos', 'get all or specific auto')
   .command('del', 'delete autos')
   .demand(1, 'must provide a valid command'),
   argv = yargs.argv,
   command = argv._[0];

if (command === 'getautos') {
   yargs.reset()
      .usage('$0 getautos')
      .help('h')
      .example('$0 getautos', 'display autos')
      .argv

   console.log('getautos command received');
} else if (command === 'del') {
   yargs.reset()
      .usage('$0 del')
      .help('h')
      .example('$0 del', 'delete autos')
      .argv

   console.log('del command received');
} else {
   yargs.showHelp();
}
