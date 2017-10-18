var fs = require("fs");
/**
 * 
 * 
 * @param {any} on
 * @param {any} aaa
 */
function test() {
    var mpath = "./dev/paging/0.3.0/paging.jsx";
    fs.readFile(mpath, (err, data) => {
        if (err) throw err;
        var str = data.toString();
        var reg = /ATTRS:(\s|)\{((.|\r|\n)*?)\}/;
        var a = str.match(reg);
        if (a != null && a.length > 2) {
            console.log(a[2]);
        }
    });
}


test();