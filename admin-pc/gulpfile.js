var gulp = require("gulp");
// var rename = require("gulp-rename");
var babel = require('gulp-babel');
var path = require('path');
// var concat = require('./modules/gulp-concat');
var through = require('through2');
// var sourcemaps = require('gulp-sourcemaps');
var sass = require("gulp-sass");
var react = require("gulp-react");
var outpath = "public/assets";
var plumber = require('gulp-plumber');

//sass
gulp.task('sass', function () {
    return gulp.src(["dev/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(through.obj(function (f, e, cb) {
            f.base = "./dev";
            this.push(f);
            cb();
        }))
        .pipe(gulp.dest(outpath+"/css"));
});
gulp.task('sass-a', function () {
    gulp.watch(["dev/**/*.scss"], function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.src(event.path)
            .pipe(plumber())
            .pipe(sass().on('error', sass.logError))
            .pipe(through.obj(function (f, e, cb) {
                f.base = "./dev";
                this.push(f);
                cb();
            }))
            .pipe(gulp.dest(outpath+"/css"))
    });
});


//react
gulp.task('react', function () {
    return gulp.src('dev/**/**/*.jsx')
        .pipe(through.obj(function (f, e, cb) {
            console.log(f.path);
            this.push(f);
            cb();
        }))
        // .pipe(buildrequire())
        // .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(through.obj(function (f, e, cb) {
            // var str = f.contents.toString();
            // str = str.replace(/"use strict";/g, "");
            // f.contents = new Buffer(str);
            f.base = "./dev";
            this.push(f);
            cb();
        }))
        // .pipe(removeUseStrict())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outpath));    

});
gulp.task('react-a', () => {
    gulp.watch(['dev/**/**/*.jsx'], function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.src(event.path)
            .pipe(plumber())
            // .pipe(buildrequire())
            // .pipe(sourcemaps.init())
            .pipe(react())
            .pipe(babel({
                presets: ['es2015']
            }))
            // .pipe(removeUseStrict())
            .pipe(through.obj(function (f, e, cb) {
                // var str = f.contents.toString();
                // str = str.replace(/"use strict";/g, "");
                // f.contents = new Buffer(str);
                f.base = "./dev";
                this.push(f);
                cb();
            }))
            // .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(outpath))
            .pipe(through.obj(function (f, e, cb) {
                console.log(f.path);
                cb();
            }));
    });
});
gulp.task('assets', function () {
    return gulp.src(['dev/**/assets/*.*', 'dev/**/*.js'])
        .pipe(gulp.dest(outpath));
});
gulp.task('libs', function () {
    return gulp.src(["libs/**/*.*"])
        .pipe(gulp.dest('public/libs'));
});
gulp.task('assets-a', () => {
    gulp.watch(['dev/**/asssets/*.*'], function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.src(event.path)
            .pipe(through.obj(function (f, e, cb) {
                // var str = f.contents.toString();
                // str = str.replace(/"use strict";/g, "");
                // f.contents = new Buffer(str);
                f.base = "./dev";
                this.push(f);
                cb();
            }))
            // .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(outpath))
            .pipe(through.obj(function (f, e, cb) {
                console.log(f.path);
                cb();
            }));
    });
});

gulp.task('games', function () {
    return gulp.src(["dev/games/**/*.*"])
        .pipe(gulp.dest('public/games'));
});
gulp.task('games-a', function () {
    gulp.watch(["dev/games/**/*.*"], function (event) {
        return gulp.src(["dev/games/**/*.*"])
            .pipe(gulp.dest('public/games'));
    });
});
// gulp.task('default', ['assets','libs']);
// gulp.task('dev', ['sass-a', 'assets-a']);
gulp.task('default', ['games']);
gulp.task('dev', ['games-a']);