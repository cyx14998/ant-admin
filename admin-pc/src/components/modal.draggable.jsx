/**
 * 可拖动的Modal组件
 */
import React from 'react';
import Draggable from 'react-draggable';

import './modal.draggable.less';


class DraggableModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      visible,
      onCancel,
      title,
      width,
      children
    } = this.props;

    return (
      <div 
        className={visible ? "yzy-modal visible" : "yzy-modal"}
        onClick={onCancel}>
        <Draggable
          defaultPosition={{x: 0, y: -50}}>
          <div 
            className="yzy-modal-container" 
            style={width ? {width: width} : null}
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <button onClick={onCancel} aria-label="Close" className="ant-modal-close"><span className="ant-modal-close-x"></span></button>
            <h2 className="yzy-modal-title">{title || '标题'}</h2>
            <div className="yzy-modal-content">
              { children }
            </div>
          </div>
        </Draggable>
      </div>
    )
  }
}

export default DraggableModal;