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
  Popconfirm,
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
 * @params checkInNewpage
 * @params hasModal
 * @params onEdit
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
      checkInNewpage,
      hasModal,
      onEdit
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
          if (text !== undefined && Object.prototype.toString.call(text.options) === '[object Array]') {
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="select"
                disabled={text.disabled}
                value={text.value}
                options={text.options}
                onCellChange={onCellChange} />
            );
          } 

          // date 通过正则判断是否是日期字符串 2017-11-11
          if (text !== undefined && (text.cellType === 'datepicker' || /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(text))) {
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="datepicker"
                disabled={text.disabled}
                value={text.disabled ? text.value : text}
                onCellChange={onCellChange} />
            )
          }

          // input
          if (text !== undefined && (text.cellType === 'input' || typeof text === 'number' || typeof text === 'string')) {
            // input
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="input"
                disabled={text.disabled}
                value={text.disabled === true ? text.value : text}
                onCellChange={onCellChange} />
            );
          }

          // 文件类型
          if (text !== undefined && text.cellType === 'fileUpload') {
            return (
              <EditableCell
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="fileUpload"
                fileList={text.fileList}
                onCellChange={onCellChange} />
            )
          }

          // 空数据默认按input处理
          if (text === undefined && columns[i].dataIndex !== 'operation') {
            // input
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="input"
                disabled={false}
                value=''
                onCellChange={onCellChange} />
            );
          }

          /**
           *  编辑/删除/新页面查看
           *  @hasModal  模态框查看
           */
          if (text === undefined && (typeof checkInNewpage === 'function')) {
            return (
              <div>
                <a href="#" title="查看" onClick={() => checkInNewpage(record.tableId)}><Icon type="eye-o" className="yzy-icon" /></a>
                <a href="#" title="保存" style={{marginLeft: '10px'}} onClick={() => onSave(record)}><Icon type="check" className="yzy-icon" /></a>
                
                <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.tableId)}>
                  <a title="删除" href="#" style={{marginLeft: '10px'}}><Icon type="delete" className="yzy-icon" /></a>
                </Popconfirm>
              </div>
            )
          }

          /**
           *  编辑/删除/新页面查看
           *  @hasModal  模态框查看
           */
          if ((text === undefined) && (hasModal === true)) {
            return (
              <div>
                <a href="#" title="查看" onClick={() => onEdit(record.tableId)}><Icon type="eye-o" className="yzy-icon" /></a>
                <a href="#" title="保存" style={{marginLeft: '10px'}} onClick={() => onSave(record)}><Icon type="check" className="yzy-icon" /></a>
                
                <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.tableId)}>
                  <a href="#" title="删除" style={{marginLeft: '10px'}}>删除</a>
                </Popconfirm>
              </div>
            )
          }

          // 编辑/删除
          if (text === undefined) {
            return (
              <div>
                <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.tableId)}>
                  <a href="#" title="删除"><Icon type="delete" className="yzy-icon" /></a>
                </Popconfirm>

                <a href="#" title="保存" style={{marginLeft: '10px'}} onClick={() => onSave(record)}><Icon type="check" className="yzy-icon" /></a>
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