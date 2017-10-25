/**
 * 模态编辑
 */
import React from 'react';

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
      closeModalEdit
    } = this.props;

    if (!modalShow) return null;

    return (
      <div className="yzy-modal-edit-wrap">
        <div className="yzy-modal-edit">
          <h2 className="yzy-modal-edit-title">{!editId ? '新增' : '编辑'}{modalTitle}</h2>
          <div className="yzy-modal-edit-content">
            <InnerComponent editId={editId} />
          </div>
          <a className="yzy-modal-edit-close" onClick={() => closeModalEdit()}>x</a>
        </div>
      </div>
    )
  }
}

export default ModalEdit;