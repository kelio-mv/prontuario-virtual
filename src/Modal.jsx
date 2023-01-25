import "./Modal.css";

export default function Modal(props) {
  return (
    <div className="modal" id={props.id}>
      <div className="modal-content">
        <div className="modal-header">
          <img className="close hidden" src="close.png" />
          {props.header}
          <img className="close" src="close.png" onClick={props.onClose} />
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">{props.footer}</div>
      </div>
    </div>
  );
}
