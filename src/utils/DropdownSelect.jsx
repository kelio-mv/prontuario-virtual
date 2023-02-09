import { useState } from "react";
import "./DropdownSelect.css";

export default function DropdownSelect(props) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="dropdown-select" onClick={() => setShowOptions(!showOptions)}>
      <div className="header">
        <p className="label">{props.label}</p>
        <svg width="15" height="8">
          <polygon points="0,0 14,0, 7,7" fill="var(--bg-secondary)" />
        </svg>
      </div>
      <p>{props.value}</p>

      {showOptions && (
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
