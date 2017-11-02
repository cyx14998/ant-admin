/**
 * 不可编辑table
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


/**
 * @params columns
 * @params dataSource
 * @params onDelete
 * @params onEdit
 * @params cannotDeleteble  true / undefined
 */
class UneditableTable extends Component {
  constructor(props) {
    super(props);

    this.formatedColumns = null;

    this.renderColumns = this.renderColumns.bind(this);
  }

  renderColumns() {
    if (this.formatedColumns) return this.formatedColumns;

    let { 
      columns,
      onDelete,
      onEdit,
      cannotDeleteble
    } = this.props;

    let len = columns.length,
        i = 0;

    for (i; i < len; i++) {
      /**
       * 居然出现了闭包
       */
      (function(i) {
        columns[i].render = (text, record) => {

          // 文件下载
          if (columns[i].type === 'downloadfile') {
            return <a target="_blank" href={text} download="图片">点击下载</a>
          }

          // 如果有值，直接渲染
          if (text !== undefined) {
            return text;
          }

          // 空数据处理
          if (text === undefined && columns[i].dataIndex !== 'operation') {
            return '';
          }


          if (text === undefined && cannotDeleteble) {
            return (
              <div>
                <a href="#" onClick={() => onEdit(record.tableId)}><Icon type="eye-o" className="yzy-icon" /></a>
              </div>
            )
          }

          // 新窗口编辑/删除
          if (text === undefined) {
            return (
              <div>
                <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.tableId)}>
                  <a href="#"><Icon type="delete" className="yzy-icon" /></a>
                </Popconfirm>

                <a href="#" style={{marginLeft: '10px'}} onClick={() => onEdit(record.tableId)}><Icon type="eye-o" className="yzy-icon" /></a>
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

export default UneditableTable;