    import React from "react"
    import ReactDOM from "react-dom"
 
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '18896592996',
            code: '',
            buttonText: '验证码',
        };
    }
    handleMobile(e) {
        this.setState({mobile: e.target.value});
    }
    getCode(){
        var self = this;  
        var data = {mobile: self.state.mobile};
        console.log(data);
        // $.post("/api/sms/sendsms",data,function(result){
        //     console.log(result);
        // });
        $.post("http://wx.yuzhiyi.cc/emapi/wechat/Subscribe", data, function (result) {
            console.log(result);
        });
        // var InterValObj; //timer变量，控制时间
        // var count = 5; //间隔函数，1秒执行
        // var curCount;//当前剩余秒数
        // //向后台发送处理数据
        // $.post("/api/sms/sendcode",data,function(result){
        //     console.log(result);
        //     // if(data.code==true){
        //             curCount = count;
        //             //设置button效果，开始计时
        //             $(".getCode").attr("disabled", "true");
        //             $(".getCode").val(curCount + "秒内有效");
        //             InterValObj = window.setInterval(()=>{
        //                 if (curCount == 0) {
        //                     window.clearInterval(InterValObj);//停止计时器
        //                     $(".getCode").val("重新发送");
        //                 }else {
        //                     curCount--;
        //                     $(".getCode").val(curCount + "秒内有效");
        //                 }}, 1000); //启动计时器，1秒执行一次
        //         });
    } 
        // $.ajax({
        //     type: "POST",
        //     url: "/api/sms.j",
        //     // data: $('#fm').serialize(), //序列化表单值
        //     data: {
        //         mobile: self.state.mobile,
        //         // code: self.state.code
        //     },
        //     async: true,
        //     success: function(data) {
        //         console.log("发送成功",data);
        //     },
        //     error: function(request){
        //         console.log("发送失败");
        //     },     
    //  });
    // }
    handleCode(e) {
        this.setState({code: e.target.value});
        if(e.target.value.length >= 6){
            alert('验证码位6位');
        }
    }
    submit() {
        var self = this;  
        var data = {
            mobile:self.state.mobile,
            code: self.state.code,
        };
        console.log(data);
        $.post("/api/sms/iscode",data,function(result){
            console.log(result);
        });
    }
    render(){
        var mobile = this.state.mobile;
        var code = this.state.code;
        var buttonText = this.state.buttonText;
        return (
                 <div className="container">
                    <h1>会员绑定</h1>
                        <form id="fm" action="POST" >
                            <input type="text" value={mobile} onChange={this.handleMobile.bind(this)}/>
                            <div className="userPw">
                                <input type="text" value={code} onChange={this.handleCode.bind(this)}/>
                                <input type="button" value={buttonText} onClick={this.getCode.bind(this)} className="getCode"></input>
                            </div>
                            <input type="button" value="绑定" className="submit" onClick={this.submit.bind(this)}/>
                        </form>
                     </div>
        );
    }
}
ReactDOM.render(<User></User>, $("#reactwrapper")[0]);
