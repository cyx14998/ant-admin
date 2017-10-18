var through = require('through2'),
    gutil = require('gulp-util'),
    doT = require('dot'),
    wrapper = {
        amd: function (module) {
            return 'define(["exports"], function (exports) { exports = ' + module.toString() + ' });';
        },
        rjs: function (module) {//requirejs
            return 'define(function () { var dotTmpl = ' + module.toString() + '  ;return dotTmpl;});';
        },
        cjs: function (module) {
            return 'module.exports = ' + module.toString();
        },
        es6: function (module) {
            return 'export default ' + module.toString();
        }
    };

module.exports = function precompile(options) {

    return through.obj(function (file, enc, cb) {

        if (file.isNull())
            return cb();
        if (file.isStream())
            return cb(new Error(PLUGIN_NAME + ': streaming is not supported'));

        file.path = gutil.replaceExtension(file.path, '.js');

        file.contents = new Buffer(
            wrapper[options.type](
                doT.template(
                    file.contents.toString()
                )
            )
        );

        this.push(file);

        cb();
    })
}