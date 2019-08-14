const {remote}                = require('electron');
require('electron-titlebar');
const NotificationHelper      = require('./helpers/notification.js');
const SqlHelper     = require('./helpers/sql.js');
// new SqlHelper.SqlHelpers().initialize().then(function(SQL){
//     var contents = SQL.exec("SELECT * FROM expense");
//     console.log(JSON.stringify(contents[0].columns));
// });

//var filebuffer = fs.readFileSync(__dirname +'/database.db');
//var fs = require('fs');
//var sql = require('sql.js');
            //var bfr = fs.readFileSync(__dirname + '/database.db');
           // DB = new sql.Database(bfr);