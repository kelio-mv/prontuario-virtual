import { createContext } from "react";
import "./Modal.css";

export const ModalBodyCtx = createContext();

export default function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          {props.header}
          <img className="close-btn" src="close.png" onClick={props.onClose} />
        </div>
        {/* Body */}
        <div className="modal-body">
          <ModalBodyCtx.Provider value={props.readOnly}>{props.children}</ModalBodyCtx.Provider>
        </div>
        {/* Footer */}
        <div className="modal-footer">{props.footer}</div>
      </div>
    </div>
  );
}