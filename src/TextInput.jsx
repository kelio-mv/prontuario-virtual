import "./TextInput.css";

export default function TextInput(props) {
  const className = props.className || "";
  const style = props.minWidth ? { minWidth: props.minWidth } : {};

  return (
    <div className={`text-input-container ${className}`} style={style}>
      <p>{props.label}</p>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        readOnly={props.readOnly}
      />
    </div>
  );
}
