/**
 * 不可编辑 + Modal 可查看型table
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
        itemVisible: false,
        fetchReload: false  // 重新请求列表接口
      }
    }

    componentDidMount() {
      // console.log('modalComponent----------', options.modalComponent)
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
        modalShow: false,
        fetchReload: true
      });
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
            secTitle={options.secTitle}
            columns={options.columns}
            apiLoader={options.apiLoader}
            apiDel={options.apiDel}
            fetchReload={this.state.fetchReload}
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