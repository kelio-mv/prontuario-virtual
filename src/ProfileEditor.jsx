import { useState, useRef } from "react";
import Modal from "./utils/Modal";
import InputBox from "./utils/InputBox";
import "./ProfileEditor.css";

export default function ProfileEditor(props) {
  // "pp" in CSS classes means profile picture
  const colors = ["#f4a495", "#ffa050", "#a040ff", "#40ff80", "#40c0ff"];
  const [selectedColor, setSelectedColor] = useState(null);
  const inputColorRef = useRef();

  return (
    <Modal
      header={<h1>Editar Perfil</h1>}
      footer={<InputBox>Salvar</InputBox>}
      onClose={props.onClose}
    >
      <div id="profile-editor">
        <h2>Imagem do Perfil</h2>
        <div className="pp-container pointer">
          <img className="pp" src="profile-picture.png" />
          <div className="edit-pp">
            <img className="edit-pp-icon" src="edit.png" />
          </div>
        </div>

        <h2>Cor do Perfil</h2>
        <div className="color-picker">
          {colors.map((color) => (
            <div
              className={"option pointer " + (color === selectedColor ? "selected" : "")}
              onClick={() => setSelectedColor(color)}
            >
              <div className="color" style={{ background: color }} />
            </div>
          ))}
          <div
            className={"option pointer " + (colors.includes(selectedColor) ? "" : "selected")}
            onClick={() => inputColorRef.current.click()}
          >
            <div className="color custom" style={{ background: selectedColor }}>
              <div className="img-container">
                <img src="color-picker.png" />
              </div>
            </div>
            <input
              ref={inputColorRef}
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
