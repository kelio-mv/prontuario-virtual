import React from "react";
import MedicalRecord from "./MedicalRecord";
import RegistrationEditor from "./RegistrationEditor";
import AnamnesisEditor from "./AnamnesisEditor";
import SessionLogEditor from "./SessionLogEditor";
import ProfileEditor from "./ProfileEditor";
import InputBox from "./utils/InputBox";
import storage from "./storage";
import utils from "./utils";
import "./MainPage.css";
import "./ModalBodyElements.css";

export default class MainPage extends React.Component {
  constructor() {
    super();
    // The "pid" (Patient Identifier) is the index of the selected patient in
    // the stored array of patients.
    // The "displayedDropdownId" value is set to the id of the target patient when the user
    // clicks in the edit button. It is used to identify the dropdown that must be displayed.
    this.state = {
      nameFilter: "",
      displayedDropdownId: null,
      displayedModal: null,
      pid: null,
    };
  }

  componentDidMount() {
    window.onclick = () => this.setState({ displayedDropdownId: null });
  }

  componentWillUnmount() {
    window.onclick = null;
  }

  getPatients(nameFilter) {
    nameFilter = nameFilter || "";
    const patients = storage.getAllPatients().map((p, i) => ({ name: p.cadastro.nome, id: i }));

    return patients.filter((p) => {
      p.name = utils.removeAccents(p.name).toLowerCase();
      nameFilter = utils.removeAccents(nameFilter).toLowerCase().trim();
      return p.name.includes(nameFilter);
    });
  }

  getDisplayedModal(args) {
    switch (this.state.displayedModal) {
      case "MedicalRecord":
        return <MedicalRecord {...args} />;

      case "RegistrationEditor":
        return <RegistrationEditor {...args} />;

      case "AnamnesisEditor":
        return <AnamnesisEditor {...args} />;

      case "SessionLogEditor":
        return <SessionLogEditor {...args} />;

      case "ProfileEditor":
        return <ProfileEditor {...args} />;
    }
  }

  closeModal = () => {
    this.setState({
      displayedModal: null,
      pid: null,
    });
  };

  render() {
    return (
      <>
        {/* Header */}
        <header id="header">
          <img src="profile-picture.png" />
        </header>

        {/* Inputs container */}
        <div id="inputs-container">
          <InputBox onClick={() => this.setState({ displayedModal: "RegistrationEditor" })}>
            <img src="add-patient.png" />
            <p>Novo Paciente</p>
          </InputBox>
          <InputBox className="grow" cursorDefault>
            <img src="search.png" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={this.state.nameFilter}
              onChange={(e) => {
                const raw = e.target.value;
                const value = raw.trim() + (raw.endsWith(" ") && raw.length > 1 ? " " : "");
                this.setState({ nameFilter: value });
              }}
            />
          </InputBox>
          <InputBox onClick={() => this.setState({ displayedModal: "ProfileEditor" })}>
            <img src="edit-profile.png" />
            Editar Perfil
          </InputBox>
        </div>

        {/* Main */}
        <main id="main-area">
          {this.getPatients(this.state.nameFilter).map((p) => (
            <div key={p.id} className="row">
              <img className="patient-icon" src="patient-picture.png" />
              <p
                className="name pointer"
                onClick={() => this.setState({ displayedModal: "MedicalRecord", pid: p.id })}
              >
                {p.name}
              </p>
              <div className="grow"></div>
              <div className="dropdown-edit">
                <img
                  className="edit-icon pointer"
                  src="edit.png"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({ displayedDropdownId: p.id });
                  }}
                />
                {this.state.displayedDropdownId === p.id && (
                  <div className="options pointer">
                    <p
                      onClick={() =>
                        this.setState({ displayedModal: "RegistrationEditor", pid: p.id })
                      }
                    >
                      Cadastro
                    </p>
                    <p
                      onClick={() =>
                        this.setState({ displayedModal: "AnamnesisEditor", pid: p.id })
                      }
                    >
                      Anamnese
                    </p>
                    <p
                      onClick={() =>
                        this.setState({ displayedModal: "SessionLogEditor", pid: p.id })
                      }
                    >
                      Evolução
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </main>

        {/* Modal */}
        {this.getDisplayedModal({
          pid: this.state.pid,
          onClose: this.closeModal,
        })}
      </>
    );
  }
}
