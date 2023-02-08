import "./Modal.css";

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
        <div className="modal-body" style={props.modalBodyStyle || {}}>
          {props.children}
        </div>
        {/* Footer */}
        <div className="modal-footer">{props.footer}</div>
      </div>
    </div>
  );
}
