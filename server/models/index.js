"use strict";

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config    = require(__dirname + '/../../config/database.json');
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool,
    dialectOptions: {
        encrypt: true
    }
});

var db = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        console.log(model.name);
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync().then(function () {
    console.log('sequelize ready!');
});

module.exports = db;
