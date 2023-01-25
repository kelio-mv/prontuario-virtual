import React from "react";
import Modal from "./Modal";
import RegistrationForm from "./RegistrationForm";

export default class RegistrationEditor extends React.Component {
  constructor(props) {
    super();
    if (props.patientId == undefined) {
      this.state = {
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
    } else {
      this.state = JSON.parse(localStorage.patients)[props.patientId].cadastro;
    }
  }

  onChange = (element, value) => {
    const obj = {};
    obj[element] = value;
    this.setState(obj);
  };

  save = () => {
    if (!this.state.nome) {
      alert("Por favor, digite o nome do paciente!");
      return;
    }

    const patient = {
      cadastro: this.state,
      anamnese: {},
      registroSessoes: {},
    };

    const storaged = JSON.parse(localStorage.patients);
    localStorage.patients = JSON.stringify([...storaged, patient]);
    this.props.onClose();
  };

  render() {
    return (
      <Modal
        header={this.props.patientId == undefined ? "Novo Paciente" : "Editar Cadastro"}
        footer={
          <div className="input-container" onClick={this.save}>
            Salvar
          </div>
        }
        onClose={this.props.onClose}
      >
        <RegistrationForm {...this.state} onChange={this.onChange} />
      </Modal>
    );
  }
}
