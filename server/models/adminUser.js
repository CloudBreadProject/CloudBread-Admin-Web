

//var sequelize = new Sequelize('database', 'username', 'password', {
//    host: 'localhost',
//    dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
//
//    pool: {
//        max: 5,
//        min: 0,
//        idle: 10000
//    }
//
//});

var sequelize = new Sequelize('mssql://konan@dwasqldb:P@ssw0rd@dwasqldb.database.windows.net:1433/dwCloudBread2');


//AdminMember

var AdminMember = sequelize.define('AdminMember', {
    AdminMemberID : Sequelize.TEXT,
    AdminMemberPWD : Sequelize.TEXT,
    AdminMemberEmail : Sequelize.TEXT,
    IDCreateAdminMember : Sequelize.TEXT,
    AdminGroup : Sequelize.TEXT,
    TimeZoneID : Sequelize.TEXT,
    PINumber : Sequelize.TEXT,
    Name1 : Sequelize.TEXT,
    Name2 : Sequelize.TEXT,
    Name3 : Sequelize.TEXT,
    DOB : Sequelize.TEXT,
    LastIPaddress : Sequelize.TEXT,
    LastLoginDT : Sequelize.TEXT,
    LastLogoutDT : Sequelize.TEXT,
    sCol1 : Sequelize.TEXT,
    sCol2 : Sequelize.TEXT,
    sCol3 : Sequelize.TEXT,
    sCol4 : Sequelize.TEXT,
    sCol5 : Sequelize.TEXT,
    sCol6 : Sequelize.TEXT,
    sCol7 : Sequelize.TEXT,
    sCol8 : Sequelize.TEXT,
    sCol9 : Sequelize.TEXT,
    sCol10 : Sequelize.TEXT,
    DeleteYN : Sequelize.TEXT,
    HideYN : Sequelize.TEXT,
    CreatedAt : Sequelize.TEXT,
    UpdatedAt : Sequelize.TEXT,
    DataFromRegion : Sequelize.TEXT,
    DataFromRegionDT : Sequelize.TEXT
});


