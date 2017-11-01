/**
 * 模态编辑
 */
import React from 'react';
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

    if (!modalShow) return null;

    return (
      <Modal
        width="90%"
        visible={true}
        title={modalTitle}
        onCancel={closeModalEdit}
        footer={null}>
          <InnerComponent 
            editId={editId} 
            itemVisible={itemVisible}
            showItemVisible={showItemVisible} />
      </Modal>
    )
  }
}

export default ModalEdit;