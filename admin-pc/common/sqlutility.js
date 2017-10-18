var sqlutility = {};


sqlutility.sqlFormat = function(sql, model) {
    for (var k in model) {
        sql = sql.replace(new RegExp('@' + k, 'gi'), ColumnValueNorm(model[k].value, model[k].dbtype));
    }
    return sql;
};


sqlutility.dataToModel = function(data, model, createnew) {
    for (var k in data) {
        var fk = k.toLowerCase();
        if (!model[fk] && !createnew) {
            continue;
        }

        if (typeof model[fk] == "object")
            model[fk].value = data[k];
        else {
            model[fk] = {};
            model[fk].value = data[k];
        }
        if (model[fk].isreset) {
            model[fk].isupdate = true;
        } else {
            model[fk].isreset = true;
        }
    }
    return model;
}


function ColumnValueNorm(columnValue, dbtype) {
    if (columnValue == null) {
        return "NULL";
    }
    columnValue = datavali(columnValue);
    if (!dbtype) {
        dbtype = 'varchar';
    }
    var str = null;
    //string nctype = ColumnValue.GetType().ToString().ToLower();
    if (dbtype == 'varchar') {
        str = "'" + columnValue + "'";
    } else if (dbtype == 'datetime') {
        // str = "'" + columnValue.format('yyyy-MM-dd hh:mm:ss') + "'";
        str = "'" + columnValue + "'";
    } else if (dbtype == 'int') {
        str = (columnValue === '') ? null : columnValue;
    } else if (dbtype == 'bit') {
        str = columnValue ? 1 : 0;
    } else {
        str = "'" + columnValue + "'";
    }

    return str;
}

function datavali(value) {
    if (typeof value == "string")
        return value.replace(/'/g, '\\\'').replace(/,/g, '\\\,');
    else
        return value;
}

function DataChange(type, value) {

}

sqlutility.getInsertSql = function(tbname, model) {
    var sql = 'insert into ' + tbname + ' ';
    var colstrs = new Array();
    var valuestr = new Array();

    for (var k in model) {
        if (model[k].dbtype == "identity") {
            continue;
        }
        if (model[k].isreset) {
            colstrs.push(model[k].name);
            valuestr.push(ColumnValueNorm(model[k].value, model[k].dbtype));
        }
    }
    return sql + "(" + colstrs.join(',') + ")" + " values (" + valuestr.join(',') + ")";
}

sqlutility.getUpdateSql = function(tbname, model, wherecondition) {
    var sql = 'update ' + tbname + ' set ';
    var keycon = "";
    var colstrs = new Array();
    for (var k in model) {
        if (model[k].isreset) {
            if (model[k].iskey) {
                keycon = model[k].name + "=" + ColumnValueNorm(model[k].value, model[k].dbtype);
            } else {
                colstrs.push(model[k].name + "=" + ColumnValueNorm(model[k].value, model[k].dbtype));
            }
        }
    }
    sql += colstrs.join(',');
    if (!wherecondition)
        wherecondition = keycon;
    sql += " where 1=1 and " + wherecondition;
    return sql;
}

module.exports = sqlutility;