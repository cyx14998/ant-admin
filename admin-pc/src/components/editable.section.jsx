/**
 * HOC 高阶组件
 * 以接口为标准的可编辑区域
 */
import React, { Component } from 'react';
import {
  Button,
  Icon,
  Row, 
  Col, 
  Input,
  Select,
  Form,
  Table,
  Popconfirm
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import EditableTable from './editable.table';

import { MyToast } from '../common/utils';

/**
 * @params secTitle
 * @params columns
 * @params apiLoader
 * @params apiSave
 * @params apiDel
 * @params itemDataModel
 * @return <Component />
 */
class EditableSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dataSource: []
    }

    this.getDataSource = this.getDataSource.bind(this);
  }

  /**
   * 调用接口，加载数据
   * 注意接口的数据格式！！！
   */
  componentDidMount() {
    this.getDataSource();
  }

  getDataSource() {
    this.props.apiLoader().then(res => {
      // success
      this.setState(prev =>({
        loading: false,
        dataSource: res.data
      }));
    }).catch(err => {
      alert('fetch api err', err)
    })
  }

  /**
   * @tableId     数据标识
   * @dataIndex   数据字段名称
   * @value       数据赋值
   */
  onCellChange(tableId, dataIndex, value) {
    console.log('onCellChange ---', value)
    this.setState(prev => {
      return {
        dataSource: prev.dataSource.map(item => {
          if (item.tableId === tableId) {
            let field = item[dataIndex];
            // input && datepicker '2017-11-11'
            if (typeof field === 'number' || typeof field === 'string') {
              item[dataIndex] = value;
            }

            // select
            if (field && Object.prototype.toString.call(field.options) === '[object Array]') {
              item[dataIndex].value = value;
            }
          }

          return item;
        })
      }
    })
  }

  addItem() {
    // 如果有未保存项，提示
    var hasNewItem = false;
    var dataSource = this.state.dataSource,
        len = dataSource.length,
        i = 0;

    for (i; i<len; i++) {
      if (dataSource[i].tableId === '') {
        hasNewItem = true;
        break;
      }
    }

    if (hasNewItem) {
      MyToast('请保存新增项！');
      return false;
    }

    // 新增项 tableId: ''
    this.setState(prev => {
      return {
        dataSource: [...prev.dataSource, {...this.props.itemDataModel, tableId: ''}]
      }
    })
  }

  deleteItem(tableId) {
    // 删除未保存的新增项
    if (tableId === '') {
      this.setState(prev => {
        return {
          dataSource: prev.dataSource.slice(0, -1)
        }
      });

      return false;
    }

    // 删除
    this.props.apiDel(tableId).then(res => {
      if (res.code === 0) {
        MyToast('删除成功');

        setTimeout(() => {
          this.getDataSource();
        }, 500)
      }
    }).catch(err => {
      MyToast('接口调用失败');
    })
  }

  // 
  saveItem(record) {
    this.props.apiSave(record).then(res => {
      if (res.code === 0) {
        MyToast('删除成功');

        setTimeout(() => {
          this.getDataSource();
        }, 500)
      }
    }).catch(err => {
      MyToast('接口调用失败');
    })
  }

  render() {
    let {
      secTitle,
      columns
    } = this.props;

    return (
      <div className="yzy-tab-content-item-wrap">
        <h2 className="yzy-tab-content-title">{secTitle}</h2>
        <div className="yzy-block-right">
          <Button type="primary" onClick={this.addItem.bind(this)}>新增</Button>
        </div>
        <EditableTable
          columns={columns}
          dataSource={this.state.dataSource}
          onCellChange={this.onCellChange.bind(this)}
          onDelete={this.deleteItem.bind(this)}
          onSave={this.saveItem.bind(this)}
          loading={this.state.loading} />

        {/** 
          <div className="yzy-block-center">
            <Button type="primary" style={{padding: '0 40px'}} onClick={this.saveTable.bind(this)}>保存</Button>
          </div>
        **/}
      </div>
    )
  }
}

export default EditableSection;