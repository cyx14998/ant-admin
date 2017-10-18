var redis = require('redis'),
    RDS_PORT = 6379,
    RDS_HOST = '10.168.1.165',
    RDS_PWD = '123456',
    RDS_OPTS = { auth_pass: RDS_PWD };

var RedisClient = {
    client: null,
    run: function () {
        function runSample(params) {
            console.log("connect", params);
        }
        function onError(e) {
            console.log("error", e);
        }
        try {
            this.client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
            this.client.on('connect', runSample);
            this.client.on('error', onError);

        } catch (error) {
            console.log("redis启动失败", error);
        }

    },
    setValue: function (key, value, time) {
        this.client.set(key, value);
        if (time) {
            this.client.expire(key, time);
        };
    },
    getValue: async function (key) {
        var self = this;
        return await new Promise(function (resolve) {
            self.client.get(key, function (error, res) {
                if (error) {
                    resolve(null);
                } else {
                    resolve(res);
                }
            });
        });
    },


}

RedisClient.run();
global.RedisClient = RedisClient;
