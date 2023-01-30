import React from "react";
import Modal from "./Modal";
import RegistrationForm from "./RegistrationForm";

export default class RegistrationEditor extends React.Component {
  constructor(props) {
    super();
    this.editing = props.patientId != undefined;

    if (this.editing) {
      this.state = JSON.parse(localStorage.patients)[props.patientId].cadastro;
    } else {
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
    }
  }

  // onChange = (element, value) => {
  //   const obj = {};
  //   obj[element] = value;
  //   this.setState(obj);
  // };

  save = () => {
    if (!this.state.nome) {
      alert("Por favor, digite o nome do paciente!");
      return;
    }

    const patient = {
      cadastro: this.state,
      anamnese: {},
      registroDeSessoes: {},
    };
    const storaged = JSON.parse(localStorage.patients);

    if (this.editing) {
      storaged[this.props.patientId] = patient;
      localStorage.patients = JSON.stringify(storaged);
    } else {
      localStorage.patients = JSON.stringify([...storaged, patient]);
    }

    this.props.onClose();
  };

  render() {
    return (
      <Modal
        header={<h1>{this.editing ? "Editar Cadastro" : "Novo Paciente"}</h1>}
        footer={
          <div className="input-container pointer" onClick={this.save}>
            Salvar
          </div>
        }
        onClose={this.props.onClose}
      >
        <RegistrationForm {...this.state} onChange={this.setState.bind(this)} />
      </Modal>
    );
  }
}
