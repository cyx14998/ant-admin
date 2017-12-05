"use strict"
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var concat = require('gulp-concat');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require("gulp-rename");

const basepath = path.join(__dirname, '../../');
module.exports = function precompile(options) {
    var output = options || 'output';
    return through.obj(function(file, enc, cb) {
        if (file.isNull())
            return cb();
        if (file.isStream())
            return cb(new Error(PLUGIN_NAME + ': streaming is not supported'));
        var self = this;

        //读取配置
        var conf = JSON.parse(file.contents.toString());
        // var outpath = file.path; //输出目录

        var mpath = path.dirname(file.path) + '/module/';
        // console.log(basepath);
        gulp.src(mpath + '*.less')
            .pipe(concat("all.less"))
            .pipe(through.obj(function(f, e, c) {
                //批量生产皮肤   
                for (var i = 0; i < conf.skins.length; i++) {
                    // console.log(1);
                    var skinname = conf.skins[i];
                    var lessfile = new gutil.File({
                        base: basepath + 'dev/',
                        cwd: basepath,
                        path: mpath + skinname + '.less'
                    });

                    var str = '@import "../common"; \r\n';

                    str += ' .skin-' + skinname + '{\r\n';
                    str += f.contents.toString();
                    str += '\r\n@import "../skin/' + skinname + 'config";\r\n ';
                    str += ' }\r\n';

                    lessfile.contents = new Buffer(str);

                    this.push(lessfile);
                }
                // f.contents = new Buffer(str);
                // this.push(f);
                return c();
            }))
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(rename(function(path) {
                console.log('path:' + path.dirname);
                path.dirname = path.dirname.replace('\\module', '');
                // path.extname = ".js"
            }))
            .pipe(gulp.dest(output));
        // .pipe(concat("skin.css"))
        // .pipe(rename(function(path) {
        //     console.log('path:' + path.dirname);              
        // }))
        // .pipe(gulp.dest('output'));

        // .pipe(through.obj(function(f, e, c) {
        //     // var str = f.contents.toString();
        //     console.log(f.contents);
        //     // str = '@import "../common.less"' + str;
        //     // resolve(f.contents);
        // }));
        // // mless = getalltext(mpath);
        // var allless = new Promise(function(resolve, reject) {

        // });

        // allless.then(function(value) {
        //     // console.log(value.toString());
        //     // var Page = require(file.path);
        //     file.path = gutil.replaceExtension(file.path, '.less');

        //     file.contents = value;
        //     self.push(file);
        //     // console.log(lessfile);
        //     return cb();
        // })
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