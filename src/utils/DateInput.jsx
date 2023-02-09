import "./DateInput.css";

export default function DateInput(props) {
  return (
    <div className="date-input">
      <p className="label">{props.label}</p>
      <input type="date" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
}
