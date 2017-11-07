/**
 * 模态编辑
 */
import React from 'react';

import DraggableModal from './modal.draggable';

import {
  Modal
} from 'antd';

/**
 * @params modalTitle
 * @params editId            数据id
 * @params InnerComponent         组件
 * @params modalShow
 * @params closeModalEdit
 */
class ModalEdit extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let {
      modalTitle,
      modalShow,
      InnerComponent,
      editId,
      closeModalEdit,
      itemVisible,
      showItemVisible,
    } = this.props;

    // if (!modalShow) return null;

    return (
      <DraggableModal
        width="90%"
        visible={modalShow}
        title={modalTitle}
        onCancel={closeModalEdit}
        footer={null}>
          {
            modalShow && 
            <InnerComponent 
              editId={editId} 
              itemVisible={itemVisible}
              showItemVisible={showItemVisible}
              closeModal={closeModalEdit} />
          }
      </DraggableModal>
    )
  }
}

export default ModalEdit;