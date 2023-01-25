import "./TextInput.css";

export default function TextInput(props) {
  const className = props.className || "";
  const style = props.style ? props.style : {};
  const onChange = (e) => {
    try {
      props.onChange(e.target.value);
    } catch {}
  };

  return (
    <div className={`text-input-container ${className}`} style={style}>
      <p>{props.label}</p>
      <input
        type="text"
        value={props.value}
        onChange={onChange}
        // readOnly={props.readOnly}
      />
    </div>
  );
}
