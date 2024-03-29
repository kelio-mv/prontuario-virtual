import { useState, useContext, useRef, useEffect } from "react";
import { RegEditorCtx } from "../RegistrationEditor";
import "./DropdownSelect.css";

export default function DropdownSelect(props) {
  const [displayOptions, setDisplayOptions] = useState(false);
  const selfRef = useRef();
  const eventTarget = useContext(RegEditorCtx);

  useEffect(() => {
    // If there was a click event outside of the element and it is currently displaying the options.
    if (eventTarget && !selfRef.current.contains(eventTarget) && displayOptions) {
      setDisplayOptions(false);
    }
  });

  return (
    <div
      ref={selfRef}
      className="dropdown-select form-input-box pointer"
      onClick={() => setDisplayOptions(!displayOptions)}
    >
      <div className="header">
        <p className="label">{props.label}</p>
        <svg width="15" height="8">
          <polygon points="0,0 14,0, 7,7" fill="var(--bg-secondary)" />
        </svg>
      </div>
      <p>{props.value || <>&zwnj;</>}</p>

      {displayOptions && (
        <div className="options">
          {props.options.map((e, i) => (
            <p key={i} onClick={() => props.onChange(e)}>
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
