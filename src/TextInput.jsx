import { useContext } from "react";
import { ModalBodyCtx } from "./Modal";
import "./TextInput.css";

export default function TextInput(props) {
  const className = props.className || "";
  const style = props.style ? props.style : {};
  const readOnly = useContext(ModalBodyCtx);

  return (
    <div className={`text-input-container ${className}`} style={style}>
      <p>{props.label}</p>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        readOnly={readOnly}
      />
    </div>
  );
}
