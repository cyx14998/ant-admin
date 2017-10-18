const $fn = require('../common/common');
const sqlutility = require('../common/sqlutility');
var uuid = require('node-uuid');
var addmodel = require('../models/emeatproduct');
var demo = {
    //增加
    addProduct: async function (model) {
        model.innerid = uuid.v1();
        model.createdtime = (new Date()).format('yyyy-MM-dd hh-mm-ss');
        model.hits = 1;
        var dm = sqlutility.dataToModel(model, new addmodel());
        var sql = sqlutility.getInsertSql("tbem_eat_product", dm);;
        try {
            var result = await dbconn.query(sql);
            return result;
        } catch (error) {
            return { code: -1, message: error };
        }
    },
    //删除
    deleteProduct: async function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var sql = "delete from tbem_eat_product where innerid='" + arr[i] + "'";
            try {
                var result = await dbconn.query(sql);
            } catch (error) {
                return { code: -1, message: error };
            }
        }
        return result;
    },
    //修改
    updateProduct: async function (model) {
        var dm = sqlutility.dataToModel(model, new addmodel());
        var sql = sqlutility.getUpdateSql("tbem_eat_product", dm);
        try {
            var result = await dbconn.query(sql);
            return result;
        } catch (error) {
            return { code: -1, message: error };
        }
    },
    //innerid查询
    getProductByID: async function (id) {
        var sql = "select * from tbem_eat_product where innerid='" + id + "'";
        try {
            var result = await dbconn.query(sql);
            return result;

        } catch (error) {
            return { code: -1, message: error };
        }
    },
    //分页查询
    getProductList: async function (count, num) {
        if (!count && !num) {
            count = 1;
            num = 3;
        }
        var sql = "select * from tbem_eat_product limit " + num * (count - 1) + "," + num;
        try {
            var result = await dbconn.query(sql);
            return result;

        } catch (error) {
            return { code: -1, message: error };
        }
    },
    //类型查询
    getProductType: async function (protype) {
        var sql = "select * from tbem_eat_product where protype='" + protype + "'";
        try {
            var result = await dbconn.query(sql);
            return result;

        } catch (error) {
            return { code: -1, message: error };
        }
    },
    //关键字查询
    getProductKeyword: async function (keyword) {
        var sql = "select * from tbem_eat_product where keyword='" + keyword + "'";
        try {
            var result = await dbconn.query(sql);
            return result;

        } catch (error) {
            return { code: -1, message: error };
        }
    },
    //标签查询
    getProductTags: async function (tags) {
        var sql = "select * from tbem_eat_product where tags='" + tags + "'";
        try {
            var result = await dbconn.query(sql);
            return result;

        } catch (error) {
            return { code: -1, message: error };
        }
    },
    
}
module.exports = demo;