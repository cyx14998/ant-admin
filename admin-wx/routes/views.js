var router = require('koa-router')();
var Razor = require('../modules/koa-razor');
var conf = require("../config/server.js");
var pageConfig = conf.pathConfig[conf.runModel];
var Demo = {
    admin: async (ctx, next) => {
        await Razor({ root: '/admin/', path: './views/admin/' }, pageConfig)(ctx);
    },
    m: async (ctx, next) => {
        await Razor({ root: '/m/', path: './views/m/' }, pageConfig)(ctx);
    }

};



router
    .get(/^\/admin\//i, Demo.admin)
    .get(/^\/m\//i, Demo.m);


// Razor({root:'/',path:'./Views/'},{})

module.exports = router;