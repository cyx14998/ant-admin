var gulp = require("gulp");
var razor=require("./modules/gulp-razor");
// gulp.task('default', ['assets','libs']);
// gulp.task('dev', ['sass-a', 'assets-a']);
gulp.task('razor', function () {
    return gulp.src(["views/admin/*.cshtml"])
        .pipe(razor({
            jsPath:"/", // 192.168.2.182
            cssPath:"/",
            assetsPath:"/",
        }))
        // .pipe(through.obj(function (f, e, cb) {
        //     f.base = "./dev";
        //     this.push(f);
        //     cb();
        // }))
        .pipe(gulp.dest("public/admin"));
});

gulp.task('default', ['razor']);