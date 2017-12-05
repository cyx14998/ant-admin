/**
 * 首页
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Grid
} from 'eui-mobile';

import './index.less';

import customer from '../../assets/index_customer.png';
import task from '../../assets/index_task.png';
import staff from '../../assets/index_staff.png';

const data = [{
    icon: customer,
    text: '客户'
}, {
    icon: task,
    text: '任务',
}, {
    icon: staff,
    text: '员工',
}];
class IndexTabBar1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    //item 点击
    itemClick(el) {
        if (el.text == '客户') {
            window.location.href = '/companyList.html';
            console.log('跳转到客户列表');
        } else if (el.text == '任务') {
            window.location.href = '/taskList.html';
            console.log('跳转到任务列表');
        } else if (el.text == '员工') {
            window.location.href = '/staffList.html';
            console.log('跳转到员工列表');
        }
    }
    render() {
        return (
            <div className="content" >
                <span className="top"></span>
                <div className="listBox">
                    <Grid data={data} columnNum={3} onClick={this.itemClick.bind(this)} />
                </div>
            </div>
        )
    }
}


export default IndexTabBar1;