import React from "react";
import MedicalRecord from "./MedicalRecord";
import RegistrationEditor from "./RegistrationEditor";
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
      showMedicalRecord: false,
      showRegistrationEditor: false,
      showAnamnesisEditor: false,
      showSessionsLogEditor: false,
      selectedPatientId: null,
    };
  }
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
            className="input-container add-patient"
            onClick={() => this.setState({ showRegistrationEditor: true })}
          >
            <img src="add-patient.png" alt="add patient" />
            <p>Novo Paciente</p>
          </div>
        </div>

        {/* Main */}
        <main id="main-area">
          {this.state.patients.map((p, i) => (
            <div key={i} className="row" onClick={() => this.setState({ selectedPatientId: i })}>
              <img src="patient-picture.png" alt="patient picture" />
              <p className="name" onClick={() => this.setState({ showMedicalRecord: true })}>
                {p.cadastro.nome}
              </p>
              <div className="grow"></div>
              <div className="input-container">Anamnese</div>
              <div className="input-container">Evolução</div>
            </div>
          ))}
        </main>

        {/* Medical record */}
        {this.state.showMedicalRecord && (
          <MedicalRecord
            patientId={this.state.selectedPatientId}
            onClose={() => this.setState({ showMedicalRecord: false })}
          />
        )}

        {/* Registration editor */}
        {this.state.showRegistrationEditor && (
          <RegistrationEditor
            patientId={this.state.selectedPatientId}
            onClose={() => this.setState({ showRegistrationEditor: false })}
          />
        )}
      </>
    );
  }
}

// Trocar variável border-radius para pill
// Definir border-radius como 9px e definir border-radius dos componentes do modal para a variável
// Padronizar com classes o TextInput, Select e TextArea

// Anamnese:
// atendimento: {queixaPrincipal, sintomas}
// historicoDoenca: {inicio, frequencia, intensidade, tratamentosAnteriores, medicamentos}
// historicoPessoal: {infancia, rotina, vicios, hobbies, trabalho}
// historicoFamiliar: {pais, irmaos, conjuge, filhos, lar, historiaPatologicaPregressa}
// examePsiquico: {aparencia, comportamento, atitude: [cooperativo, resistente, indiferente]}
