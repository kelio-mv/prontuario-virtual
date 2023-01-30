import "./TextArea.css";

export default function TextArea(props) {
  if (props.value == undefined) {
    console.log("TextArea value can't be undefined.");
    return;
  }

  const rows = props.rows || 4;

  return (
    <div className="text-area">
      <p>{props.label}</p>
      <textarea
        rows={rows}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      ></textarea>
    </div>
  );
}
