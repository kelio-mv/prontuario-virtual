import React from "react";
import Modal from "./Modal";
import AnamnesisForm from "./AnamnesisForm";

export default class AnamnesisEditor extends React.Component {
  constructor(props) {
    super();
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
        lar: "",
        hpp: "",
      },
      examePsiquico: {
        aparencia: "",
        comportamento: "",
        atitude: "",
        memoria: "",
        inteligencia: "",
        sensopercepcao: "",
        pensamento: {
          tipo: [],
          conteudo: [],
          afetividade: "",
          humor: [],
          conscienciaDoenca: "",
          hipoteseDiagnostica: "",
          _outros: {
            conteudo: "",
            humor: "",
          },
        },
      },
    };
    this.patientName = JSON.parse(localStorage.patients)[props.patientId].cadastro.nome;
  }

  save = () => {};

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
