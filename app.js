var express = require('express'),
    config = require('./config/config');

var app = express();

require('./server/express')(app, config);

app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});


