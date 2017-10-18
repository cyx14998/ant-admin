    var emwechatmsglog=function () {
        this.id= {
        value: null,
        iskey: true,
        dbtype: 'identity',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: false,
        name: 'id',
        info: '编号',
        remark: ''
        };
        this.wechatid= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'wechatid',
        info: '公众号原始id',
        remark: ''
        };
        this.openid= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'openid',
        info: '微信用户id',
        remark: ''
        };
        this.datajson= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'datajson',
        info: '消息内容（json格式）',
        remark: ''
        };
        this.msgtype= {
        value: null,
        iskey: false,
        dbtype: 'tinyint',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'msgtype',
        info: '消息类型（1：文本，2：图文,3:图片,4:音频，5：视频，6：菜单，7：关注，8：取消关注，9，扫描二维码）',
        remark: ''
        };
        this.apptype= {
        value: null,
        iskey: false,
        dbtype: 'tinyint',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'apptype',
        info: '应用类型: 1:关注 2:关键字回复，3：自动回复，4：自定义菜单回复',
        remark: ''
        };
        this.sourcetype= {
        value: null,
        iskey: false,
        dbtype: 'tinyint',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'sourcetype',
        info: '来源类型：0：接收信息，1：自定义回复、2：游戏活动，3：资源，4：素材，10：微官网菜单，11：微官网商品,21微服务',
        remark: ''
        };
        this.resultvalue= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'resultvalue',
        info: '发送结果',
        remark: ''
        };
        this.logtype= {
        value: null,
        iskey: false,
        dbtype: 'tinyint',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'logtype',
        info: '日志类型(1,发送,2:接收)',
        remark: ''
        };
        this.createdtime= {
        value: null,
        iskey: false,
        dbtype: 'datetime',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'createdtime',
        info: '创建时间',
        remark: ''
        };
        this.createrid= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'createrid',
        info: '创建人',
        remark: ''
        };
};
module.exports = emwechatmsglog;
