import React from "react";
import Modal from "./utils/Modal";
import InputBox from "./utils/InputBox";
import storage from "./storage";
import "./ProfileEditor.css";

export default class ProfileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.colors = ["#f4a495", "#ffa050", "#a040ff", "#40ff80", "#40c0ff"];
    this.state = {
      profilePicture: storage.data.profilePicture,
      profileColor: storage.data.profileColor,
      saving: false,
    };
    this.modalRef = React.createRef();
    this.inputColorRef = React.createRef();
  }

  save = async () => {
    this.setState({ saving: true });

    await storage.editProfile({
      picture: this.state.profilePicture,
      color: this.state.profileColor,
    });
    document.documentElement.style.setProperty("--bg-secondary", storage.data.profileColor);
    this.modalRef.current.close();
  };

  getOptionClasses(color, custom) {
    const classes = "option pointer ";

    if (custom) {
      return classes + (this.colors.includes(this.state.profileColor) ? "" : "selected");
    } else {
      return classes + (color === this.state.profileColor ? "selected" : "");
    }
  }

  render() {
    // "pp" in CSS classes means profile picture
    return (
      <Modal
        ref={this.modalRef}
        header={<h1>Editar Perfil</h1>}
        footer={
          <InputBox onClick={this.save} disabled={this.state.saving}>
            {this.state.saving && <div className="loader" />}
            Salvar
          </InputBox>
        }
        onClose={this.props.onClose}
      >
        {/* Profile picture */}
        <div id="profile-editor">
          <h2>Imagem do Perfil</h2>
          <div className="pp-container pointer">
            <img className="pp" src={storage.data.profilePicture} />
            <div className="edit-pp">
              <img className="edit-pp-icon" src="edit.png" />
            </div>
          </div>

          {/* Profile color */}
          <h2>Cor do Perfil</h2>
          <div className="color-picker">
            {this.colors.map((color, i) => (
              <div
                key={i}
                className={this.getOptionClasses(color)}
                onClick={() => this.setState({ profileColor: color })}
              >
                <div className="color" style={{ background: color }} />
              </div>
            ))}
            <div
              className={this.getOptionClasses(null, true)}
              onClick={() => this.inputColorRef.current.click()}
            >
              <div className="color custom" style={{ background: this.state.profileColor }}>
                <div className="img-container">
                  <img src="color-picker.png" />
                </div>
              </div>
              <input
                ref={this.inputColorRef}
                type="color"
                value={this.state.profileColor}
                onChange={(e) => this.setState({ profileColor: e.target.value })}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
