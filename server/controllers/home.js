function route(expressApp){
    expressApp.get('/', 'home', expressApp.restrict, function (req, res) {

        res.render('home', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });
}

module.exports = route;
