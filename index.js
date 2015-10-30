'use strict';

const express      = require('express');
const favicon      = require('serve-favicon');

const tableify     = require('tableify');
const { upTime }   = require('./agar.io/utils');
const appData      = require('./package.json');

const AgarioHelper = require('./agar.io/helper');

const app = express(), port = parseInt(process.env.PORT || 5000);
app.set('port', port);

const helper = new AgarioHelper({
    secretKey: '8*IS3APUcEkn',
    clones: [
        'agario-client0.herokuapp.com',
        'agario-client1.herokuapp.com',
        'agario-client2.herokuapp.com'
    ],
    debug: 3
});

app.use(favicon(__dirname + '/public/favicon-32x32.png'));

app.use(express.static(__dirname + '/public'));

const header = '<!DOCTYPE html><html lang="en-US"><head>' +
    '<link rel="stylesheet" type="text/css" href="style.css"></head><body>';
const footer = '</body></html>';

app.get('/', (request, response) => {
    appData.upTime = upTime();
    appData.lastJoin = new Date(helper.lastJoin);
    appData.port = app.get('port');
    appData.altVersion = helper.toString();
    response.send(header + tableify(appData) + footer);
});


//noinspection JSUnresolvedFunction
app.use(helper.middleware());

app.listen(app.get('port'), () => console.log(helper.toString() + ' on port', app.get('port')));

// Define listeners
helper.on('server-request', attempts =>
    helper.log('Requesting server in region ' + helper.session.region + ': attempt(s) ' + attempts));

helper.on('connection-error', error => {
    helper.log('Connection failed with reason: ' + error);
    helper.log('Server address set to: ' + helper.server + ' please check if this is correct and working address');
});