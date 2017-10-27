/**
 * HOC 高阶组件
 * 以接口为标准的不可编辑表格
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

import UneditableTable from './uneditable.table';

import { MyToast } from '../common/utils';

/**
 * @params secTitle
 * @params columns
 * @params apiLoader
 * @params onEdit  (Modal 新增或查看)
 * @params apiDel
 * @params cannotDeleteble
 * @params fetchReload  false/true  是否重新请求列表接口
 * @params apiListItemId   请求接口传递的id参数
 * @return <Component />
 */
class UneditableSection extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchReload === true) {
      this.getDataSource();
    }
  }

  getDataSource() {
    let {
      apiListItemId,
      apiLoader
    } = this.props;

    apiLoader({apiListItemId}).then(res => {
      if (res.code !== 0) {
        MyToast(res.info);
        return;
      }

      // success
      this.setState(prev =>({
        loading: false,
        dataSource: res.data
      }));
    }).catch(err => {
      MyToast('接口调用失败');
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
      if (res.code !== 0) {
        MyToast(res.info);
        return;
      }

      MyToast('删除成功');

      setTimeout(() => {
        this.getDataSource();
      }, 500);
    }).catch(err => {
      MyToast('接口调用失败');
    })
  }

  render() {
    let {
      secTitle,
      columns,
      onEdit,
      cannotDeleteble
    } = this.props;

    return (
      <div className="yzy-tab-content-item-wrap">
        <h2 className="yzy-tab-content-title">{secTitle}</h2>
        <div className="yzy-block-right">
          <Button type="primary" onClick={() => onEdit('')}>新增</Button>
        </div>
        <UneditableTable
          columns={columns}
          dataSource={this.state.dataSource}
          onDelete={this.deleteItem.bind(this)}
          onEdit={onEdit}
          cannotDeleteble={cannotDeleteble}
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

export default UneditableSection;