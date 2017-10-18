    var emresource=function () {
        this.innerid= {
        value: null,
        iskey: true,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: false,
        name: 'innerid',
        info: '编号',
        remark: ''
        };
        this.filename= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'filename',
        info: '文件名',
        remark: ''
        };
        this.filepath= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'filepath',
        info: '文件路径',
        remark: ''
        };
        this.fileext= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'fileext',
        info: '扩展名',
        remark: ''
        };
        this.filetype= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'filetype',
        info: '文件类型（image,vedio,other）',
        remark: ''
        };
        this.fileobject= {
        value: null,
        iskey: false,
        dbtype: 'text',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'fileobject',
        info: '文件内容（image base64）',
        remark: ''
        };
        this.verifycode= {
        value: null,
        iskey: false,
        dbtype: 'varchar',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'verifycode',
        info: '校验码（md5火sha1等）',
        remark: ''
        };
        this.statuscode= {
        value: null,
        iskey: false,
        dbtype: 'tinyint',
        oldvalue: null,
        isreset: false,
        isupdate: false,
        isreadonly: false,
        isnull: true,
        name: 'statuscode',
        info: '状态',
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
module.exports = emresource;
