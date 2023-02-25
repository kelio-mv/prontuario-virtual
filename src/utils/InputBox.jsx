import "./InputBox.css";

export default function InputBox(props) {
  let className = "input-box ";
  className += props.className ? props.className + " " : "";
  className += props.disabled ? "disabled" : "";

  return (
    <div
      className={className}
      style={props.cursorDefault ? { cursor: "default" } : {}}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
