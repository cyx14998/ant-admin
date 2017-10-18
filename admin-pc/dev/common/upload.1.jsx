import React from 'react';

var iframeCount = 0;
var defOpt = {
    trigger: null, //此项可为空,为空时,通过调用open触发选择文件
    name: null,
    action: '/api/user/upload',
    maxSize: "2mb",
    accept: null,
    data: null,
    filter: null, //支持文件格式 "image/gif,image.jpg" 
    multiple: true, //多文件上传
    hideDeleteBtn: false,
    style: "simple",//vertical\horizontal
    progress: true,
    beforeUpload: function () {
        return true;
    },
    beforeClick: function (key) {
        return true;
    },
    nameFormat: function (itemdata) {
        return itemdata["name"];
    },
    idFormat: function (itemdata) {
        return itemdata["id"];
    },
    srcFormat: function (itemdata) {
        return itemdata["src"];
    },
    showFileList: true,
    //上传之后
    onUploaded: function (response, files, berth) {
        console.log(response, files, berth);
    }
};
var Methods = {
    open: function (res) {
        var self = this;
        self.uploader.settings.action = this.props.action;
        $(this.uploader.form).find("[type=file]").click();
        if (res) {
            self.__onceUpload = function (response) {
                res(response, self.uploader._files);
                self.__onceUpload = null;
            }
        }

    },
    getAllFileInfo: function (obj) {
        var self = this;
        var info = [];
        self.state.uploadList.map(function (item) {
            info.push({
                id: item.id,
                src: item.src,
                name: item.name
            })
        })

        return info;
    },
    showAllFile: function (data, res) {
        var self = this;
        var dataSource = [];
        data && data.map(function (item) {
            self.state.uploadList.push(item)
        })
        self.setState({ uploadList: self.state.uploadList })
        if (typeof res == "function") {
            res();
        }



    },

    getFileType: function (name) {
        var image = ["jpg", "JPG", "png", "PNG", "gif", "GIF"];
        var word = ["doc", "docx"];
        var excel = ["xls", "xlsx"];
        var ppt = ["ppt", "pptx"];
        var type = name.substring(name.lastIndexOf(".") + 1);
        if ($.inArray(type, image) >= 0) {
            type = "image";
        } else if ($.inArray(type, word) >= 0) {
            type = "word";
        } else if ($.inArray(type, excel) >= 0) {
            type = "excel";
        } else if ($.inArray(type, ppt) >= 0) {
            type = "ppt";
        } else {
            type = "other";
        }
        return type;
    },
    //生成随机数
    __uuid: function () {
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
    },
    uploadFile: function () {
        var self = this;
        if (this.props.filter) {
            for (var i = 0; i < self.files.length; i++) {
                var filetype = self.files[i].name.split('.').last(); //self._files[i].type
                if (this.props.filter.indexOf(filetype) < 0) {
                    var conf = {
                        type: "warning",
                        align: "center",
                        content: "上传文件格式只支持" + this.props.filter, //内容

                    };
                    dialog.prompt(conf);
                    this.value = "";
                    return;
                }
            }
        }


        if (this.props.max_file_size) {
            for (var i = 0; i < self.files.length; i++) {
                if (self._files[i].size > this.props.max_file_size) {
                    var conf = {
                        type: "warning",
                        align: "center",
                        content: "文件大小不能超过" + this.props.maxSize, //内容

                    };
                    dialog.prompt(conf);
                    this.value = "";
                    return;
                }
            }
        }

        // build a FormData
        var form = new FormData();
        // use FormData to upload
        if (self.files.length) {
            self.files.map(function (file, i) {
                form.append(i, file);
            });
            //form.append('images',self.files);
            // $.ajax({
            //     url: this.props.action,
            //     type: 'post',
            //     //dataType: "html",
            //     processData: false,
            //     contentType: false,
            //     data: form,
            //     // xhr: optionXhr,
            //     context: this,
            //     success: self.uploader.settings.success,
            //     error: self.uploader.settings.error
            // });
            $.ajax({
                url: this.props.action,
                type: 'POST',
                data: form,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: self.uploader.settings.success
            });
        }
    }

};
var Upload = React.createClass({
    mixins: [Methods],
    getInitialState: function () {
        return { uploadList: [] };
    },
    __initTrigger: function (obj) {
        var self = this;
        obj.success(function (response) {
            if (self.props.onUploaded) {
                self.props.onUploaded(response, obj._files, obj.__berth);
            }
            self.trigger("success", response, obj._files, obj.__berth);
        });
        obj.error(function (file) {
            self.trigger("error", file, obj.__berth);
        });

        //$(op.trigger).click(function () {
        //    console.log(1);
        //})

        $(obj.form).on('click', '[type=file]', function (e) {
            if (self.props.beforeClick) {
                return self.props.beforeClick($(this).attr('data-key'), obj.__berth, obj);
            }
            return true;
        });
    },
    __sizeFormat: function (str) {
        if (/kb/i.test(str)) {
            return str.replace(/kb/i, '') * 1024;
        } else if (/mb/i.test(str)) {
            return str.replace(/mb/i, '') * 1024 * 1024;
        } else if (/gb/i.test(str)) {
            return str.replace(/gb/i, '') * 1024 * 1024;
        } else if (/tb/i.test(str)) {
            return str.replace(/tb/i, '') * 1024 * 1024;
        } else {
            return str;
        }
    },
    __typeFormat: function (str) {
        if (!str) {
            return;
        }
        var strs = str.split(/\s|,/);
        var nstrs = new Array();
        for (var i = 0; i < strs.length; i++) {
            var nstr = ""
            switch (strs[i]) {
                case "jpg":
                    nstr = 'image/jpeg';
                    break;
                case "jpeg":
                    nstr = 'image/jpeg';
                    break;
                case "gif":
                    nstr = 'image/gif';
                    break;
                case "png":
                    nstr = 'image/png';
                    break;
                case "doc":
                    nstr = 'application/msword';
                    break;
                case "docx":
                    nstr = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                    break;
                case "xls":
                    nstr = 'application/vnd.ms-excel';
                    break;
                case "xlxs":
                    nstr = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                    break;
                case "txt":
                    nstr = 'text/plain';
                    break;
                default:
                    nstr = strs[i];
                    break;
            }
            nstrs.push(nstr);
        }
        return nstrs.join(',');
    },
    //在预览的情况下生成文件url
    __picUrlFormat: function (file) {
        var self = this;
        self._files = file;
        if (self.state.uploadList && self.state.uploadList.length) {
            self.state.uploadList.map(function (file, i) {
                if (/image\/\w+/.test(file.type)) {
                    var reader = new FileReader();
                    //将文件以Data URL形式读入页面  
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        $("." + file.id + " img").attr("src", this.result)
                    }
                }
            });
        }
    },
    deleteItem: function (key) {
        var self = this;
        self.state.uploadList.map(function (file, i) {
            if (file.id == key) {
                self.state.uploadList.removeAt(i);
            }
        });
        self.setState({ uploadList: self.state.uploadList })

    },
    styleInit: function (e, item) {
        var self = this;
        var _name = self.props.nameFormat(item);
        var _id = self.props.idFormat(item);
        var _src = self.props.srcFormat(item);
        if (self.props.style == "simple") {
            var style = <i className="bico bico-clip"></i>
        } else {
            if (/image\/\w+/.test(item.type)) {
                var style = <span className={"img-contain " + _id} ><img src={_src} /></span>
            } else if (item.type == "application/pdf") {
                var style = <span className="icon-pdf bico-style" ></span>
            } else if (item.type == "application/msword" || item.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                var style = <span className="icon-word bico-style" ></span>
            } else if (item.type == "application/vnd.ms-excel" || item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                var style = <span className="icon-excel bico-style" ></span>
            } else if (item.type == "application/octet-stream" || item.type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || item.type == "application/vnd.ms-powerpoint") {
                var style = <span className="icon-ppt bico-style" ></span>
            } else if (item.type == "text/plain" || item.type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || item.type == "application/vnd.ms-powerpoint") {
                var style = <span className="icon-txt bico-style" ></span>
            } else {
                var style = <span className="img-contain"></span>
            }

        }
        return style;
    },
    render: function () {
        var self = this;
        var dom = <div style={{
            "background-color": "blue",
            width: "1.3rem",
            height: "1.3rem",
            display: "block",
            position: "relative"
        }}
            ref="main"
        >
        </div>
        return dom;
    },
    componentDidMount: function () {
        var self = this;
        var op = $.extend({}, this.props);
        op.trigger =$(this.refs.main);
        op.max_file_size = self.__sizeFormat(this.props.maxSize);
        op.upload = this;

        // if (o_trigger.length > 1) { //批量处理
        //     $.each(o_trigger, function (i, v) {
        //         var _opt = $.extend({}, op);
        //         _opt.trigger = this;
        //         var uploader = new Uploader(_opt);
        //         self.__initTrigger(uploader);
        //     });
        // } else {
        self.uploader = new Uploader(op);
        self.__initTrigger(self.uploader);
        // }
        // this.on("success", function (e, response) {
        //     if (self.__onceUpload) {
        //         self.__onceUpload(response);
        //     }
        // });
        //uploader.change(function (file) {
        //    self.trigger("change", file);
        //});
        if (self.props.trigger) {
            $(document).on("click", self.props.trigger, function () {
                self.open();
            })
        }
    },

});
Upload.defaultProps = defOpt;

function Uploader(options) {
    if (!(this instanceof Uploader)) {
        return new Uploader(options);
    }
    if (isString(options)) {
        options = { trigger: options };
    }

    var settings = {
        trigger: null,
        name: null,
        action: null,
        data: null,
        accept: null,
        change: null,
        error: null,
        multiple: true,
        success: null
    };
    if (options) {
        $.extend(settings, options);
    }
    var $trigger = $(settings.trigger);
    this.__berth = $trigger[0];
    settings.action = settings.action || $trigger.data('action') || '/upload';
    settings.name = settings.name || $trigger.attr('name') || $trigger.data('name') || 'file';
    settings.data = settings.data || parse($trigger.data('data'));
    settings.accept = settings.accept || $trigger.data('accept');
    settings.success = settings.success || $trigger.data('success');
    this.settings = settings;

    this.setup();
    this.bind();
}
// initialize
// create input, form, iframe
Uploader.prototype.setup = function () {
    this.form = $(
        '<form method="post" enctype="multipart/form-data"' +
        'target="" action="' + this.settings.action + '" />'
    );

    this.iframe = newIframe();
    this.form.attr('target', this.iframe.attr('name'));

    var data = this.settings.data;
    this.form.append(createInputs(data));
    if (window.FormData) {
        this.form.append(createInputs({ '_uploader_': 'formdata' }));
    } else {
        this.form.append(createInputs({ '_uploader_': 'iframe' }));
    }

    var input = document.createElement('input');
    input.type = 'file';
    input.name = this.settings.name;

    if (this.settings.accept) {
        input.accept = this.settings.accept;
    }
    if (this.settings.multiple) {
        input.multiple = true;
        input.setAttribute('multiple', 'multiple');
    }
    this.input = $(input);

    var $trigger = $(this.settings.trigger);
    this.input.attr('hidefocus', true).css({
        position: 'absolute',
        top: 0,
        right: 0,
        opacity: 0,
        outline: 0,
        cursor: 'pointer',
        width: $trigger.outerWidth(),
        height: $trigger.outerHeight(),
        fontSize: Math.max(64, $trigger.outerHeight() * 5)
    });

    input.setAttribute("data-key", $trigger.attr("data-key"));
    this.form.append(this.input);
    this.form.css({
        position: 'absolute',
        top: $trigger.offset().top,
        left: $trigger.offset().left,
        overflow: 'hidden',
        width: $trigger.outerWidth(),
        height: $trigger.outerHeight(),
        zIndex: findzIndex($trigger) - 10
    }).appendTo('body');
    return this;
};

// bind events
Uploader.prototype.bind = function () {
    var self = this;
    var $trigger = $(self.settings.trigger);
    $trigger.mouseenter(function () {
        var $obj = $(this);
        self.__berth = this;
        self.form.css({
            top: $obj.offset().top,
            left: $obj.offset().left,
            width: $obj.outerWidth(),
            height: $obj.outerHeight(),
        });
    });
    self.bindInput();
};

Uploader.prototype.bindInput = function () {
    var self = this;
    self.input.change(function (e) {
        if (self.settings.uploadAfter) {
            // console.log(self);
            var fileList = [];
            Array.prototype.slice.call(this.files).map(function (file, i) {
                var uuid = self.settings.upload.__uuid();
                file.id = uuid;
                file.src = "#";
                fileList.push(file);

            });
            if (self.settings.upload.props.showFileList) {
                self.settings.upload.showAllFile(fileList, function () {
                    self.settings.upload.__picUrlFormat();
                });
            }
            self.settings.beforeUpload && self.settings.beforeUpload(this.files)
            self.input.val('');


            return;
        }
        if (self.settings.beforeUpload && !self.settings.beforeUpload(this.files)) {
            return;
        }
        // ie9 don't support FileList Object
        // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
        self._files = this.files || [{
            name: e.target.value
        }];
        if (self.settings.filter) {
            for (var i = 0; i < self._files.length; i++) {
                var filetype = self._files[i].name.split('.').last(); //self._files[i].type
                if (self.settings.filter.indexOf(filetype) < 0) {
                    var conf = {
                        type: "warning",
                        align: "center",
                        content: "上传文件格式只支持" + self.settings.filter, //内容

                    };
                    dialog.prompt(conf);
                    this.value = "";
                    return;
                }
            }
        }


        if (self.settings.max_file_size) {
            for (var i = 0; i < self._files.length; i++) {
                if (self._files[i].size > self.settings.max_file_size) {
                    var conf = {
                        type: "warning",
                        align: "center",
                        content: "文件大小不能超过" + self.settings.maxSize, //内容

                    };
                    dialog.prompt(conf);
                    this.value = "";
                    return;
                }
            }
        }


        var file = self.input.val();
        if (self.settings.change) {
            self.settings.change.call(self, self._files);
        } else if (file) {
            return self.submit();
        }
    });
};



// handle submit event
// prepare for submiting form
Uploader.prototype.submit = function () {
    var self = this;
    if (window.FormData && self._files) {
        // build a FormData
        var form = new FormData(self.form.get(0));
        // use FormData to upload
        form.append(self.settings.name, self._files);
        //进度条
        var optionXhr;
        $.ajax({
            url: self.settings.action,
            type: 'post',
            //dataType: "html",
            processData: false,
            contentType: false,
            data: form,
            //xhr: optionXhr,
            context: this,
            success: self.settings.success,
            error: self.settings.error
        });
        return this;
    } else {
        // iframe upload
        self.iframe = newIframe();
        self.form.attr('target', self.iframe.attr('name'));
        self.form.attr('action', self.settings.action);

        $('body').append(self.iframe);
        self.iframe.one('load', function () {
            // https://github.com/blueimp/jQuery-File-Upload/blob/9.5.6/js/jquery.iframe-transport.js#L102
            // Fix for IE endless progress bar activity bug
            // (happens on form submits to iframe targets):
            $('<iframe src="javascript:false;"></iframe>')
                .appendTo(self.form)
                .remove();
            var response;
            try {
                response = $(this).contents().find("body").html();
            } catch (e) {
                response = "cross-domain";
            }
            $(this).remove();
            if (!response) {
                if (self.settings.error) {
                    self.settings.error(self.input.val());
                }
            } else {
                if (self.settings.success) {
                    self.settings.success(response);
                }
            }
        });
        self.form.submit();
    }
    return this;
};

Uploader.prototype.refreshInput = function () {
    //replace the input element, or the same file can not to be uploaded
    var newInput = this.input.clone();
    this.input.before(newInput);
    this.input.off('change');
    this.input.remove();
    this.input = newInput;
    this.bindInput();
};

// handle change event
// when value in file input changed
Uploader.prototype.change = function (callback) {
    if (!callback) {
        return this;
    }
    this.settings.change = callback;
    return this;
};

// handle when upload success
Uploader.prototype.success = function (callback) {
    var self = this;
    this.settings.success = function (response) {
        self.refreshInput();
        if (callback) {
            callback(response);
        }
        //me.input.value = "";
    };

    return this;
};

// handle when upload error
Uploader.prototype.error = function (callback) {
    var me = this;
    this.settings.error = function (response) {
        if (callback) {
            me.refreshInput();
            callback(response);
        }
    };
    return this;
};

// enable
Uploader.prototype.enable = function () {
    this.input.prop('disabled', false);
    this.input.css('cursor', 'pointer');
};

// disable
Uploader.prototype.disable = function () {
    this.input.prop('disabled', true);
    this.input.css('cursor', 'not-allowed');
};

// Helpers
// -------------

function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
}

function createInputs(data) {
    if (!data) return [];

    var inputs = [],
        i;
    for (var name in data) {
        i = document.createElement('input');
        i.type = 'hidden';
        i.name = name;
        i.value = data[name];
        inputs.push(i);
    }
    return inputs;
}

function parse(str) {
    if (!str) return {};
    var ret = {};

    var pairs = str.split('&');
    var unescape = function (s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    };

    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var key = unescape(pair[0]);
        var val = unescape(pair[1]);
        ret[key] = val;
    }

    return ret;
}

function findzIndex($node) {
    var parents = $node.parentsUntil('body');
    var zIndex = 0;
    for (var i = 0; i < parents.length; i++) {
        var item = parents.eq(i);
        if (item.css('position') !== 'static') {
            zIndex = parseInt(item.css('zIndex'), 10) || zIndex;
        }
    }
    return zIndex;
}

function newIframe() {
    var iframeName = 'iframe-uploader-' + iframeCount;
    var iframe = $('<iframe name="' + iframeName + '" />').hide();
    iframeCount += 1;
    return iframe;
}

function MultipleUploader(options) {
    if (!(this instanceof MultipleUploader)) {
        return new MultipleUploader(options);
    }

    if (isString(options)) {
        options = { trigger: options };
    }
    var $trigger = $(options.trigger);

    var uploaders = [];
    $trigger.each(function (i, item) {
        options.trigger = item;
        uploaders.push(new Uploader(options));
    });
    this._uploaders = uploaders;
}
MultipleUploader.prototype.submit = function () {
    $.each(this._uploaders, function (i, item) {
        item.submit();
    });
    return this;
};
MultipleUploader.prototype.change = function (callback) {
    $.each(this._uploaders, function (i, item) {
        item.change(callback);
    });
    return this;
};
MultipleUploader.prototype.success = function (callback) {
    $.each(this._uploaders, function (i, item) {
        item.success(callback);
    });
    return this;
};
MultipleUploader.prototype.error = function (callback) {
    $.each(this._uploaders, function (i, item) {
        item.error(callback);
    });
    return this;
};
MultipleUploader.prototype.enable = function () {
    $.each(this._uploaders, function (i, item) {
        item.enable();
    });
    return this;
};
MultipleUploader.prototype.disable = function () {
    $.each(this._uploaders, function (i, item) {
        item.disable();
    });
    return this;
};
MultipleUploader.Uploader = Uploader;

Upload.defaultProps = defOpt;


module.exports = Upload;
