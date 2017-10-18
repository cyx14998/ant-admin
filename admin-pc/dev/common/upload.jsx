import React from 'react';
class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    onClick() {
        this.refs.file.click();
    }
    onChange(e) {
        var self = this;
        var el = e.target;
        var files = e.target.files;
        if (window.FormData && files && false) {
            // build a FormData
            var form = new FormData(self.refs.form);
            // use FormData to upload
            form.append("file", files);
            //进度条
            var optionXhr;
            $.ajax({
                url: self.props.action,
                type: 'post',
                //dataType: "html",
                processData: false,
                contentType: false,
                data: form,
                //xhr: optionXhr,
                context: el,
                success: self.props.success,
                error: self.props.error
            });
        } else {
            // iframe upload
            self.iframe = self.newIframe();
            self.form.attr('target', self.iframe.attr('name'));
            self.form.attr('action', self.props.action);

            $('body').append(self.iframe);
            self.iframe.one('load', function () {
                // https://github.com/blueimp/jQuery-File-Upload/blob/9.5.6/js/jquery.iframe-transport.js#L102
                // Fix for IE endless progress bar activity bug
                // (happens on form submits to iframe targets):
                $('<iframe src="javascript:false;"></iframe>')
                    .appendTo(self.refs.form)
                    .remove();
                var response;
                try {
                    response = $(this).contents().find("body").html();
                } catch (e) {
                    response = "cross-domain";
                }
                $(this).remove();
                if (!response) {
                    if (self.props.error) {
                        self.props.error(self.input.val());
                    }
                } else {
                    if (self.props.success) {
                        self.props.success(response);
                    }
                }
            });
            self.form.submit();
        }
        // return this;
    }
    newIframe() {
        var iframeCount = 1;
        var iframeName = 'iframe-uploader-' + iframeCount;
        var iframe = $('<iframe name="' + iframeName + '" />').hide();
        iframeCount += 1;
        return iframe;
    }

    newFrom() {
        var self = this;
        this.form = $(
            '<form method="post" enctype="multipart/form-data"' +
            'target="" action="' + this.props.action + '" />'
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

        // if (this.settings.accept) {
        //     input.accept = this.settings.accept;
        // }
        // if (this.settings.multiple) {
        //     input.multiple = true;
        //     input.setAttribute('multiple', 'multiple');
        // }
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
    }
    render() {
        var self = this;
        var dom = <div style={{
            "background-color": "blue",
            width: "1.3rem",
            height: "1.3rem",
            display: "block",
            position: "relative"
        }}
            ref="main"
            onClick={this.onClick.bind(this)}
        >
            <form style={{ visibility: "hidden" }}>
                <input type="file" ref="file" name="file" onChange={this.onChange.bind(this)} />>
        </form>
        </div>
        return dom;
    }
}


module.exports = Upload;
