function route(expressApp){
    expressApp.get('/', 'home', expressApp.restrict, function (req, res) {

        res.render('home', {
            title: 'Cloud Bread Admin Home'
        });
    });

    /**
     *
     *
     */

    expressApp.get('/odata/StatsDatas', expressApp.restrict, function (req, res, next) {
        // top=10&filter=DAU
        console.log(req.query);
        var limit = Number(req.query.top || 1);
        var keyword = req.query.filter;
        var orderBy = 'Fields';
        var desc = 'desc';

        var filter = {CategoryName: keyword };
        var Model = expressApp.models.StatsData;

        Model.findAll({
                where : filter,
                limit : limit
            })
            .then(function(results) {
                res.json({
                    "odata.metadata": "http://localhost:3000/odata/$metadata#StatsDatas",
                    "value": results
                });
            }).catch(function(err){
            next(err);
        });

    });
}

module.exports = route;
