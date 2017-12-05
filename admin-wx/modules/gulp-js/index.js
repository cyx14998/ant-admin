var through = require('through2');
var gutil = require('gulp-util');

module.exports = function precompile(options) {

    return through.obj(function(file, enc, cb) {
        if (file.isNull())
            return cb();
        if (file.isStream())
            return cb(new Error(PLUGIN_NAME + ': streaming is not supported'));
        var self = this;

        var Page = require(file.path);
        file.path = gutil.replaceExtension(file.path, '.js');
        var jsstr = '';
        jsstr += Page.outJs() + '\r\n';
        file.contents = new Buffer(jsstr);

        self.push(file);

        return cb();

        // file.path = gutil.replaceExtension(file.path, '.html');

        // file.contents = new Buffer(text);


        // this.push(file);

        // cb();
    })
}