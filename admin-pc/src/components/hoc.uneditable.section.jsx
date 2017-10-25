/**
 * 不可编辑，可查看型table
 */
import React, { Component } from 'react';
import UneditableSection from './uneditable.section';
import ModalEdit from './modal.edit';

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
        modalComponent: options.modalComponent
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
        modalShow: false
      })
    }

    render() {
      return (
        <div>
          <UneditableSection 
            {...this.props} 
            {...options} 
            onEdit={this.onEdit.bind(this)} />
          <ModalEdit 
            modalTitle={options.modalTitle}
            editId={this.state.editId}
            InnerComponent={this.state.modalComponent}
            modalShow={this.state.modalShow}
            closeModalEdit={this.closeModalEdit.bind(this)}  />
        </div>
      )
    }
  }
}

export default connectUneditableSectionApi;