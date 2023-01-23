import React from "react";
import RegistrationEditor from "./RegistrationEditor";
import "./App.css";
import "./Header.css";
import "./InputsContainer.css";
import "./MainArea.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showRegistrationEditor: false,
      showSessionsLog: false,
    };
    this.patients = [
      { name: "Késsia Laíse Alves Minervino" },
      { name: "Kélio Josué Alves Minervino" },
      { name: "Carlos Vinicius Alves Minervino" },
      { name: "Carlos Vinicius Alves Minervino" },
    ];
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
          {this.patients.map((p, i) => (
            <div key={i} className="row">
              <img src="patient-picture.png" alt="patient picture" />
              <p className="name">{p.name}</p>
              <div className="grow"></div>
              <div className="input-container">Anamnese</div>
              <div className="input-container">Evolução</div>
            </div>
          ))}
        </main>

        {/* Registration editor */}
        {this.state.showRegistrationEditor && <RegistrationEditor />}
      </>
    );
  }
}

const cadastro = {
  nome: "",
  genero: "",
  nascimento: "",
  telefone: "",
  escolaridade: "",
  profissao: "",
  estadoCivil: "",
  endereco: {
    cidade: "",
    estado: "",
  },
};

const opcoesCadastro = {
  genero: ["Masculino", "Feminino"],
  escolaridade: [
    "Ensino Fundamental incompleto",
    "Ensino Fundamental",
    "Ensino Médio",
    "Ensino Superior",
    "Pós-graduação",
    "Mestrado",
    "Doutorado",
    "Pós-doutorado",
  ],
  estadoCivil: ["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"],
  endereco: {
    estado: [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
  },
};

// Anamnese:
// atendimento: {queixaPrincipal, sintomas}
// historicoDoenca: {inicio, frequencia, intensidade, tratamentosAnteriores, medicamentos}
// historicoPessoal: {infancia, rotina, vicios, hobbies, trabalho}
// historicoFamiliar: {pais, irmaos, conjuge, filhos, lar, historiaPatologicaPregressa}
// examePsiquico: {aparencia, comportamento, atitude: [cooperativo, resistente, indiferente]}
