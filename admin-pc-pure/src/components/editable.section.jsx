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

/**
 * 
 * @params columns
 * @params apiLoader
 * @params apiSave
 * @params apiDel
 * @params secTitle
 * @return <Component />
 */
class EditableSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dataSource: []
    }
  }

  componentDidMount() {
    this.props.apiLoader().then(res => {
      // success
      this.setState(prev =>({
        loading: false,
        dataSource: res.data
      }));
    }).catch(err => {
      alert('fetch api err', err)
    })

    // apiLoader();
  }

  onCellChange(key, dataIndex, value) {
    console.log('onCellChange ---', value)
    this.setState(prev => {
      return {
        dataSource: prev.dataSource.map(item => {
          if (item.key === key) {
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
    this.setState(prev => {

      return {
        dataSource: [...prev.dataSource, {...this.props.itemDataModel, key: prev.dataSource.length}]
      }
    })
  }

  onDelete(key) {
    // alert(key);
    this.props.apiDel(key);
  }

  saveTable() {
    // alert('saveTable')
    console.log('on saveTable data', this.state.dataSource);

    this.props.apiSave();
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
          onDelete={this.onDelete.bind(this)}
          loading={this.state.loading} />

        <div className="yzy-block-center">
          <Button type="primary" style={{padding: '0 40px'}} onClick={this.saveTable.bind(this)}>保存</Button>
        </div>
      </div>
    )
  }
}

export default EditableSection;