import { useState } from "react";
import "./Select.css";

export default function Select(props) {
  const [showOptions, setShowOptions] = useState(false);
  const style = props.style ? props.style : {};
  const onChange = (value) => {
    try {
      props.onChange(value);
    } catch {}
  };

  return (
    <div className="select" onClick={() => setShowOptions(!showOptions)} style={style}>
      <div className="header">
        <p className="label">{props.label}</p>
        <svg width="15" height="8">
          <polygon points="0,0 14,0, 7,7" fill="var(--bg-secondary-1)" />
        </svg>
      </div>
      <p className="value">{props.value}</p>

      {showOptions && props.options && (
        <div className="options">
          {props.options.map((e, i) => (
            <p key={i} onClick={() => onChange(e)}>
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
