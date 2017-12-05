var through = require('through2');
var gutil = require('gulp-util');
// var Page = require('../../src/views/index');

module.exports = function precompile(options) {

    return through.obj(function(file, enc, cb) {
        if (file.isNull())
            return cb();
        if (file.isStream())
            return cb(new Error(PLUGIN_NAME + ': streaming is not supported'));
        var self = this;

        var Page = require(file.path);
        file.path = gutil.replaceExtension(file.path, '.cshtml');
        // console.log(file.contents);
        // console.log(Page); 
        file.contents = new Buffer(Page.outHtml());

        self.push(file);

        return cb();

        // file.path = gutil.replaceExtension(file.path, '.html');

        // file.contents = new Buffer(text);


        // this.push(file);

        // cb();
    })
}