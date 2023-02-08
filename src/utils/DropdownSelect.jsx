import React from "react";
import "./DropdownSelect.css";

export default class DropdownSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOptions: false,
    };
    this.optionsRef = React.createRef();
  }

  toggleState = () => {
    if (this.state.displayOptions) {
      this.optionsRef.current.classList.add("disabled");
      setTimeout(() => this.setState({ displayOptions: false }), 250);
    } else {
      this.setState({ displayOptions: true }, () => {
        setTimeout(() => this.optionsRef.current.classList.remove("disabled"), 0);
      });
    }
  };

  render() {
    return (
      <div className="dropdown-select" onClick={this.toggleState}>
        <div className="header">
          <p className="label">{this.props.label}</p>
          <svg width="15" height="8">
            <polygon points="0,0 14,0, 7,7" fill="var(--bg-secondary)" />
          </svg>
        </div>
        <p>{this.props.value}</p>

        {this.state.displayOptions && (
          <div ref={this.optionsRef} className="options disabled">
            {this.props.options.map((e, i) => (
              <p key={i} onClick={() => this.props.onChange(e)}>
                {e}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
}
