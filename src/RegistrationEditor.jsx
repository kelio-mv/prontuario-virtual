import React from "react";
import Modal from "./utils/Modal";
import RegistrationForm from "./RegistrationForm";
import storage from "./storage";

export default class RegistrationEditor extends React.Component {
  constructor(props) {
    super();
    this.editing = props.pid != undefined;
    this.modalRef = React.createRef();

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
    this.initialState = { ...this.state };
  }

  getFooter() {
    const disabled = JSON.stringify(this.state) === JSON.stringify(this.initialState);
    return (
      <div
        className={"input-box " + (disabled ? "disabled" : "pointer")}
        onClick={disabled ? () => {} : this.save}
      >
        Salvar
      </div>
    );
  }

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
      const pid = storage.createPatient();
      const pdata = storage.getPatient(pid);
      pdata.cadastro = this.state;
      storage.editPatient(pid, pdata);
    }

    this.modalRef.current.close();
  };

  render() {
    return (
      <Modal
        ref={this.modalRef}
        header={<h1>{this.editing ? "Editar Cadastro" : "Novo Paciente"}</h1>}
        footer={this.getFooter()}
        onClose={this.props.onClose}
        modalBodyStyle={{ paddingBottom: "6rem", overflow: "visible" }}
      >
        <RegistrationForm {...this.state} onChange={this.setState.bind(this)} />
      </Modal>
    );
  }
}
