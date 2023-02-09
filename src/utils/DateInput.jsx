export default function DateInput(props) {
  return (
    <div className="form-input-box">
      <p className="label">{props.label}</p>
      <input
        type="date"
        style={{ width: "100%" }}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
