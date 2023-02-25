import React from "react";
import MedicalRecord from "./MedicalRecord";
import RegistrationEditor from "./RegistrationEditor";
import AnamnesisEditor from "./AnamnesisEditor";
import SessionLogEditor from "./SessionLogEditor";
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
    this.state = {
      patientsNames: storage.getAllPatientsNames(),
      nameFilter: "",
      displayedModal: null,
      pid: null,
    };
  }

  getFilteredNames() {
    return this.state.patientsNames.filter((name) => {
      name = utils.removeAccents(name).toLowerCase();
      const nameFilter = utils.removeAccents(this.state.nameFilter).toLowerCase().trim();
      return name.includes(nameFilter);
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
    }
  }

  closeModal = () => {
    this.setState({
      displayedModal: null,
      pid: null,
      patientsNames: storage.getAllPatientsNames(),
    });
  };

  render() {
    return (
      <>
        {/* Header */}
        <header id="header">
          <img src="profile-picture.png" alt="profile picture" />
        </header>

        {/* Inputs container */}
        <div id="inputs-container">
          <InputBox className="grow" cursorDefault>
            <img src="search.png" alt="search patient" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={this.state.nameFilter}
              onInput={(e) => {
                const raw = e.target.value;
                const value = raw.trim() + (raw.endsWith(" ") && raw.length > 1 ? " " : "");
                this.setState({ nameFilter: value });
              }}
            />
          </InputBox>

          <InputBox onClick={() => this.setState({ displayedModal: "RegistrationEditor" })}>
            <img src="add-patient.png" alt="add patient" />
            <p>Novo Paciente</p>
          </InputBox>
        </div>

        {/* Main */}
        <main id="main-area">
          {this.getFilteredNames().map((name, i) => (
            <div key={i} className="row" onClick={() => this.setState({ pid: i })}>
              <img src="patient-picture.png" alt="patient" />
              <p
                className="name pointer"
                onClick={() => this.setState({ displayedModal: "MedicalRecord" })}
              >
                {name}
              </p>
              <div className="grow"></div>
              <InputBox onClick={() => this.setState({ displayedModal: "RegistrationEditor" })}>
                Cadastro
              </InputBox>

              <InputBox onClick={() => this.setState({ displayedModal: "AnamnesisEditor" })}>
                Anamnese
              </InputBox>

              <InputBox onClick={() => this.setState({ displayedModal: "SessionLogEditor" })}>
                Evolução
              </InputBox>
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
