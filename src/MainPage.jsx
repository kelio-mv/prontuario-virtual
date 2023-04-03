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

export const ConnectionStateCtx = React.createContext();

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
      online: true,
    };
  }

  componentDidMount() {
    window.onclick = () => this.setState({ displayedDropdownId: null });
    window.ononline = () => this.setState({ online: true });
    window.onoffline = () => this.setState({ online: false });
  }

  componentWillUnmount() {
    window.onclick = null;
  }

  getPatients(nameFilter) {
    nameFilter = nameFilter ? utils.removeAccents(nameFilter).toLowerCase().trim() : "";
    const patients = storage.getAllPatients().map((p, i) => ({ name: p.cadastro.nome, id: i }));

    return patients.filter((p) => {
      const pname = utils.removeAccents(p.name).toLowerCase();
      return pname.includes(nameFilter);
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
          <img src={storage.data.profilePicture} />
        </header>

        {/* Inputs container */}
        <div id="inputs-container">
          <InputBox onClick={() => this.setState({ displayedModal: "RegistrationEditor" })}>
            <img src="create.png" />
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
        <ConnectionStateCtx.Provider value={this.state.online}>
          {this.getDisplayedModal({
            pid: this.state.pid,
            onClose: this.closeModal,
          })}
        </ConnectionStateCtx.Provider>
      </>
    );
  }
}
