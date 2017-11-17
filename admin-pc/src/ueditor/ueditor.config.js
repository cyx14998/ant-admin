/**
 * ueditor完整配置项
 * 可以在这里配置整个编辑器的特性
 */
/**************************提示********************************
 * 所有被注释的配置项均为UEditor默认值。
 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
 **************************提示********************************/

(function () {
    
        /**
         * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
         * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
         * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/ueditor/"这样的路径。
         * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
         * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
         * window.UEDITOR_HOME_URL = "/xxxx/xxxx/";
         */
        var URL = './ueditor/' || getUEBasePath();
    
        /**
         * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
         */
        window.UEDITOR_CONFIG = {
    
            //为编辑器实例添加一个路径，这个不能被注释
            UEDITOR_HOME_URL: URL
    
            // 服务器统一请求接口路径
            ,
            serverUrl: '/api/ue'
    
            //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
    
            // , toolbars: [["fullscreen","source","undo","redo","insertunorderedlist","insertorderedlist","link","unlink","help","simpleupload","insertimage","emotion","removeformat","date","bold","italic","fontborder","strikethrough","underline","backcolor","autotypeset","forecolor","justifyleft","justifycenter","justifyright","justifyjustify","paragraph",'fontfamily','fontsize',"lineheight","horizontal","insertcode"]]
    
            ,
            toolbars: [
                [
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                    'print', 'preview', 'searchreplace', 'drafts', 'help'
                ]
            ],
            /* 上传图片配置项 */
            "imageActionName": "uploadimage", /* 执行上传图片的action名称 */
            "imageFieldName": "upfile", /* 提交的图片表单名称 */
            "imageMaxSize": 2048000, /* 上传大小限制，单位B */
            "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */
            "imageCompressEnable": true, /* 是否压缩图片,默认是true */
            "imageCompressBorder": 1600, /* 图片压缩最长边限制 */
            "imageInsertAlign": "none", /* 插入的图片浮动方式 */
            "imageUrlPrefix": "", /* 图片访问路径前缀 */
            "imagePathFormat": "/uploads/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            /* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
            /* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
            /* {time} 会替换成时间戳 */
            /* {yyyy} 会替换成四位年份 */
            /* {yy} 会替换成两位年份 */
            /* {mm} 会替换成两位月份 */
            /* {dd} 会替换成两位日期 */
            /* {hh} 会替换成两位小时 */
            /* {ii} 会替换成两位分钟 */
            /* {ss} 会替换成两位秒 */
            /* 非法字符 \ : * ? " < > | */
            /* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */
    
            /* 涂鸦图片上传配置项 */
            "scrawlActionName": "uploadscrawl", /* 执行上传涂鸦的action名称 */
            "scrawlFieldName": "upfile", /* 提交的图片表单名称 */
            "scrawlPathFormat": "/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "scrawlMaxSize": 2048000, /* 上传大小限制，单位B */
            "scrawlUrlPrefix": "", /* 图片访问路径前缀 */
            "scrawlInsertAlign": "none",
    
            /* 截图工具上传 */
            "snapscreenActionName": "uploadimage", /* 执行上传截图的action名称 */
            "snapscreenPathFormat": "/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "snapscreenUrlPrefix": "", /* 图片访问路径前缀 */
            "snapscreenInsertAlign": "none", /* 插入的图片浮动方式 */
    
            /* 抓取远程图片配置 */
            "catcherLocalDomain": ["127.0.0.1", "localhost", "img.baidu.com"],
            "catcherActionName": "catchimage", /* 执行抓取远程图片的action名称 */
            "catcherFieldName": "source", /* 提交的图片列表表单名称 */
            "catcherPathFormat": "/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "catcherUrlPrefix": "", /* 图片访问路径前缀 */
            "catcherMaxSize": 2048000, /* 上传大小限制，单位B */
            "catcherAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 抓取图片格式显示 */
    
            /* 上传视频配置 */
            "videoActionName": "uploadvideo", /* 执行上传视频的action名称 */
            "videoFieldName": "upfile", /* 提交的视频表单名称 */
            "videoPathFormat": "/ueditor/php/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "videoUrlPrefix": "", /* 视频访问路径前缀 */
            "videoMaxSize": 102400000, /* 上传大小限制，单位B，默认100MB */
            "videoAllowFiles": [
                ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
                ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"], /* 上传视频格式显示 */
    
            /* 上传文件配置 */
            "fileActionName": "uploadfile", /* controller里,执行上传视频的action名称 */
            "fileFieldName": "upfile", /* 提交的文件表单名称 */
            "filePathFormat": "/ueditor/php/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
            "fileUrlPrefix": "", /* 文件访问路径前缀 */
            "fileMaxSize": 51200000, /* 上传大小限制，单位B，默认50MB */
            "fileAllowFiles": [
                ".png", ".jpg", ".jpeg", ".gif", ".bmp",
                ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
                ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
                ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
                ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
            ], /* 上传文件格式显示 */
    
            /* 列出指定目录下的图片 */
            "imageManagerActionName": "listimage", /* 执行图片管理的action名称 */
            "imageManagerListPath": "/uploads/image/", /* 指定要列出图片的目录 */
            "imageManagerListSize": 20, /* 每次列出文件数量 */
            "imageManagerUrlPrefix": "", /* 图片访问路径前缀 */
            "imageManagerInsertAlign": "none", /* 插入的图片浮动方式 */
            "imageManagerAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 列出的文件类型 */
    
            /* 列出指定目录下的文件 */
            "fileManagerActionName": "listfile", /* 执行文件管理的action名称 */
            "fileManagerListPath": "/uploads/file/", /* 指定要列出文件的目录 */
            "fileManagerUrlPrefix": "", /* 文件访问路径前缀 */
            "fileManagerListSize": 20, /* 每次列出文件数量 */
            "fileManagerAllowFiles": [
                ".png", ".jpg", ".jpeg", ".gif", ".bmp",
                ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
                ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
                ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
                ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
            ] /* 列出的文件类型 */
           
    
        };
    
        function getUEBasePath(docUrl, confUrl) {
    
            return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());
    
        }
    
        function getConfigFilePath() {
    
            var configPath = document.getElementsByTagName('script');
    
            return configPath[configPath.length - 1].src;
    
        }
    
        function getBasePath(docUrl, confUrl) {
    
            var basePath = confUrl;
    
    
            if (/^(\/|\\\\)/.test(confUrl)) {
    
                basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');
    
            } else if (!/^[a-z]+:/i.test(confUrl)) {
    
                docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');
    
                basePath = docUrl + "" + confUrl;
    
            }
    
            return optimizationPath(basePath);
    
        }
    
        function optimizationPath(path) {
    
            var protocol = /^[a-z]+:\/\//.exec(path)[0],
                tmp = null,
                res = [];
    
            path = path.replace(protocol, "").split("?")[0].split("#")[0];
    
            path = path.replace(/\\/g, '/').split(/\//);
    
            path[path.length - 1] = "";
    
            while (path.length) {
    
                if ((tmp = path.shift()) === "..") {
                    res.pop();
                } else if (tmp !== ".") {
                    res.push(tmp);
                }
    
            }
    
            return protocol + res.join("/");
    
        }
    
        window.UE = {
            getUEBasePath: getUEBasePath
        };
    
    })();