/**
 * 企业信息动态列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

// 推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import {
  Table,
  Button,
  Icon,
  Popconfirm,
  Modal,
  DatePicker
} from 'antd';

import {
  getCustomerDynamicList,
  getCustomerDynamicListAdd,
  getCustomerDynamicListDelete
} from '../../common/api/api.customer.dynamic';

import {
  getLocQueryByLabel,
  MyToast
} from '../../common/utils';

const MonthPicker = DatePicker.MonthPicker;
const monthFormat = 'YYYY-MM';

function changeParentState({
  dynamicId,
}) {
  var cusId = getLocQueryByLabel('id');
  parent.window.iframeHook.changePage({
    url: `/customerDynamicEdit.html?id=${cusId}&dynamicId=${dynamicId}#${Math.random()}`,
    breadIncrement: `客户动态信息编辑`,
  })
}

const columns = [
  {
    title: '年',
    dataIndex: 'theYear',
  },
  // {
  //   title: '季度',
  //   dataIndex: 'theQuarter',
  // }, 
  {
    title: '月',
    dataIndex: 'theMonth',
  }, {
    title: '编辑',
    width: 120
  }
];

class CustomerDynamicList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      customerDynamicList: [],

      modalVisible: false,
      selectedMonth: moment(new Date()).format(monthFormat),
    }

    this.getData = this.getData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    columns[2].render = (text, record) => {
      return (
        <div>
          <a style={{ marginRight: '10px' }} title="编辑" onClick={() => changeParentState({
            dynamicId: record.tableId
          })}><Icon type="edit" className="yzy-icon" /></a>
          <Popconfirm title="确定要删除吗？" onConfirm={() => this.deleteItem(record.tableId)}>
            <a title="删除" href="#"><Icon type="delete" className="yzy-icon" /></a>
          </Popconfirm>
        </div>
      )
    }
  }

  componentDidMount() {
    this.getData({});

  }

  getData(params) {
    //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
    getCustomerDynamicList(params).then(res => {
      console.log('getCustomerDynamicList ---', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '获取动态列表失败')
        return;
      }

      this.setState({
        loading: false,
        customerDynamicList: res.data.customerMonthDclarationList.map((item, i) => {

          item.key = i;
          return item;
        })
      })
    }).catch(err => {
      MyToast(err || '获取动态列表失败')
    })
  }

  deleteItem(tableId) {
    getCustomerDynamicListDelete({
      tableId
    }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '删除失败');
        return;
      }

      MyToast('删除成功');

      this.getData({});
    }).catch(err => MyToast(err))
  }


  closeModal() {
    this.setState({
      modalVisible: false
    })
  }

  showModal() {
    this.setState({
      modalVisible: true
    })
  }

  onMonthChange(date, dateString) {
    this.setState({
      selectedMonth: dateString
    })
  }

  addDynamicItem() {
    var month = this.state.selectedMonth.split('-');

    getCustomerDynamicListAdd({
      theYear: month[0],
      theMonth: month[1]
    }).then(res => {
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '添加动态列表失败');
        return;
      }

      MyToast('添加动态列表成功');

      this.getData({});
      this.setState({
        modalVisible: false
      });
    }).catch(err => MyToast('添加动态列表失败'))
  }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-list-wrap">
          <div className="yzy-list-btns-wrap">
            <Button type="primary" style={{ marginLeft: 8 }}
              onClick={this.showModal.bind(this)}>新增</Button>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.customerDynamicList}
            loading={this.state.loading}
            rowClassName={(record, index) => {
              if (index % 2 !== 0) {
                return 'active'
              }
            }}
          />
        </div>

        <Modal visible={this.state.modalVisible} footer={null} onCancel={this.closeModal.bind(this)}>
          <div>
            <span style={{ marginRight: '10px' }}>请选择动态数据区间：</span>
            <MonthPicker
              defaultValue={moment(new Date(), monthFormat)}
              onChange={this.onMonthChange.bind(this)} />
            <Button style={{ marginLeft: '20px' }} type="primary" onClick={this.addDynamicItem.bind(this)}>保存</Button>
          </div>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<CustomerDynamicList />, document.getElementById('root'));