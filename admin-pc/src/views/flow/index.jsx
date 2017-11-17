/**
 * 员工管理
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  Table,
  Icon,
  Popconfirm
} from 'antd';

import RcSearchForm from '../../components/rcsearchform';
import EditableTableSection from '../../components/editableTable/index';

// RcSearchForm datablob
const rcsearchformData = {
  colspan: 2,
  fields: [{
    type: 'input',
    label: '姓名/手机号',
    name: 'keyword',
    placeholder: '请输入真实姓名或手机号码',
  }]
};

import './index.less';

import {
  uFlowMstList,
  uFlowMstDelete,
  uFlowMstAdd,
  uFlowMstUpdate
} from '../../common/api/api.flow';

import {
  MyToast
} from '../../common/utils';

/**
 * table head
 */
const columns = [
  {
    title: '流程名称',
    dataIndex: 'theName',
  }, {
    title: '关联页面',
    dataIndex: 'sourceLink',
  }, {
    title: '关联表',
    dataIndex: 'tableName',
  }, {
    title: '创建时间',
    dataIndex: 'createDatetime',
  }, {
    title: '最后编辑人',
    dataIndex: 'realName',
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: '140px',
  }
];

//入库单明细新增
const getWarehousingRecord = {
  tableId: '',
  editable: true,
  theName: {
    value: '',
  },
  sourceLink: {
    value: '',
  },
  tableName: {
    value: '',
  },
  createDatetime: {
    value: '',
    disabled: true,
  },
  realName: {
    value: '',
    disabled: true,
  },
};

class Flow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      flowList: [],
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData({});

  }
  getData(params) {
    //查询传参时，接口没有返回对应数据，单位类别暂时写死，应该是写死的，行业类别是访问接口，接口未完成。
    uFlowMstList(params).then(res => {
      console.log('uFlowMstList ---', res)
      if (res.data.result !== 'success') {
        MyToast(res.data.info || '接口失败')
        return;
      }
      var data = res.data.flowMstList;
      this.setState({
        loading: false,
        flowList: this.formatDatasource(data)
      });
    }).catch(err => {
      MyToast(err || '接口失败')
    });
  }


  //数据列表格式化
  formatDatasource(dataSource) {
    var data = dataSource.map(data => {
      return {
        tableId: data.tableId,
        theName: {
          value: data.theName || '',
        },
        sourceLink: {
          value: data.sourceLink || '',
        },
        tableName: {
          value: data.tableName || '',
        },
        createDatetime: {
          value: data.createDatetime || '',
          disabled: true,
        },
        realName: {
          value: data.editor.realName || '',
          disabled: true,
        },
      }
    });

    return data;
  }

  onEditDelete(id) {
    var self = this;
    return new Promise((resolve, reject) => {
      uFlowMstDelete({ tableId: id }).then(res => {
        console.log(res);
        if (res.data.result != 'success') {
          resolve({
            code: -1,
            msg: res.data.info
          });
          return;
        }

        resolve({
          code: 0,
          msg: '删除成功'
        });
      }).catch(err => resolve({ code: -1, msg: err }))
    });
  }

  onSaveUpdate(record) {
    console.log('编辑-----------------------', record);
    var self = this;
    var _record = this.serializeRecord(record);
    return new Promise((resolve, reject) => {
      uFlowMstUpdate({ ..._record, }).then(res => {
        if (res.data.result != 'success') {
          resolve({
            code: -1,
            msg: res.data.info
          });
          return;
        }

        resolve({
          code: 0,
          msg: '编辑成功'
        });
        self.getData({});
      }).catch(err => resolve({ code: -1, msg: err }))
    })
  }

  onSaveAdd(record) {
    console.log('新增-----------------------', record);
    var self = this;
    var _record = this.serializeRecord(record);
    return new Promise((resolve, reject) => {
      uFlowMstAdd({ ..._record, }).then(res => {
        if (res.data.result != 'success') {
          resolve({
            code: -1,
            msg: res.data.info
          });
          return;
        }

        resolve({
          code: 0,
          msg: '新增成功'
        });
        self.getData({});
      }).catch(err => resolve({ code: -1, msg: err }))
    })
  }

  //数据提交格式化
  serializeRecord(record) {
    //file
    if (record.tableId) {
      return {
        tableId: record.tableId,
        theName: record.theName.value,
        sourceLink: record.sourceLink.value,
        tableName: record.tableName.value,
      }
    }
    return {
      theName: record.theName.value,
      sourceLink: record.sourceLink.value,
      tableName: record.tableName.value,
    }

  }

  handleFormSearch(values) {
    console.log('handleSearch ---------', values);
    if (!values.keyword) return;

    this.getData({
      keyword: values.keyword
    });
  }

  // 审批流程子表编辑
  uFlowDtlDetail(record) {
    parent.window.iframeHook.changePage({
      url: '/flowEdit.html?flowMstId=' + record.tableId,
      breadIncrement: '审批流程编辑'
    });
  }

  // 步骤角色列表
  uFlowRoleList(record) {
    parent.window.iframeHook.changePage({
      url: '/flowStep.html?flowDtlId=' + record.tableId,
      breadIncrement: '步骤角色编辑'
    });
  }

  render() {
    return (
      <div className="yzy-page">
        <div className="yzy-search-form-wrap">
          <RcSearchForm {...rcsearchformData}
            handleSearch={this.handleFormSearch.bind(this)} />
        </div>
        <div className="yzy-list-wrap">
          <EditableTableSection
            columns={columns}
            dataSource={this.state.flowList}
            itemDataModel={getWarehousingRecord}
            onDelete={this.onEditDelete.bind(this)}
            onSaveAdd={this.onSaveAdd.bind(this)}
            onSaveUpdate={this.onSaveUpdate.bind(this)}
            loading={this.state.loading}
            CustomerBtn={
              ({ record }) => {
                return (
                  <span>
                    <a title="查看子流程" onClick={this.uFlowDtlDetail.bind(this, record)}><Icon type="eye-o" /></a>
                    <a title="查看步骤" onClick={this.uFlowRoleList.bind(this, record)}><Icon type="bars" /></a>
                  </span>
                )
              }
            }
          />
        </div>
      </div>
    )
  }
}


ReactDOM.render(<Flow />, document.getElementById('root'));