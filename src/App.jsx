import React from "react";
import MedicalRecord from "./MedicalRecord";
import RegistrationEditor from "./RegistrationEditor";
import AnamnesisEditor from "./AnamnesisEditor";
import SessionLogEditor from "./SessionLogEditor";
import "./App.css";
import "./Header.css";
import "./InputsContainer.css";
import "./MainArea.css";

export default class App extends React.Component {
  constructor() {
    if (!localStorage.patients) {
      localStorage.patients = "[]";
    }

    super();
    this.state = {
      patients: JSON.parse(localStorage.patients),
      displayedModal: null,
      selectedPatientId: null,
    };
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
      selectedPatientId: null,
      patients: JSON.parse(localStorage.patients),
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
          <div className="input-container grow">
            <img src="search.png" alt="search patient" />
            <input type="text" placeholder="Pesquisar..." />
          </div>

          <div
            className="add-patient input-container pointer"
            onClick={() => this.setState({ displayedModal: "RegistrationEditor" })}
          >
            <img src="add-patient.png" alt="add patient" />
            <p>Novo Paciente</p>
          </div>
        </div>

        {/* Main */}
        <main id="main-area">
          {this.state.patients.map((p, i) => (
            <div key={i} className="row" onClick={() => this.setState({ selectedPatientId: i })}>
              <img src="patient-picture.png" alt="patient" />
              <p
                className="name pointer"
                onClick={() => this.setState({ displayedModal: "MedicalRecord" })}
              >
                {p.cadastro.nome}
              </p>
              <div className="grow"></div>
              <div
                className="input-container pointer"
                onClick={() => this.setState({ displayedModal: "RegistrationEditor" })}
              >
                Cadastro
              </div>
              <div
                className="input-container pointer"
                onClick={() => this.setState({ displayedModal: "AnamnesisEditor" })}
              >
                Anamnese
              </div>
              <div
                className="input-container pointer"
                onClick={() => this.setState({ displayedModal: "SessionLogEditor" })}
              >
                Evolução
              </div>
            </div>
          ))}
        </main>

        {/* Modal */}
        {this.getDisplayedModal({
          patientId: this.state.selectedPatientId,
          onClose: this.closeModal,
        })}
      </>
    );
  }
}

// Redesenhar o RegistrationForm com espaços simétricos
// Padronizar com classes o TextInput, Select e TextArea

// Anamnese:
// atendimento: {queixaPrincipal, sintomas}
// historicoDoenca: {inicio, frequencia, intensidade, tratamentosAnteriores, medicamentos}
// historicoPessoal: {infancia, rotina, vicios, hobbies, trabalho}
// historicoFamiliar: {pais, irmaos, conjuge, filhos, lar, historiaPatologicaPregressa}
// examePsiquico: {aparencia, comportamento, atitude: [cooperativo, resistente, indiferente]}
