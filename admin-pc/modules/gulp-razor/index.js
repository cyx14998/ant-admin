var through = require('through2');
var gutil = require('gulp-util');
const _razor = require('../koa-razor/razor');

module.exports = function precompile(options) {
    console.log(options);

    return through.obj(function (file, enc, cb) {

        if (file.isNull())
            return cb();
        if (file.isStream())
            return cb(new Error(PLUGIN_NAME + ': streaming is not supported'));
        var self = this;
        _razor.view(file.path, function (template) {
            if (template) {
                template(options, function (html) {
                    //res.writeHead(200, {'Content-Type': 'text/html'});
                    //res.end(html); 
                    // resolve(html);
                    file.path = gutil.replaceExtension(file.path, '.html');
                    //console.log(file.path);
                    file.contents = new Buffer(html);

                    self.push(file);

                    cb();
                });
            }
            else {
                // resolve("Not Found");
            }
        });

        // file.path = gutil.replaceExtension(file.path, '.html');

        // file.contents = new Buffer(text);


        // this.push(file);

        // cb();
    })
}