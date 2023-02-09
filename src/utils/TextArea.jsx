import "./TextArea.css";

export default function TextArea(props) {
  if (props.value == undefined) {
    console.log("TextArea value can't be undefined.");
    return;
  }

  const rows = props.rows || 3;

  return (
    <div className="text-area">
      <p className="label">{props.label}</p>
      <textarea
        className="form-input-box"
        rows={rows}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
