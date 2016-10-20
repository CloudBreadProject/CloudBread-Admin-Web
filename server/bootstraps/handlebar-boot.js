var exphbs = require('express-handlebars');
var moment = require('moment');

var activeRoute = '';
var blocks = [];

function HandlebarBoot(expressApp, viewsPath) {
    var Handlebars = exphbs.create({
        defaultLayout: 'main',
        layoutsDir: viewsPath + '/layouts/',
        partialsDir: viewsPath + '/partials/',
        helpers: {
            url: function(routeName, params) {
                return expressApp.locals.url(routeName, params);
            },
            activeRoute: function(routeName) {
                return routeName === activeRoute ? 'active' : '';
            },
            activeRoutes: function(routeNames) {
                // TODO
                return routeNames.split(',').indexOf(activeRoute) >= 0 ? 'active' : '';
            },
            isYes: function(value) {
                if(value=='Y'){
                    return 'checked'
                }else{
                    return '';
                }
            },
            isNo: function(value) {
                if(value=='N'){
                    return 'checked'
                }else{
                    return '';
                }
            },
            isAdmin: function(value) {
                if(value=='Admin'){
                    return 'checked'
                }else{
                    return '';
                }
            },
            isOperator: function(value) {
                if(value=='Operator'){
                    return 'checked'
                }else{
                    return '';
                }
            },
            isReader: function(value) {
                if(value=='Reader'){
                    return 'checked'
                }else{
                    return '';
                }
            },
            block: function(name) {
                var val = (blocks[name] || []).join('\n');

                // clear the block
                blocks[name] = [];
                return val;
            },
            formatTimeDate: function(date, displaySecond) {

                if(displaySecond === true)
                    return moment(date).format('YYYY-MM-DD HH:mm:ss');
                else
                    return moment(date).format('YYYY-MM-DD HH:mm');
            },
            extend: function(name, context) {
                var block = blocks[name];
                if (!block) {
                    block = blocks[name] = [];
                }

                block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
            }
        }
    });

    // View engine setup
    expressApp.engine('handlebars', Handlebars.engine);
    expressApp.set('view engine', 'handlebars');
    expressApp.set('views', viewsPath);
}

module.exports = HandlebarBoot;


