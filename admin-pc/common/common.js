 var request = require('request');
 
var $fn = {};
$fn.uuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 0
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}

$fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false,
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,
        trim = String.prototype.trim,
        indexOf = Array.prototype.indexOf,
        class2type = {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Function]": "function",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object RegExp]": "regexp",
            "[object Object]": "object"
        },
        jQuery = {
            isFunction: function (obj) {
                return jQuery.type(obj) === "function"
            },
            isArray: Array.isArray ||
            function (obj) {
                return jQuery.type(obj) === "array"
            },
            isWindow: function (obj) {
                return obj != null && obj == obj.window
            },
            isNumeric: function (obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj)
            },
            type: function (obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
            },
            isPlainObject: function (obj) {
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {
                    return false
                }
                try {
                    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false
                    }
                } catch (e) {
                    return false
                }
                var key;
                for (key in obj) { }
                return key === undefined || hasOwn.call(obj, key)
            }
        };
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {}
    }
    if (length === i) {
        target = this;
        --i;
    }
    for (i; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue
                }
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : []
                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    // WARNING: RECURSION
                    target[name] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$fn.post = function (opt) {
    var http = require('http');
    // var qs = require('querystring');
    var iconv = require('iconv-lite');
    // var content = qs.stringify(data);

    var options = {
        hostname: '127.0.0.1',
        port: 8003,
        // path: url,
        method: 'POST',
        encoding: "utf8",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        callback: function () {

        }
    };

    $fn.extend(options, opt);
    // console.log(options)

    var req = http.request(options, function (res) {
        var arrBuf = [];
        var bufLength = 0;
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        // res.setEncoding('utf8');
        // res.charset = options.encoding;
        res.on('data', function (chunk) {
            // console.log(chunk);
            var str = iconv.decode(chunk, options.encoding);
            options.callback(str);
        })
            .on("end", function () {
                // arrBuf是个存byte数据块的数组，byte数据块可以转为字符串，数组可不行
                // bufferhelper也就是替你计算了bufLength而已 
                // var chunkAll = Buffer.concat(arrBuf, bufLength);
                // var strJson = iconv.decode(chunkAll, 'gb2312'); // 汉字不乱码
                // console.log(strJson);
                // var result = iconv.decode(bufferHelper.toBuffer(), 'GBK');
                // calback(result);
            });
    });

    req.on('error', function (e) {
        options.callback({code:-1,message:e.message});
        console.log('problem with request: ' + e.message);
    });

    // write data to request body  
    req.write(options.data);

    req.end();
};

$fn.get = function (opt) {
    var http;
    var qs = require('querystring');
    if (opt.httptype == "https") {
        http = require('https');
    }
    else {
        http = require('http');
    }
    var options = {
        hostname: '127.0.0.1',
        port: 80,
        // path: url,
        method: 'GET',
        callback: function () {

        }
    };

    $fn.extend(options, opt);

    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            options.callback(chunk);
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}

/**
 * 同步请求（post）
 */
$fn.asyncpost = async function (query) {
    var opt = query;
    var result = await new Promise(function (resolve) {
        opt.callback = function (data) {
            resolve(data);
        }
        $fn.post(opt);
    });
    return result;
}

/**
 * 同步请求（get）
 */
$fn.asyncget = async function (query) {
    var opt = query;
    var result = await new Promise(function (resolve) {
        opt.callback = function (data) {
            resolve(data);
        }
        $fn.get(opt);
    });
    return result;
}

module.exports = $fn;