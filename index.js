#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */
const program = require('commander'),
    exec = require('child_process').exec,
    path = require('path');

/**
 * Search command manuals for instances of string
 * @param string Search string
 */
const runSearch = function (string) {
    let command = 'man -wK ' + string;
    console.log(command);
    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(error);
            process.exit();
        } else if (stderr) {
            console.error(stderr);
            process.exit();
        }
        let files = stdout.toString().split('\n');
        files.forEach(function(file) {
            console.log(path.basename(file));
        });
    })
};

/**
 * Command config
 */
program
    .version(require('./package').version)
    .arguments('<string>')
    .action(function (string) {
        runSearch(string);
    })
    .parse(process.argv);