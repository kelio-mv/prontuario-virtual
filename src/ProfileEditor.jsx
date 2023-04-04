import React from "react";
import Modal from "./utils/Modal";
import SaveButton from "./utils/SaveButton";
import storage from "./storage";
import "./ProfileEditor.css";

export default class ProfileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.pictureSize = 70;
    this.colors = ["#a040ff", "#f4a495", "#ffa060", "#00c080", "#20c0e0"];
    this.state = {
      profilePicture: storage.data.profilePicture,
      profileColor: storage.data.profileColor,
      saving: false,
    };
    this.modalRef = React.createRef();
    this.inputFileRef = React.createRef();
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

  onFileLoad = (e) => {
    // For some reason i don't know, this function is triggered even when the user cancels the
    // file selection, but this only happens if they actually selected some file before.
    // That's why i need to check this
    if (e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = this.pictureSize;
        canvas.height = this.pictureSize;
        ctx.imageSmoothingQuality = "high";

        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        ctx.drawImage(img, x, y, size, size, 0, 0, this.pictureSize, this.pictureSize);

        this.setState({ profilePicture: canvas.toDataURL() });
      };
      img.src = reader.result;
    };

    reader.readAsDataURL(file);
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
        footer={<SaveButton onClick={this.save} saving={this.state.saving} />}
        onClose={this.props.onClose}
      >
        {/* Profile picture */}
        <div id="profile-editor">
          <h2>Imagem do Perfil</h2>
          <div className="pp-container pointer" onClick={() => this.inputFileRef.current.click()}>
            <img className="pp" src={this.state.profilePicture} />
            <div className="edit-pp">
              <img className="edit-pp-icon" src="edit.png" />
            </div>
            <input ref={this.inputFileRef} type="file" onChange={this.onFileLoad} />
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
