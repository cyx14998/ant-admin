var request = require('request');

var HttpClient = {
    post: function () {

    },
    asyncpost: async function (options) {
        options.headers = options.headers || { "Connection": "close" };
        options.method = "post";
        return await new Promise(function (resolve) {
            const req = request(options, function (error, response, body) {
                console.log(body);
                if (error) {
                    resolve({ code: -1, message: error.message });
                } else {
                    resolve(body);
                }
            });
        });

    }
};



module.exports = HttpClient;