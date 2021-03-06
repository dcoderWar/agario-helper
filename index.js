'use strict';

const express      = require('express');
const favicon      = require('serve-favicon');

const tableify     = require('tableify');
const appData      = require('./package.json');

const agar = require('./agar.io');
const Helper = agar.Helper, upTime = agar.utils.upTime;

const app = express(), port = parseInt(process.env.PORT || 5000);
app.set('port', port);

const helper = new Helper({ debug: 2 });

app.use(favicon(__dirname + '/public/favicon-32x32.png'));

app.use(express.static(__dirname + '/public'));

const header = '<!DOCTYPE html><html lang="en-US"><head>' +
    '<link rel="stylesheet" type="text/css" href="style.css"></head><body>';
const footer = '</body></html>';

app.get('/', function (request, response) {

    appData.upTime = upTime();
    appData.lastJoin = new Date(helper.lastJoin);
    appData.port = app.get('port');
    appData.botVersion = helper.toString();
    appData.region = helper.session.region;
    appData.server = helper.server;
    appData.key = helper.key;
    appData.id = helper.id;
    appData.sessionID = helper.session.id;
    appData.processing = helper.processing;
    appData.debug = helper.debug;
    appData.cors = helper.cors;
    appData.leaders = helper.session.leaders;
    appData.nickName = helper.session.name;
    appData.masterID = helper.bot.masterID;
    appData.x = helper.session.x;
    appData.y = helper.session.y;

    response.send(header + tableify(appData) + footer);
});


//noinspection JSUnresolvedFunction
app.use(helper.middleware());

app.listen(app.get('port'), function (){ console.log(helper.toString() + ' on port', app.get('port')); });

// Define listeners
helper.on('server-request', function () {
    helper.log('Requesting server in region ' + helper.session.region + ': attempt(s) ' + attempts)
    });

helper.on('connection-error', function (error) {
    helper.log('Connection failed with reason: ' + error);
    helper.log('Server address set to: ' + helper.server + ' please check if this is correct and working address');
});
