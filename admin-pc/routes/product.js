var router = require('koa-router')();
var koabody = require("koa-body")();
var http = require("http");
var sql = require("../dal/product");

var Demo = {
    addProduct: async (ctx, next) => {
        var model = {
            innerid: null,
            menuid: ctx.request.body.menuid,
            keyword: ctx.request.body.keyword,
            proname: ctx.request.body.proname,
            protype: ctx.request.body.protype,
            propic: ctx.request.body.propic,
            summary: ctx.request.body.summary,
            introduction: ctx.request.body.introduction,
            versioninfo: ctx.request.body.versioninfo,
            price: ctx.request.body.price,
            hits: null,
            ordernum: null,
            tags: ctx.request.body.tags,
            remark: ctx.request.body.remark,
            statuscode: null,
            createdtime: null,
            createrid: null,
            modifiedtime: null,
            modifierid: null,
        }
        var result = await sql.addProduct(model);
        ctx.body = result;
    },
    deleteProduct: async (ctx, next) => {
        var innerid = ctx.request.body.id;
        var arr = innerid.split(",");
        console.log(arr);
        console.log(arr.length);
        var result = await sql.deleteProduct(arr);
        ctx.body = result;
    },
    updateProduct: async (ctx, next) => {
        var model = ctx.request.body;
        model.modifiedtime = (new Date()).format('yyyy-MM-dd hh-mm-ss');
        var result = await sql.updateProduct(model);
        ctx.body = result;
    },
    getProductByID: async (ctx, next) => {
        // var id = ctx.request.query.id;
        var id = ctx.request.query.id;
        var result = await sql.getProductByID(id);
        ctx.body = result;
    },
    getProductList: async (ctx, next) => {
        // var count = ctx.request.body.count;
        // var num = ctx.request.body.num;
        var count = 2;
        var num = 3;
        var result = await sql.getProductList(count, num);
        ctx.body = result;
    },
    getProductType: async (ctx, next) => {
        var protype = ctx.request.body.protype;
        var result = await sql.getProductType(protype);
        ctx.body = result;
    },
    
    getProductKeyword: async (ctx, next) => {
        var keyword = ctx.request.body.keyword;
        var result = await sql.getProductKeyword(keyword);
        ctx.body = result;
    },
    getProductTags: async (ctx, next) => {
        var tags = ctx.request.body.tags;
        var result = await sql.getProductTags(tags);
        ctx.body = result;
    },
};

router
    .post("/api/product/addProduct", koabody, Demo.addProduct)
    .post("/api/product/deleteProduct", koabody, Demo.deleteProduct)
    .post("/api/product/updateProduct", koabody, Demo.updateProduct)
    .get("/api/product/getProductByID", koabody, Demo.getProductByID)
    .post("/api/product/getProductList", koabody, Demo.getProductList)
    .post("/api/product/getProductKeyword", koabody, Demo.getProductKeyword)
    .post("/api/product/getProductTags", koabody, Demo.getProductTags)


module.exports = router;