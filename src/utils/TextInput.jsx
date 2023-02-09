import "./TextInput.css";

export default function TextInput(props) {
  const style = props.disabled ? { pointerEvents: "none" } : {};

  return (
    <div className="text-input-container" style={style}>
      <p>{props.label}</p>
      <input type="text" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
}
