export default function TextInput(props) {
  const style = props.disabled ? { pointerEvents: "none" } : {};

  return (
    <div className="form-input-box" style={style}>
      <p className="label">{props.label}</p>
      <input type="text" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
}
