import { useEffect, useRef } from "react";
import "./TextArea.css";

export default function TextArea(props) {
  if (props.value == undefined) {
    console.log("TextArea value can't be undefined.");
    return;
  }

  function updateTextAreaHeight() {
    // This hard coded value (2) refers to the textarea border width
    const textArea = textAreaRef.current;
    textArea.style.height = "0px";
    textArea.style.height = `${textArea.scrollHeight + 2}px`;
  }

  useEffect(updateTextAreaHeight, []);
  const textAreaRef = useRef();

  return (
    <div className="text-area">
      <p className="label">{props.label}</p>
      <textarea
        ref={textAreaRef}
        className="form-input-box"
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
          updateTextAreaHeight();
        }}
      />
    </div>
  );
}
