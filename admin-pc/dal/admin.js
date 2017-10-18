const $fn = require('../common/common');
const sqlutility = require('../common/sqlutility');
var pdmmoduleinfo = require('../models/pdmmoduleinfo');
var pdmmoduleobj = require('../models/pdmmoduleobj');
var menumodel = require('../models/promenu');
var comrelationmodel = require('../models/comrelation');


var demo = {
    saveModule: function* (model) {
        var isnew = false;
        var sqllist = new Array();
        if (model.innerid) {
            isnew = false;
            model.modifiedon = (new Date()).format('yyyy-MM-dd hh-mm-ss');
        } else {
            isnew = true;
            model.innerid = $fn.uuid();
            model.datastatus = 1;
            model.createdon = (new Date()).format('yyyy-MM-dd hh-mm-ss');
        }
        var dm = sqlutility.dataToModel(model, new pdmmoduleinfo());
        var _sql;
        if (isnew) {
            _sql = sqlutility.getInsertSql("tbpdm_moduleinfo", dm);
        } else {
            _sql = sqlutility.getUpdateSql("tbpdm_moduleinfo", dm);
        }

        if (model.tag1) {
            //组件模块
            // var tagmodel = new comrelationmodel();
            if (!isnew) {
                var delsql1 = "delete from tbcom_relation where a_table='tbcom_tags' and b_table='tbpdm_moduleinfo'" +
                    " and b_id='" + model.innerid + "' and classify='module_module'";
                sqllist.push(delsql1);
            }
            var tagmodel = {
                innerid: $fn.uuid(),
                a_table: "tbcom_tags",
                a_id: model.tag1,
                b_table: "tbpdm_moduleinfo",
                b_id: model.innerid,
                classify: "module_module"
            };
            var sql1 = sqlutility.getInsertSql("tbcom_relation", sqlutility.dataToModel(tagmodel, new comrelationmodel()));
            sqllist.push(sql1);
        }

        if (model.tag2) {
            if (!isnew) {
                var delsql1 = "delete from tbcom_relation where a_table='tbcom_tags' and b_table='tbpdm_moduleinfo'" +
                    " and b_id='" + model.innerid + "' and classify='module_classify'";
                sqllist.push(delsql1);
            }
            //组件分类
            var tagmodel = {
                innerid: $fn.uuid(),
                a_table: "tbcom_tags",
                a_id: model.tag2,
                b_table: "tbpdm_moduleinfo",
                b_id: model.innerid,
                classify: "module_classify"
            };
            var sql2 = sqlutility.getInsertSql("tbcom_relation", sqlutility.dataToModel(tagmodel, new comrelationmodel()));
            sqllist.push(sql2);
        }
        sqllist.push(_sql);

        try {
            var result = yield dbconn.execute(sqllist);
            if (result.code == 1) {
                return { code: 1, data: model.innerid };
            } else {
                return result;
            }
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    getModuleByID: function* (id) {
        var sql = "select a.*,b.a_id as tag1,c.a_id as tag2 from tbpdm_moduleinfo a " +
            " left join tbcom_relation b on a.innerid=b.b_id and b.classify='module_module' " +
            " left join tbcom_relation c on a.innerid=c.b_id and c.classify='module_classify'" +
            " where a.innerid=@innerid";

        var dm = sqlutility.dataToModel({ innerid: id }, { innerid: { value: "" } });
        var _sql = sqlutility.sqlFormat(sql, dm);
        try {
            var result = yield dbconn.query(_sql);
            if (result.data.length > 0) {
                return { code: 1, data: result.data[0] };
            } else {
                return { code: 0, data: null };
            }

        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    getModuleViewByID: function* (id) {
        var sql = "select * from tbpdm_moduleinfo where 1=1 and innerid='" + id + "'";
        var listsql = "select * from tbui_modulesample where 1=1 and moduleid='" + id + "' order by ordernum asc";
        try {
            var _info = yield dbconn.query(sql);
            var _samplelist = yield dbconn.query(listsql);
            var result = {
                info: {},
                codelist: _samplelist.data
            };
            if (_info.code == 1) {
                result.info = _info.data[0];
            }
            return result;

        } catch (error) {

        }
    },
    getModuleViewByKey: function* () {
        var sql = "";
    },
    delModuleByID: function* (id) {
        var sql = 'update tbpdm_moduleinfo set datastatus=-1 where innerid=@innerid';

        var dm = sqlutility.dataToModel({ innerid: id }, { innerid: { value: "" } });
        var _sql = sqlutility.sqlFormat(sql, dm);
        try {
            var result = yield dbconn.execute(_sql);
            return { code: 1, data: result };
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    getModulelist: function* (query) {
        var wheresql = " from tbpdm_moduleinfo where 1=1 and datastatus!=-1 ";

        if (query.tag1) {
            wheresql += " and  innerid  in(select b_id from tbcom_relation where 1=1 and a_id='" + query.tag1 + "' and a_table='tbcom_tags' and b_table='tbpdm_moduleinfo')";
        }
        if (query.tag2) {
            wheresql += " and  innerid  in(select b_id from tbcom_relation where 1=1 and a_id='" + query.tag2 + "' and a_table='tbcom_tags' and b_table='tbpdm_moduleinfo')";
        }
        if (query.keyword) {
            wheresql += " and (info like '%" + query.keyword + "%' or description like '%" + query.keyword + "%' or name like '%" + query.keyword + "%') ";
        }
        // var wheresql = "";
        // if (query.info) {
        //     wheresql += " and a.info like '%" + query.info + "%'";
        // }
        // if (query.key) {
        //     wheresql += " and (a.info like '%" + query.key + "%' or a.description like '%" + query.key + "%' or a.keywords like '%" + query.key + "%' )";
        // }
        // if (query.parentid !== undefined) {
        //     wheresql += " and ifnull(a.parentid,'')='" + query.parentid + "'";
        // }

        // var sql = "select a.*,ifnull(b.soncount,0) as childcount from tbpdm_moduleinfo a" +
        //     " left join (select a.innerid,count(*) as soncount from tbpdm_moduleinfo a " +
        //     " left join tbpdm_moduleinfo b on a.innerid=b.parentid" +
        //     " where b.innerid is not null";
        // sql += wheresql;
        // sql += " group by a.innerid) b on a.innerid=b.innerid ";
        // sql += "  where 1=1 ";
        // sql += wheresql;
        // sql += " order by a.info asc";
        var result = yield dbconn.pagingData({
            pageIndex: query.pageIndex,
            pageSize: query.pageSize,
            fields: "*",
            orders: ["info asc"],
            wheresql: wheresql
        });
        return result;
    },

    getModuleTree: function* (query) {
        var moduleid = query.moduleid || "";
        var childsfield = query.childsfield || "children";
        // var sql = "select * from tbpdm_moduleinfo where 1=1 " +
        //     "and parentid=(select parentid from tbpdm_moduleinfo where innerid=@moduleid )";

        var sql = "select a.innerid as id,a.info as text,ifnull(b.soncount,0) as childcount from tbpdm_moduleinfo a" +
            " left join (select a.innerid,count(*) as soncount from tbpdm_moduleinfo a " +
            " left join tbpdm_moduleinfo b on a.innerid =b.parentid" +
            " where b.innerid is not null " +
            " and ifnull(a.parentid,'')=@innerid " +
            " group by a.innerid) b on a.innerid=b.innerid  where 1=1  and a.datastatus!=-1  and ifnull(a.parentid,'')=@innerid " +
            " order by a.info asc";
        try {

            var getparentdata = function* (id) {
                var model = { innerid: { value: id, dbtype: "varchar" } };
                var result = yield dbconn.query(sql, model);
                if (result.code == 1) {
                    for (var i = 0; i < result.data.length; i++) {
                        var v = result.data[i];
                        if (v.childcount > 0) {
                            v[childsfield] = yield getparentdata(v.id);
                        }
                    }
                    return result.data;
                } else {
                    return new Array();
                }
            }
            var cbdata = { code: 1 };
            cbdata.data = yield getparentdata(moduleid);
            return cbdata;
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }

    },
    getAttrList: function* (query) {
        var sql = "SELECT * FROM tbpdm_moduleobj where 1=1 ";
        if (query.moduleid) {
            sql += " and moduleid='" + query.moduleid + "' ";
        }
        if (query.modulename) {
            sql += " and moduleid in(select innerid from tbpdm_moduleinfo where `name`='" + query.modulename + "' )";
        }
        if (query.classify) {
            sql += " and classify='" + query.classify + "' ";
        }
        sql += ' order by name asc';

        try {
            var result = yield dbconn.query(sql);
            return result;
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    //按照分类处理
    getAttrView: function* (query) {
        var sql = "SELECT * FROM tbpdm_moduleobj where 1=1 ";
        if (query.moduleid) {
            sql += " and moduleid='" + query.moduleid + "' ";
        }
        if (query.modulename) {
            sql += " and moduleid in(select innerid from tbpdm_moduleinfo where `name`='" + query.modulename + "' )";
        }
        // if (query.classify) {
        //     sql += " and classify='" + query.classify + "' ";
        // }
        // sql += ' order by createdon asc';
        var osql = sql + " and classify=1 order by name asc";
        var msql = sql + " and classify=2 order by name asc";
        var esql = sql + " and classify=3 order by name asc";
        var othersql = sql + " and  (classify not in(1,2,3) or classify is null ) order by name asc";


        try {
            var result = yield dbconn.query(osql);
            var result2 = yield dbconn.query(msql);
            var result3 = yield dbconn.query(esql);
            var result4 = yield dbconn.query(othersql);
            return {
                code: 1,
                data: {
                    options: result.data,
                    methods: result2.data,
                    events: result3.data,
                    others: result4.data
                }
            };
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    saveAttrInfo: function* (model) {
        var isnew = false;
        if (model.innerid) {
            isnew = false;
            model.modifiedon = (new Date()).format('yyyy-MM-dd hh-mm-ss');
        } else {
            isnew = true;
            model.innerid = $fn.uuid();
            model.datastatus = 1;
            model.createdon = (new Date()).format('yyyy-MM-dd hh-mm-ss');
        }
        var dm = sqlutility.dataToModel(model, new pdmmoduleobj());
        var _sql;
        if (isnew) {
            _sql = sqlutility.getInsertSql("tbpdm_moduleobj", dm);
        } else {
            _sql = sqlutility.getUpdateSql("tbpdm_moduleobj", dm);
        }
        try {
            var result = yield dbconn.execute(_sql);
            if (result.code == 1) {
                return { code: 1, data: model.innerid };
            } else {
                return result;
            }

        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    delAttrByID: function* (id) {
        var sql = 'delete from tbpdm_moduleobj where innerid=@innerid';

        var dm = sqlutility.dataToModel({ innerid: id }, { innerid: { value: "" } });
        var _sql = sqlutility.sqlFormat(sql, dm);
        try {
            var result = yield dbconn.execute(_sql);
            return { code: 1, data: result };
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    setVersion: function* (model) {
        // var sql = "update tbpdm_moduleobj set versions=concat((case ifnull(versions,'') when '' then '' else concat(versions,',') end),'" + model.version + "')" +
        //     " where innerid in('" + model.ids + "')" +
        //     " and  concat(ifnull(versions,''),',',versions,',') not like '%," + model.version + ",%'";
        var sql = "update tbpdm_moduleobj set versions=concat(ifnull(versions,','),'" + model.version + "',',')" +
            " where innerid in('" + model.ids + "')" +
            " and concat(ifnull(versions,','),ifnull(versions,',')) not like '%," + model.version + ",%'";
        var sql2 = "update tbpdm_moduleobj set versions=replace(versions,'" + model.version + ",','')" +
            " where innerid in('" + model.unids + "')";
        var sqllist = new Array();
        sqllist.push(sql);
        sqllist.push(sql2);
        try {
            var result = yield dbconn.execute(sqllist);
            if (result.code == 1) {
                return { code: 1 };
            } else {
                return result;
            }
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    getModuleView: function* () {
        var sql = "SELECT a.*,b.name as attrname,b.datatype as attrtype,b.parameter,b.description as attrinfo,b.defvalue as attrvalue FROM tbpdm_moduleinfo a" +
            " left join tbpdm_moduleobj b on a.innerid=b.moduleid" +
            " order by a.parentid asc,a.name asc";
        try {
            var result = yield dbconn.query(sql);
            return result;
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    //导入
    importAttrInfo: function* (model) {
        var sqllist = new Array();

        model.list.forEach(function (element) {
            element.innerid = $fn.uuid();
            element.datastatus = 1;
            element.createdon = (new Date()).format('yyyy-MM-dd hh-mm-ss');
            var dm = sqlutility.dataToModel(element, new pdmmoduleobj());
            var _sql = sqlutility.getInsertSql("tbpdm_moduleobj", dm);

            sqllist.push(_sql);
        });

        try {
            var result = yield dbconn.execute(sqllist);
            return result;
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }

        // try {
        //     var result = yield dbconn.execute(_sql);
        //     return result;
        // } catch (err) {
        //     console.log(err);
        //     return { code: -1, result: err };
        // }
    },
    //保存菜单信息
    saveMenu: function* (model) {
        var isnew = false;
        if (model.id != 0) {
            isnew = false;
            model.modifiedon = (new Date()).format('yyyy-MM-dd hh-mm-ss');
        } else {
            isnew = true;
            model.datastate = 1;
            model.createdon = (new Date()).format('yyyy-MM-dd hh-mm-ss');
        }

        var dm = sqlutility.dataToModel(model, new menumodel());
        var _sql;
        if (isnew) {
            _sql = sqlutility.getInsertSql("tbpro_menu", dm);
        } else {
            _sql = sqlutility.getUpdateSql("tbpro_menu", dm);
        }
        try {
            var result = yield dbconn.execute(_sql);
            return result;
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    delMenu: function* (id) {
        var sql = "delete from tbpro_menu where id=" + id + "";
        try {
            var result = yield dbconn.execute(sql);
            return result;
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    getMenuList: function* (query) {
        var sql = " select a.*,ifnull(b.id,a.id) as pid,ifnull(b.ordernum,a.ordernum) as porder from tbpro_menu a" +
            " left join tbpro_menu b on a.parentid=b.id" +
            " order by porder asc,a.treelevel asc,a.ordernum";
        try {
            // var total = yield dbconn.query(totalsql);
            var result = yield dbconn.query(sql);
            return result;
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    },
    getMenuByID: function* (id) {
        var sql = "select * from tbpro_menu where id=" + id;
        try {
            var result = yield dbconn.query(sql);
            return { code: 1, data: result.data[0] };
        } catch (err) {
            console.log(err);
            return { code: -1, result: err };
        }
    }
}


module.exports = demo;