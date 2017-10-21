/**
 * 废水排放基本情况
 */
import React, { Component } from 'react';
import {
  Form,
  Button
} from 'antd';

import EditableTable from '../../components/editable.table';


const columns = [{
  title: 'name',
  dataIndex: 'name',
  width: '10%',
}, {
  title: 'age',
  dataIndex: 'age',
  width: '20%',
}, {
  title: 'company',
  dataIndex: 'company',
  width: '50%',
}, {
  title: 'address',
  dataIndex: 'address',
  width: '10%',
}, {
  title: 'operation',
  dataIndex: 'operation',
  width: '10%'
}];

const options = [{
  value: 'sy',
  label: '事业单位'
}, {
  value: 'qy',
  label: '企业单位'
}];

const dataSource = [{
  key: '0',
  name: 'Edward King 0',
  age: '32',
  company: {
    value: '',
    options: options
  },
  address: 'London, Park Lane no. 0'
}, {
  key: '1',
  name: 'Edward King 1',
  age: '32',
  company: {
    value: 'qy',
    options: options
  },
  address: 'London, Park Lane no. 1'
}];

const itemDataModel = {
  name: '',
  age: '',
  company: {
    value: '',
    options: options
  },
  address: ''
};

class WasteWaterZhili extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource
    }
  }

  onCellChange(key, dataIndex, value) {
    this.setState(prev => {
      return {
        dataSource: prev.dataSource.map(item => {
          if (item.key === key) {
            let field = item[dataIndex];
            // input
            if (typeof field === 'number' || typeof field === 'string') {
              item[dataIndex] = value;
            }
            // select
            if (Object.prototype.toString.call(field) === '[object Array]') {
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
        dataSource: [...prev.dataSource, {...itemDataModel, key: prev.dataSource.length}]
      }
    })
  }

  onDelete(key) {
    alert(key)
  }

  saveTable() {
    alert('saveTable')
    console.log('on saveTable data', this.state.dataSource)
  }

  render() {
    return (
      <div className="yzy-tab-content-item-wrap">
        <h2 className="yzy-tab-content-title">废水治理基本情况</h2>
        <div className="yzy-block-right">
          <Button type="primary" onClick={this.addItem.bind(this)}>新增</Button>
        </div>
        <EditableTable
          columns={columns}
          dataSource={this.state.dataSource}
          onCellChange={this.onCellChange.bind(this)}
          onDelete={this.onDelete.bind(this)} />

        <div className="yzy-block-center">
          <Button type="primary" style={{padding: '0 40px'}} onClick={this.saveTable.bind(this)}>保存</Button>
        </div>
      </div>
    )
  }
}

export default WasteWaterZhili;