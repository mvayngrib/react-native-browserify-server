#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var parser = require('nomnom');
var Server = require('../lib/Server');

parser.command('start')
  .option('hostname', {
    default: 'localhost',
  })
  .option('port', {
    default: 8080,
  })
  .option('packagerPort', {
    default: 8081,
  })
  .option('webpackPort', {
    default: 8082,
  })
  .option('entry', {
    default: 'index.ios',
  })
  .option('browserifyConfigPath', {
    default: 'browserifyConfig'
  })
  // .option('hot', {
  //   flag: true,
  //   default: false,
  // })
  .callback(function(opts) {
    if (opts.browserifyConfigPath) {
      opts.browserifyConfig = fs.readFileSync(path.resolve(opts.browserifyConfigPath), { encoding: 'utf8' })
        .split(/\s+/)

      delete opts.webpackConfigPath;
    }

    (new Server(opts)).start();
  });

parser.parse();
