'use strict';

/**
 * Module dependencies.
 */
// const debug = require('debug')('koa-static');
const _razor = require('./razor');
const path = require('path');

/**
 * Expose `serve()`.
 */

module.exports = Razor;

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function Razor(opts, data) {  
    return async function (ctx, next) {  
        var root = opts.root;
        var pathroot = opts.path;
        var _path = "";
        if (opts.fullpath) {//有全路径默认全路径
            _path = opts.fullpath;
        }
        else {
            _path = pathroot + ctx.path.slice(root.length);
        }
        var text = await new Promise(function (resolve) {
            try {
                _razor.view(_path, function (template) {
                    if (template) {
                        template(data, function(html) {
                            //res.writeHead(200, {'Content-Type': 'text/html'});
                            //res.end(html); 
                            resolve(html);
                        });
                    } else {
                        resolve("Not Found!");
                    }
                    // resolve("Not Found aaa");
                });
            } catch (e) {
                resolve(false);
            }

        });
        if (!text) {
            await next;
        }
        ctx.body = text;
    };
};