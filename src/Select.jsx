import "./Select.css";

export default function Select(props) {
  if (props.multipleSelection == undefined) {
    console.log("You must set the multipleSelection parameter in the Select component.");
    return;
  }

  const toggleState = (option) => {
    if (props.multipleSelection) {
      if (props.selected.includes(option)) {
        props.onChange(props.selected.filter((e) => e !== option));
      } else {
        props.onChange([...props.selected, option]);
      }
    } else {
      props.onChange([option]);
    }
  };

  return (
    <div className="select">
      <p className="label">{props.label}</p>
      <div className="options">
        {props.options.map((e, i) => (
          <div key={i} className="option" onClick={() => toggleState(e)}>
            {props.multipleSelection && <CheckBox checked={props.selected.includes(e)} />}
            {!props.multipleSelection && <RadioBox checked={props.selected.includes(e)} />}
            <p>{e}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckBox(props) {
  return <div className="checkbox">{props.checked && <img src="check.png" alt="check" />}</div>;
}

function RadioBox(props) {
  return <div className="radiobox">{props.checked && <div className="fill" />}</div>;
}
