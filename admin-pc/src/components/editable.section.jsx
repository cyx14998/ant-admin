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

import RULES from '../common/utils/validate';
import { MyToast } from '../common/utils';

/**
 * pass from hoc.options
 * @params secTitle
 * @params columns
 * @params apiLoader
 * @params apiSave
 * @params apiDel
 * @params itemDataModel
 * @params checkInNewpage    添加新页面查看功能
 *
 * @params hasModal          添加当前页面弹框功能
 * @params onEdit            弹框出现并带人tableId
 *
 * pass from props
 * @apiListItemId  请求或保存数据时所需要的id
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
    this.getDataSource({});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiListItemId !== this.props.apiListItemId) {
      this.getDataSource({nextApiListItemId: nextProps.apiListItemId});
    }
  }

  getDataSource({nextApiListItemId}) {
    let {
      apiListItemId,
      apiLoader
    } = this.props;

    if (nextApiListItemId) {
      apiListItemId = nextApiListItemId
    }

    apiLoader({apiListItemId}).then(res => {
      if (res.code !== 0) {
        MyToast(res.info)
        return;
      }

      // success
      this.setState(prev =>({
        loading: false,
        dataSource: res.data
      }));
    }).catch(err => {
      MyToast('接口调用失败');

      this.setState({
        loading: false
      });
    })
  }

  /**
   * @tableId     数据标识
   * @dataIndex   数据字段名称
   * @value       数据赋值
   */
  onCellChange(tableId, dataIndex, value) {
    // console.log('oncellchange value-----------', value)
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

            // fileupload
            if (field && field.cellType === 'fileUpload') {
              item[dataIndex].fileList = value;
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

    // console.log('addItem itemDataModel-----------', this.props.itemDataModel)

    // 新增项 tableId: ''
    this.setState(prev => {
      return {
        dataSource: [{...this.props.itemDataModel, tableId: ''}, ...prev.dataSource ]
      }
    })
  }

  deleteItem(tableId) {
    // 删除未保存的新增项
    if (tableId === '') {
      this.setState(prev => {
        return {
          dataSource: prev.dataSource.slice(1)
        }
      });

      return false;
    }

    // 删除
    this.props.apiDel(tableId).then(res => {
      if (res.code !== 0) {
        MyToast(res.info);
        return;
      }

      MyToast('删除成功');

      setTimeout(() => {
        this.getDataSource({});
      }, 500);
    }).catch(err => {
      MyToast('接口调用失败');
    })
  }

  // 
  saveItem(record, validateTypes, callback) {
    let {
      apiListItemId,
      apiSave
    } = this.props;

    if (apiListItemId !== undefined) {
      record.apiListItemId = apiListItemId;
    }

    // 数据校验
    var _validateItems = Object.keys(validateTypes);
    var validatePass = true;
    var validateMsg = '';

    if (_validateItems.length !== 0) {
      for(let i=0, len=_validateItems.length; i<len; i++) {
        let validateKey = _validateItems[i];
        let validateType = validateTypes[validateKey].type;
        let validateTitle = validateTypes[validateKey].title;

        if (RULES[validateType] === undefined) {
          console.error('validate.js 没有配置校验规则')
        }

        if (!RULES[validateType].reg.test(record[validateKey])) {
          validatePass = false;
          // 字段名称 + 校验失败信息
          validateMsg = validateTitle + '，' +  RULES[validateType].msg;

          break;
        }
      }
    }

    if (!validatePass) {
      MyToast(validateMsg)
      return;
    }

    apiSave(record).then(res => {
      if (res.code !== 0) {
        MyToast(res.info);
        return;
      }

      MyToast('保存成功');

      // bug fix for edit
      callback && callback({result: 'success'});

      /**
       * 新增刷新，为了获取 tableId
       * 
       */
      // if (record.tableId === '') {
        setTimeout(() => {
          this.getDataSource({});
        }, 20);
      }      
    // }).catch(err => {
    //   MyToast('接口调用失败');
    // }
  )}

  render() {
    let {
      secTitle,
      columns,
      checkInNewpage,
      hasModal,
      onEdit,
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
          loading={this.state.loading}
          checkInNewpage={checkInNewpage}
          hasModal={hasModal}
          onEdit={onEdit} />

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