/**
 * 不可编辑，可查看型table
 */
import React, { Component } from 'react';
import UneditableSection from './uneditable.section';
import ModalEdit from './modal.edit';
import {
  MyToast
} from '../common/utils';

/**
 * options
 * @params secTitle
 * @params columns
 * @params apiLoader
 * @params apiDel
 * @params modalComponent
 */
function connectUneditableSectionApi(options) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalShow: false,
        editId: '',
        modalComponent: options.modalComponent,
        itemVisible: false
      }

      this.getDataSource = this.getDataSource.bind(this);
    }

    componentDidMount() {
      // console.log('modalComponent----------', options.modalComponent)
    }

    // 重新请求列表
    getDataSource() {
      options.apiLoader().then(res => {
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
        MyToast('接口调用失败')
      })
    }

    /**
     * show modaledit and pass tableId
     */
    onEdit(tableId) {
      this.setState({
        modalShow: true,
        editId: tableId
      })
    }

    closeModalEdit() {
      this.setState({
        modalShow: false
      });

      // apiLoader
      this.getDataSource();
    }

    showItemVisible() {
      this.setState({
        itemVisible: true
      })
    }

    render() {
      return (
        <div>
          <UneditableSection 
            {...options} 
            onEdit={this.onEdit.bind(this)} />
          <ModalEdit 
            modalTitle={options.modalTitle}
            editId={this.state.editId}
            showItemVisible={this.showItemVisible.bind(this)}
            itemVisible={this.state.itemVisible}
            InnerComponent={this.state.modalComponent}
            modalShow={this.state.modalShow}
            closeModalEdit={this.closeModalEdit.bind(this)}  />
        </div>
      )
    }
  }
}

export default connectUneditableSectionApi;