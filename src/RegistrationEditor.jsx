import React from "react";
import Modal from "./Modal";
import TextInput from "./TextInput";
import Select from "./Select";
import options from "./options";
import "./RegistrationEditor.css";

export default class RegistrationEditor extends React.Component {
  constructor(props) {
    super(props);
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
    this.options = options.registration;
  }

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
        id="registration-editor"
        header="Novo Paciente"
        footer={
          <div className="input-container" onClick={this.save}>
            Salvar
          </div>
        }
        onClose={this.props.onClose}
      >
        <div className="row">
          <TextInput
            className="grow"
            label="Nome"
            value={this.state.nome}
            onChange={(value) => this.setState({ nome: value })}
          />
          <Select
            label="Gênero"
            options={this.options.genero}
            value={this.state.genero}
            onChange={(value) => this.setState({ genero: value })}
          ></Select>
          <TextInput
            label="Data de nascimento"
            value={this.state.nascimento}
            onChange={(value) => this.setState({ nascimento: value })}
          />
          <TextInput label="Idade" value="" />
          <TextInput
            label="Telefone"
            value={this.state.telefone}
            onChange={(value) => this.setState({ telefone: value })}
            minWidth="15ch"
          />
        </div>

        <div className="row">
          <Select
            label="Grau de escolaridade"
            options={this.options.escolaridade}
            value={this.state.escolaridade}
            onChange={(value) => this.setState({ escolaridade: value })}
          ></Select>
          <TextInput
            className="grow"
            label="Profissão"
            value={this.state.profissao}
            onChange={(value) => this.setState({ profissao: value })}
          />
          <Select
            label="Estado civil"
            options={this.options.estadoCivil}
            value={this.state.estadoCivil}
            onChange={(value) => this.setState({ estadoCivil: value })}
          ></Select>
          <TextInput
            className="grow"
            label="Cidade"
            value={this.state.endereco.cidade}
            onChange={(value) =>
              this.setState({ endereco: { ...this.state.endereco, cidade: value } })
            }
          />
          <Select
            label="Estado"
            options={this.options.endereco.estado}
            value={this.state.endereco.estado}
            onChange={(value) =>
              this.setState({ endereco: { ...this.state.endereco, estado: value } })
            }
          />
        </div>
      </Modal>
    );
  }
}
