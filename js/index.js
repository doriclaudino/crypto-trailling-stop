#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('./json/db.json')


/**
 * Commander options
 */
program
    .version('0.0.1')
    .command('set <cmd> [value]')
    .action(function (cmd, value) {
        low(adapter)
            .set(cmd, value)
            .write()
        console.log('update %s=%s', cmd, value)
    });

program
    .option('-T, --exchange-time <n>', 'seconds between each exchange loop', parseInt)
    .option('-t, --market-time <n>', 'seconds between each market loop', parseInt)

program.parse(process.argv);

/**
 * checkOptions and start
 */
if (program) {
    console.log('init..')

    if (!program.exchangeTime)
        program.exchangeTime = 30;
    console.log(`program.exchangeTime=${program.exchangeTime}`)

    if (!program.marketTime)
        program.marketTime = 3;
    console.log(`program.marketTime=${program.marketTime}`)

    var db = low(adapter)
    var exchanges = Object.keys(db.get('exchanges').value())

    exchanges.forEach(exchange => {
        console.log(`exchange=${exchange}`)

        var markets = Object.keys(db.get(`exchanges.${exchange}.markets`).value())
        markets.forEach(market => {
            console.log(`market=${market}`)
        });
    });

}