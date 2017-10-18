var proxy = require('koa-proxy');
var url = require('url');
var path = require("path"),
    fs = require("fs"),
    config = require("./config");


module.exports = function* (next) {

    var _path = this.request.path;
    var _route = _path.match(/[^\/]+/gi);
    if (_route != null) {
        var firstroute = _route[0];

        for (var i = 0; i < config.special.length; i++) {
            if (_path.indexOf(config.special[i].path) > -1) {
                yield proxy({ url: config.special[i].apihost + _path });
                return;
            }
        }
        
        for (var i = 0; i < config.common.length; i++) {
            if (config.common[i].route.test(_path)) {
                yield proxy({ url: config.common[i].host + _path });
                return;
            }
        }
        yield next;
    } else {

        yield next;
    }
};