/**
 * 可拖动的Modal组件
 * bug: input 输入框不能输入！！！
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

import './modal.draggable.less';


class DraggableModal extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;
  }

  componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = 'ReactModal';
    document.getElementsByTagName('body')[0].appendChild(this.node);
  }

  componentWillReceiveProps(nextProps) {
    let {
      visible,
      onCancel,
      title,
      width,
      children
    } = nextProps;


    const modal = (
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
            <button onClick={onCancel} aria-label="Close" className="yzy-modal-close">
              <span className="yzy-modal-close-x"></span>
            </button>
            <h2 className="yzy-modal-title">{title || '标题'}</h2>
            <div className="yzy-modal-content">
              { children }
            </div>
          </div>
        </Draggable>
      </div>
    )

    ReactDOM.render(modal, this.node);
  }

  render() {
    return null;
  }
}

export default DraggableModal;
