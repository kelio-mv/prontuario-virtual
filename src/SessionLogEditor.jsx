import React from "react";
import Modal from "./Modal";

export default class SessionLogEditor extends React.Component {
  constructor(props) {
    super();
    this.patientName = JSON.parse(localStorage.patients)[props.patientId].cadastro.nome;
  }

  render() {
    return (
      <Modal
        header={
          <div>
            <h1>Registro de Sessão</h1>
            <h2>{this.patientName}</h2>
          </div>
        }
        onClose={this.props.onClose}
      ></Modal>
    );
  }
}
