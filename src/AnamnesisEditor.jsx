import React from "react";
import Modal from "./utils/Modal";
import AnamnesisForm from "./AnamnesisForm";
import storage from "./storage";

export default class AnamnesisEditor extends React.Component {
  constructor(props) {
    super(props);
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
    this.state = { ...this.state, ...storage.getPatient(props.pid).anamnese };
    this.modalRef = React.createRef();
  }

  save = () => {
    const pdata = storage.getPatient(this.props.pid);
    pdata.anamnese = this.state;
    storage.editPatient(this.props.pid, pdata);
    this.modalRef.current.close();
  };

  render() {
    return (
      <Modal
        ref={this.modalRef}
        header={
          <>
            <h1>Anamnese</h1>
            <h2>{storage.getPatientName(this.props.pid)}</h2>
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
