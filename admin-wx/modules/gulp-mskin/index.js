"use strict"
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require("gulp-rename");
var config = require('./config.json');

const basepath = path.join(__dirname, '../../');
module.exports = function precompile(options) {
    // console.log(config);
    // var skinconfig = JSON.parse(config);


    return through.obj(function(file, enc, cb) {
        if (file.isNull())
            return cb();
        if (file.isStream())
            return cb(new Error(PLUGIN_NAME + ': streaming is not supported'));
        var self = this;
        var mpath = path.dirname(file.path) + '/';
        // console.log(mpath);

        var conf = { skin: ["blue", "green"] };
        for (var i = 0; i < conf.skin.length; i++) {
            var skinname = conf.skin[i];
            var skinfile = new gutil.File({
                base: basepath + 'dev/',
                cwd: basepath,
                path: mpath + skinname + '.less'
            });

            var str = '.skin-' + skinname + '{\r\n';
            str += file.contents.toString();
            str += '\r\n@import "' + config.skinpath + 'skin/' + skinname + 'config";\r\n ';
            str += '}\r\n';
            // console.log(str);
            skinfile.contents = new Buffer(str);
            self.push(skinfile);
        }

        //读取配置
        // var conf = JSON.parse(file.contents.toString());
        // var outpath = file.path; //输出目录
        // var mpath = path.dirname(file.path) + '/module/';

        cb();
    })
}


// var gettext = function *(mpath) {
//     var aaa = new Promise(function(resolve, reject) {
//         fs.readFile(mpath, (err, data) => {
//             if (err) throw err;
//             // console.log(data.toString());
//             resolve(data.toString());
//         });
//     });
//     return yield aaa;
// }

// function getalltext(mpath) {
//     var mless = "";
//     return new Promise(function(resolve, reject) {
//         fs.readdir(mpath, function(err, files) {
//             // console.log(files[0]);
//             files.forEach(function(item) {
//                 if (!/.less$/.test(item)) {
//                     return true;
//                 }
//                 mless = gettext(mpath + item);
//             });
//             console.log(mless);
//             resolve(mless);
//         });
//     });
// }