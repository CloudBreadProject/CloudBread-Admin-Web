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

                var str = '';
                var perPage = 15;
                var block = 5;

                var lastPage = Math.ceil((totalCount / perPage - 1) + 1);

                var totalPage = Math.ceil(totalCount / perPage);
                var totalBlock = Math.ceil(totalPage / block);
                var currentBlock = Math.ceil(currentPage / block);

                var startPage = (currentBlock * block) - (block - 1);

                if(startPage < 1) { startPage = 1;}

                var endPage = currentBlock * block;
                if(totalPage <= endPage){
                    endPage = totalPage;
                }

                for(var p = startPage; p<=endPage; p++){
                    if(currentPage == p) {
                        str += '<li class="paginate_button active"><a href="?page=' + p + '">' + p + '</a></li>';
                    }else {
                        str += '<li class="paginate_button"><a href="?page=' + p + '">' + p + '</a></li>';
                    }
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


