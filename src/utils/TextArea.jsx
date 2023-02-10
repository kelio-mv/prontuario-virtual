import { useState } from "react";
import "./TextArea.css";

export default function TextArea(props) {
  if (props.value == undefined) {
    console.log("TextArea value can't be undefined.");
    return;
  }

  const minRows = props.minRows || 1;
  const [rows, setRows] = useState(minRows);

  return (
    <div className="text-area">
      <p className="label">{props.label}</p>
      <textarea
        className="form-input-box"
        rows={rows}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
          const textRows = (e.target.value.match(/\n/g) || []).length + 1;
          setRows(textRows < minRows ? minRows : textRows);
        }}
      />
    </div>
  );
}
