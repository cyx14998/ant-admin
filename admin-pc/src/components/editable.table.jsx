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

    this.state = {
      editable: false,  // 初始状态为不可编辑
      editableTableId: 0,  // 可编辑行
      // saveItemSuccess: false
    }

    /**
     * 由于要动态切换可编辑状态，columns改为动态渲染
     */
    // this.formatedColumns = null;



    this.renderColumns = this.renderColumns.bind(this);
    this.getEditable = this.getEditable.bind(this);

    // 数据校验规则
    this.getValidateTypes = this.getValidateTypes.bind(this);
    this.validateTypes = {};
  }

  componentDidMount() {
    let {
      columns
    } = this.props;

    this.getValidateTypes(columns);
  }

  getEditable(record) {
    if (record.tableId === '') return true;

    if (this.state.editable === true && this.state.editableTableId === record.tableId) return true;

    return false;
  }

  getLabelFromOptions(value, options) {
    var label = '';

    for (var i=0, len=options.length; i<len; i++) {
      if (options[i].value === value) {
        label = options[i].label;
        break;
      }
    }

    return label;  

  }

  getValidateTypes(columns) {
    columns.forEach(col => {
      if (col.validateType) {
        this.validateTypes[col.dataIndex] = {
          type: col.validateType,  // 校验类型 'number' 'phone' ...
          title: col.title         // 字段名称
        };
      }
    })
  }

  /**
   * 依据查看或编辑状态，动态渲染数据
   */
  renderColumns() {
    // if (this.formatedColumns) return this.formatedColumns;    

    const self = this;

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
        /**
         * text: 当前渲染数据字段
         * record: 当前渲染数据（{}）
         */
        columns[i].render = (text, record) => {

          // select
          if (text !== undefined && Object.prototype.toString.call(text.options) === '[object Array]') {
            if (!self.getEditable(record)) {
              return self.getLabelFromOptions(text.value, text.options);
            }

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
            if (!self.getEditable(record)) {
              return text.disabled ? text.value : text;
            }

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

          /**
           * input 加入禁用功能
           * {cellType: 'input', value: '', disabled: true}
           */
          if (text !== undefined && (text.cellType === 'input' || typeof text === 'number' || typeof text === 'string')) {
            // 不可编辑状态
            if (!self.getEditable(record)) {
              return text.disabled === true ? text.value : text;
            }

            // 可编辑状态（包含可编辑状态下的禁用状态）
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="input"
                inputType={typeof text === 'number' ? 'number' : 'text'}
                disabled={text.disabled}
                value={text.disabled === true ? text.value : text}
                onCellChange={onCellChange} />
            );
          }

          // 文件类型
          if (text !== undefined && text.cellType === 'fileUpload') {
            if (!self.getEditable(record)) {
              var filePath = (text.fileList[0] && text.fileList[0].url) || '';

              if (filePath) {
                return (<a href={filePath} target="_blank" download="file">点击下载</a>)
              } else {
                return '';
              }
            }

            return (
              <EditableCell
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="fileUpload"
                fileList={text.fileList}
                onCellChange={onCellChange} />
            )
          }

          // 空数据默认按input[type="text"]处理
          if (text === undefined && columns[i].dataIndex !== 'operation') {
            if (!self.getEditable(record)) {
              return '';
            }

            // input
            return (
              <EditableCell 
                tableId={record.tableId}
                dataIndex={columns[i].dataIndex}
                cellType="input"
                inputType="text"
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
            // 新添加行
            if (record.tableId === '') {
              return (
                <div>
                  <a title="取消" style={{marginRight: '10px'}} onClick={() => onDelete(record.tableId)}><Icon type="close" className="yzy-icon" /></a>
                  <a title="保存" style={{marginRight: '10px'}} onClick={() => {
                    onSave(record, self.validateTypes);
                    // 保存成功后，禁用编辑功能
                    // self.setState({editableTableId: 0}); 
                  }}><Icon type="check" className="yzy-icon" /></a>
                </div>
              )
            }

            /**
             * 不可编辑状态
             */
            if (!self.getEditable(record)) {
              return (
                <div>
                  <a title="查看" style={{marginRight: '10px'}} onClick={() => checkInNewpage(record.tableId)}><Icon type="eye-o" className="yzy-icon" /></a>
                  <a title="编辑" style={{marginRight: '10px'}} onClick={() => self.setState({editable: true, editableTableId: record.tableId})}><Icon type="edit" className="yzy-icon" /></a>
                  <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record.tableId)}>
                    <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
                  </Popconfirm>
                </div>
              )
            }

            // 可编辑状态
            return (
              <div>
                <a title="查看" style={{marginRight: '10px'}} onClick={() => checkInNewpage(record.tableId)}><Icon type="eye-o" className="yzy-icon" /></a>
                <a title="取消" style={{marginRight: '10px'}} onClick={() => self.setState({editableTableId: 0})}><Icon type="close" className="yzy-icon" /></a>
                <a title="保存" style={{marginRight: '10px'}} onClick={() => {
                    onSave(record, self.validateTypes, (res) => {
                      if (res.result === 'success') {
                        // 保存成功后，禁用编辑功能
                        self.setState({editableTableId: 0}); 
                      }
                    });
                  }}><Icon type="check" className="yzy-icon" /></a>
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record.tableId)}>
                  <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
                </Popconfirm>
              </div>
            )
          }

          /**
           *  编辑/删除/新页面查看
           *  @hasModal  模态框查看
           *  弃用
           */
          // if ((text === undefined) && (hasModal === true)) {
          //   return (
          //     <div>
          //       <a title="查看" style={{marginRight: '10px'}} onClick={() => onEdit(record.tableId)}><Icon type="eye-o" className="yzy-icon" /></a>
          //       <a title="保存" style={{marginRight: '10px'}} onClick={() => onSave(record)}><Icon type="check" className="yzy-icon" /></a>
          //       <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record.tableId)}>
          //         <a title="删除">删除</a>
          //       </Popconfirm>
          //     </div>
          //   )
          // }

          // 编辑/删除
          if (text === undefined) {
            // 新添加行
            if (record.tableId === '') {
              return (
                <div>
                  <a title="取消" style={{marginRight: '10px'}} onClick={() => onDelete(record.tableId)}><Icon type="close" className="yzy-icon" /></a>
                  <a title="保存" style={{marginRight: '10px'}} onClick={() => {
                    onSave(record, self.validateTypes);
                    // 保存成功后，禁用编辑功能
                    // self.setState({editableTableId: 0}); 
                  }}><Icon type="check" className="yzy-icon" /></a>
                </div>
              )
            }

            /**
             * 默认不可编辑
             * 非可编辑tableId，不可编辑
             */
            if (!self.getEditable(record)) {
              return (
                <div>
                  <a title="编辑" style={{marginRight: '10px'}} onClick={() => self.setState({editable: true, editableTableId: record.tableId})}><Icon type="edit" className="yzy-icon" /></a>
                  {/* <a title="保存" style={{marginRight: '10px'}} onClick={() => onSave(record)}><Icon type="check" className="yzy-icon" /></a> */}
                  <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record.tableId)}>
                    <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
                  </Popconfirm>
                </div>
              )
            }

            return (
              <div>
                <a title="取消" style={{marginRight: '10px'}} onClick={() => self.setState({editableTableId: 0})}><Icon type="close" className="yzy-icon" /></a>
                <a title="保存" style={{marginRight: '10px'}} onClick={() => {
                  onSave(record, self.validateTypes, (res) => {
                    if (res.result === 'success') {
                      // 保存成功后，禁用编辑功能
                      self.setState({editableTableId: 0}); 
                    }
                  });
                }}><Icon type="check" className="yzy-icon" /></a>
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record.tableId)}>
                  <a title="删除"><Icon type="delete" className="yzy-icon" /></a>
                </Popconfirm>
              </div>
            )
          }
        }
      })(i);
    }

    // this.formatedColumns = columns;

    return columns;
  }

  render() {

    return (
      <Table
        pagination={false}
        columns={this.renderColumns()}
        dataSource={this.props.dataSource}
        rowKey="tableId"
        rowClassName={(record, index) => {
          if (index % 2 !== 0) {
            return 'active'
          }
        }} />
    )
  }
}

export default EditableTable;