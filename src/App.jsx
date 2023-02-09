import React from "react";
import MedicalRecord from "./MedicalRecord";
import RegistrationEditor from "./RegistrationEditor";
import AnamnesisEditor from "./AnamnesisEditor";
import SessionLogEditor from "./SessionLogEditor";
import storage from "./storage";
import "./App.css";
import "./ModalBodyElements.css";

export default class App extends React.Component {
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
    return this.state.patientsNames.filter((name) =>
      name.toLowerCase().includes(this.state.nameFilter.trim().toLowerCase())
    );
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
          <div className="input-container grow">
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
          pid: this.state.pid,
          onClose: this.closeModal,
        })}
      </>
    );
  }
}

// Colocar validação de dados no RegistrationEditor
// Fazer tela de Prontuário
// Integrar com o Drive (fazer chaching)
// Adicionar opção de anexar documentos no paciente
// Animação no registro de sessão
// Padronizar com classes o TextInput, Select e TextArea (ou não)
// Tornar pago (R$ 20 / mes)

// Tornar cidade um DropdownSelect (opcional)
// Requisitos:
// - Caixa de pesquisa nativa opcional para filtragem (tanto em cidade como estado)
// - Pesquisa lowercase sem acentos
// - Desabilitar caixa de cidade até que o estado seja selecionado
// - Ao trocar estado, redefinir a caixa cidade
