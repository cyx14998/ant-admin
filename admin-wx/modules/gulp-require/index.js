"use strict"
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require("gulp-rename");

const basepath = path.join(__dirname, '../../');
module.exports = function precompile(options) {

    return through.obj(function(file, enc, cb) {
        if (file.isNull())
            return cb();
        if (file.isStream())
            return cb(new Error(PLUGIN_NAME + ': streaming is not supported'));
        var self = this;
        var mpath = path.dirname(file.path) + '/';

        var oldstr = file.contents.toString();
        var conf = require(path.dirname(file.path) + '/config.json');

        var amdlist = new Array();
        var cmdlist = new Array();
        for (var i = 0; i < conf.dependency.length; i++) {
            if (/.css$/.test(conf.dependency[i])) {
                amdlist.push('"css!' + conf.dependency[i].replace(".css", "") + '"');
            } else {
                amdlist.push('"' + conf.dependency[i] + '"');
            }
            cmdlist.push('"' + conf.dependency[i] + '"');
        }

        var ntxt = '(function (_module) {\r\n';
        ntxt += ' if (typeof (define) != "undefined" && define.amd) {\r\n';
        ntxt += ' define([' + amdlist.join(',') + '], _module);\r\n';
        ntxt += ' }\r\n';

        ntxt += ' else if (typeof (define) != "undefined" && define.cmd) {\r\n';
        ntxt += ' define("' + conf.path + '", [' + cmdlist.join(',') + '], function (require, exports, module) {\r\n';
        ntxt += 'var Module = require("base/0.2.0/module");\r\n';
        ntxt += 'return _module(Module);\r\n';
        ntxt += '});\r\n';
        ntxt += ' }\r\n';
        ntxt += '  else {\r\n';
        ntxt += ' window.modules = window.modules || {};\r\n';
        ntxt += ' window.modules.Module = _module();\r\n';
        ntxt += '}\r\n';
        ntxt += '})';

        ntxt += oldstr;

        file.contents = new Buffer(ntxt);
        self.push(file);

        cb();
    })
}