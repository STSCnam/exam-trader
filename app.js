'use strict'

const express = require('express');
const app = express();
const env = require('./env.json');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/statics'));

app.use('/', require('./routes/index'));
app.use('/service/bourse', require('./routes/services/bourse'));

app.listen(env.port, env.host, () => {
    console.log(`Server started and listening on ${env.host}:${env.port} ...`);
});