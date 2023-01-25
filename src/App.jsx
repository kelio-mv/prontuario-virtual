import React from "react";
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
      showRegistrationEditor: false,
      showSessionsLog: false,
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
            <div key={i} className="row">
              <img src="patient-picture.png" alt="patient picture" />
              <p className="name">{p.cadastro.nome}</p>
              <div className="grow"></div>
              <div className="input-container">Anamnese</div>
              <div className="input-container">Evolução</div>
            </div>
          ))}
        </main>

        {/* Registration editor */}
        {this.state.showRegistrationEditor && (
          <RegistrationEditor onClose={() => this.setState({ showRegistrationEditor: false })} />
        )}
      </>
    );
  }
}

// Trocar variável border-radius para pill
// Definir border-radius como 9px e definir border-radius dos componentes do modal para a variável

// Anamnese:
// atendimento: {queixaPrincipal, sintomas}
// historicoDoenca: {inicio, frequencia, intensidade, tratamentosAnteriores, medicamentos}
// historicoPessoal: {infancia, rotina, vicios, hobbies, trabalho}
// historicoFamiliar: {pais, irmaos, conjuge, filhos, lar, historiaPatologicaPregressa}
// examePsiquico: {aparencia, comportamento, atitude: [cooperativo, resistente, indiferente]}
