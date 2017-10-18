var dbconf = require('../config').dbconfig;
var mysql = require('mysql');
const sqlutility = require('../common/sqlutility');

var conn;

function handleError() {
    conn = mysql.createConnection(dbconf);

    //连接错误，2秒重试
    conn.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleError, 2000);
        }
         console.log('mysql connect is open');
    });

    conn.on('error', function(err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });
}
try {
    handleError();
} catch (error) {
    console.log("error");
}

//  conn.connect(function (err) {
//  	if (err) {
//  		console.error('error connecting: ' + err.stack);
//  		return;
//  	}

//  	console.log('connected as id ' + connection.threadId);
//  });

//conn.end(function (err) {
//  // The connection is terminated now
//});


//global.dbpool = function* () {
//	var text = yield new Promise(function (resolve) {

//		resolve('Not Found');
//	});	
//};

global.dbconn = {
    query:async function(sql, model) {
        var _sql = "";
        if (model) {
            _sql = sqlutility.sqlFormat(sql, model);
        } else {
            _sql = sql;
        }
        var result = await new Promise(function(resolve) {
            conn.query(_sql, function(err, rows, fields) {
                if (err) {
                    resolve({ code: -1, result: err });
                    return;
                }
                if (rows.length > 0)
                    resolve({ code: 1, data: rows });
                else {
                    resolve({ code: 0, data: new Array() });
                }
                //console.log('The solution is: ', rows[0].solution);
            });
        });
        return result;
    },
    execute:async function(sqlist) {
        var result = await new Promise(function(resolve) {
            conn.beginTransaction(function(err) {
                if (err) {
                    resolve({ code: -1 });
                    return;
                };
                resolve({ code: 1 });
            });
        });
        if (result.code == -1) {
            return result;
        }
        if (typeof sqlist == "string") {
            sqlist = [sqlist];
        }
        for (var i = 0; i < sqlist.length; i++) {
            result = await dbconn.query(sqlist[i]);
            if (result.code == -1) {
                await new Promise(function(resolve) {
                    conn.rollback(function() {
                        resolve({ code: -1 });
                        return;
                    });
                });
                return result;
            }
        };

        result = await new Promise(function(resolve) {
            conn.commit(function(err) {
                if (err) {
                    return conn.rollback(function() {
                        resolve({ code: -1 });
                        return;
                    });
                } else {
                    resolve({ code: 1 });
                    console.log('success!');
                }
            });
        });
        return result;
    },
    pagingData:async function(opt) {
        // var opt = {
        //     pageIndex: 1,
        //     pageSize: 100,
        //     fields: "",
        //     orders: ["aaa asc"],
        //     wheresql: " from tbui_modulesample where 1=1"
        // }
        var pageIndex = opt.pageIndex ? opt.pageIndex : 1;
        var pageSize = opt.pageSize ? opt.pageSize : 100;
        var orders = opt.orders || [];
        var fields = opt.fields || "*";
        var wheresql = opt.wheresql || "";

        //排序和分页
        var ordersql = ' order by ' + orders.join(",") + ' limit ' + ((pageIndex - 1) * pageSize) + ',' + pageSize;


        //合计sql
        var totalsql = "select count(*) as total " + wheresql;
        //拼接
        var sql = "select " + fields + " " + wheresql + ordersql;
        try {
            var total = await this.query(totalsql);
            var result = await this.query(sql);
            return { code: 1, data: result.data, total: total.data[0]['total'] };
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    }
};
//connection.destroy();