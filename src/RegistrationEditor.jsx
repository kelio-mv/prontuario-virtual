import React from "react";
import TextInput from "./TextInput";
import Select from "./Select";
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
    this.options = {
      genero: ["Masculino", "Feminino"],
      escolaridade: [
        "Ensino Fundamental incompleto",
        "Ensino Fundamental",
        "Ensino Médio",
        "Ensino Superior",
        "Pós-graduação",
        "Mestrado",
        "Doutorado",
        "Pós-doutorado",
      ],
      estadoCivil: ["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"],
      endereco: {
        estado: [
          "AC",
          "AL",
          "AP",
          "AM",
          "BA",
          "CE",
          "DF",
          "ES",
          "GO",
          "MA",
          "MT",
          "MS",
          "MG",
          "PA",
          "PB",
          "PR",
          "PE",
          "PI",
          "RJ",
          "RN",
          "RS",
          "RO",
          "RR",
          "SC",
          "SP",
          "SE",
          "TO",
        ],
      },
    };
  }
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
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
        </div>
      </div>
    );
  }
}
