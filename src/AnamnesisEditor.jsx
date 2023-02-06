import React from "react";
import Modal from "./Modal";
import AnamnesisForm from "./AnamnesisForm";

export default class AnamnesisEditor extends React.Component {
  constructor(props) {
    super();
    const patient = JSON.parse(localStorage.patients)[props.patientId];

    this.state = {
      atendimento: {
        queixaPrincipal: "",
        sintomas: "",
      },
      historicoDoenca: {
        inicio: "",
        frequencia: "",
        intensidade: "",
        tratamentosAnteriores: "",
        medicamentos: "",
      },
      historicoPessoal: {
        infancia: "",
        rotina: "",
        vicios: "",
        hobbies: "",
        trabalho: "",
        hpp: "",
      },
      historicoFamiliar: {
        pais: "",
        irmaos: "",
        conjuge: "",
        filhos: "",
        hpp: "",
      },
      examePsiquico: {
        aparencia: "",
        comportamento: "",
        atitude: [],
        memoria: "",
        inteligencia: "",
        sensopercepcao: [],
        pensamento: [],
        conteudoPensamento: [],
        conteudoPensamentoOutros: "",
        afetividade: "",
        humor: [],
        humorOutros: "",
        conscienciaDoenca: [],
      },
      hipoteseDiagnostica: "",
    };
    this.state = { ...this.state, ...patient.anamnese };
    this.patientName = patient.cadastro.nome;
  }

  save = () => {
    const allPatients = JSON.parse(localStorage.patients);
    const patient = allPatients[this.props.patientId];

    allPatients[this.props.patientId] = { ...patient, anamnese: this.state };
    localStorage.patients = JSON.stringify(allPatients);
    this.props.onClose();
  };

  render() {
    return (
      <Modal
        header={
          <>
            <h1>Anamnese</h1>
            <h2>{this.patientName}</h2>
          </>
        }
        footer={
          <div className="input-container pointer" onClick={this.save}>
            Salvar
          </div>
        }
        onClose={this.props.onClose}
      >
        <AnamnesisForm {...this.state} onChange={this.setState.bind(this)} />
      </Modal>
    );
  }
}
