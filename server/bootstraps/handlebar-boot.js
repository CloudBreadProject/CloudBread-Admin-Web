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
            pagination: function(currentPage, totalCount) {

                console.log('currentPage : '+currentPage);
                console.log('totalCount : '+totalCount);


                var str = '';
                var perPage = 15;
                var lastPage = Math.ceil((totalCount / perPage - 1) + 1);
                var maxDisplayPage = 10;

                console.log('lastPage : '+lastPage);

                if(currentPage > 1){
                    str += '<li><a href="?page='+(currentPage - 1) + '">&laquo;</a></li>';
                }
                str += '<li><a href="#">' + currentPage  + '</a></li>';
                var i = currentPage + 1;
                for(; i < lastPage ; i++)
                {
                    str += '<li><a href="?page='+i + '">'+i+'</a></li>';
                }
                console.log(' after loop i '+i);
                if(i <= lastPage){
                    str += '<li><a href="?page=';
                    str += i;
                    str += '">&raquo;</a></li>';
                }
                return str;
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


