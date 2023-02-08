import "./TextInput.css";

export default function TextInput(props) {
  return (
    <div className="text-input-container">
      <p>{props.label}</p>
      <input type="text" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
}
