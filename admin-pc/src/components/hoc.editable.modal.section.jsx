/**
 * 不可编辑，可查看型table
 */
import React, { Component } from 'react';
import EditableSection from './editable.section';
import ModalEdit from './modal.edit';

/**
 * options
 * @params secTitle
 * @params columns
 * @params apiLoader
 * @params apiSave
 * @params apiDel
 * @params modalTitle
 * @params modalComponent
 */
function connectEditableModalSectionApi(options) {
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
          <EditableSection 
            {...this.props} 
            secTitle={options.secTitle}
            columns={options.columns}
            apiLoader={options.apiLoader}
            apiSave={options.apiSave}
            apiDel={options.apiDel}
            onEdit={this.onEdit.bind(this)}
            hasModal={true} />
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

export default connectEditableModalSectionApi;