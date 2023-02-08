import React from "react";
import Modal from "./utils/Modal";
import RegistrationForm from "./RegistrationForm";
import storage from "./storage";

export default class RegistrationEditor extends React.Component {
  constructor(props) {
    super();
    this.editing = props.pid != undefined;

    if (this.editing) {
      this.state = storage.getPatient(props.pid).cadastro;
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

    if (this.editing) {
      const pdata = storage.getPatient(this.props.pid);
      pdata.cadastro = this.state;
      storage.editPatient(this.props.pid, pdata);
    } else {
      storage.createPatient(this.state);
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
        modalBodyStyle={{ padding: "3rem 1.5rem", overflow: "visible" }}
      >
        <RegistrationForm {...this.state} onChange={this.setState.bind(this)} />
      </Modal>
    );
  }
}
