/**
 * 可编辑table
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

import EditableCell from './editable.cell';

/**
 * @params columns
 * @params dataSource
 * @params onCellChange
 * @params onDelete
 * @params onSave
 * @params hasModal
 */
class EditableTable extends Component {
  constructor(props) {
    super(props);

    this.formatedColumns = null;

    this.renderColumns = this.renderColumns.bind(this);
  }

  renderColumns() {
    if (this.formatedColumns) return this.formatedColumns;

    let { 
      columns,
      onCellChange,
      onDelete,
      onSave,
      hasModal
    } = this.props;

    let len = columns.length,
        i = 0;

    for (i; i < len; i++) {
      /**
       * 居然出现了闭包
       */
      (function(i) {
        columns[i].render = (text, record) => {
          // select
          if (text && Object.prototype.toString.call(text.options) === '[object Array]') {
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="select"
                value={text.value}
                options={text.options}
                onCellChange={onCellChange} />
            );
          } 

          // date 通过正则判断是否是日期字符串 2017-11-11
          if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(text)) {
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="datepicker"
                value={text}
                onCellChange={onCellChange} />
            )
          }

          // input
          if (typeof text === 'number' || typeof text === 'string') {
            // input
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="input"
                value={text}
                onCellChange={onCellChange} />
            );
          }

          // 编辑/删除
          if (!text && !hasModal) {
            return (
              <div>
                <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.tableId)}>
                  <a href="#">删除</a>
                </Popconfirm>

                <a href="#" style={{marginLeft: '10px'}} onClick={() => onSave(record)}>保存</a>
              </div>
            )
          }

          /**
           *  此功能暂时不用
           *  编辑/删除/查看
           */
          if (!text && hasModal) {
            return (
              <div>
                <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.tableId)}>
                  <a href="#">删除</a>
                </Popconfirm>

                <a href="#" style={{marginLeft: '10px'}} onClick={() => onSave(record)}>保存</a>
                <a href="#" style={{marginLeft: '10px'}} onClick={() => console.log(record.tableId)}>查看</a>
              </div>
            )
          }
        }
      })(i);
    }

    this.formatedColumns = columns;

    return columns;
  }

  render() {

    return (
      <Table
        pagination={false}
        columns={this.renderColumns()}
        dataSource={this.props.dataSource}
        rowKey="tableId" />
    )
  }
}

export default EditableTable;