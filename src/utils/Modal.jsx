import React from "react";
import "./Modal.css";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.modalContentRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.modalRef.current.classList.remove("disabled");
      this.modalContentRef.current.classList.remove("disabled");
    }, 0);
  }

  close = () => {
    this.modalRef.current.classList.add("disabled");
    this.modalContentRef.current.classList.add("disabled");
    setTimeout(() => this.props.onClose(), 330);
  };

  render() {
    return (
      <div ref={this.modalRef} className="modal disabled" onClick={this.props.onClick}>
        <div ref={this.modalContentRef} className="modal-content disabled">
          {/* Header */}
          <div className="modal-header">
            {this.props.header}
            <img className="close-btn" src="close.png" onClick={this.close} />
          </div>
          {/* Body */}
          <div
            ref={this.props.modalBodyRef}
            className="modal-body"
            style={this.props.modalBodyStyle || {}}
          >
            {this.props.children}
          </div>
          {/* Footer */}
          <div className="modal-footer">{this.props.footer}</div>
        </div>
      </div>
    );
  }
}
