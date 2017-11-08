/**
 * 可编辑table-cell
 */
import React, { Component } from 'react';
import {
  Button,
  Icon,
  Row, 
  Col, 
  Input,
  Select,
  DatePicker,
  Form,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import QiniuUploadFile from './upload.file';


import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';


class EditableCell extends Component {
  constructor(props) {
    super(props)

    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  renderInput() {
    let {
      tableId,
      dataIndex,
      disabled,
      inputType,
      value,
      onCellChange
    } = this.props;

    return (
      <Input
        type={inputType || 'text'}
        disabled={disabled}
        value={value}
        onChange={(e) => onCellChange(tableId, dataIndex, e.target.value)} />
    )
  }

  renderSelect() {
    let {
      tableId,
      dataIndex,
      value,
      options,
      disabled,
      onCellChange
    } = this.props;

    return (
      <Select 
        disabled={disabled ? true : false}
        style={{width: '100%'}} 
        onSelect={(v) => onCellChange(tableId, dataIndex, v)} 
        value={value || ''}>
        {
          options.map((opt, i) => (
            <Option key={i} value={opt.value}>{opt.label}</Option>
          ))
        }
      </Select>
    )
  }

  renderDatepicker() {
    let {
      tableId,
      dataIndex,
      disabled,
      value,
      onCellChange
    } = this.props;

    return (
      <DatePicker 
        disabled={disabled}
        value={moment(value, dateFormat)}
        onChange={(date, dateString) => onCellChange(tableId, dataIndex, dateString)} />
    )
  }

  renderFileUpload() {
    let {
      tableId,
      dataIndex,
      fileList,
      onCellChange
    } = this.props;

    return (
      <QiniuUploadFile
        uploadTitle="反馈单上传"
        uploadedFileList={fileList}
        handleUploadedFileList={({fileList}) => onCellChange(tableId, dataIndex, fileList)} />
    );
  }

  render() {
    let cellType = this.props.cellType;

    if (cellType === 'input') {
      return this.renderInput();
    }

    if (cellType === 'select') {
      return this.renderSelect();
    }

    if (cellType === 'datepicker') {
      return this.renderDatepicker();
    }

    if (cellType === 'fileUpload') {
      return this.renderFileUpload();
    }

    console.error('editable.cell not found type', cellType);
    return null;
  }
}

export default EditableCell;