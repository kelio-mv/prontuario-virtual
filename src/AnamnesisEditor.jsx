import React from "react";
import Modal from "./Modal";
import AnamnesisForm from "./AnamnesisForm";

export default class AnamnesisEditor extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.patientName = JSON.parse(localStorage.patients)[props.patientId].cadastro.nome;
  }

  save = () => {};

  render() {
    return (
      <Modal
        header={
          <div>
            <h1>Anamnese</h1>
            <h2>{this.patientName}</h2>
          </div>
        }
        footer={
          <div className="input-container pointer" onClick={this.save}>
            Salvar
          </div>
        }
        onClose={this.props.onClose}
      >
        <AnamnesisForm />
      </Modal>
    );
  }
}
