import TextInput from "./utils/TextInput";
import DropdownSelect from "./utils/DropdownSelect";
import allOptions from "./options";
import "./RegistrationForm.css";

export default function RegistrationForm(props) {
  const options = allOptions.cadastro;

  return (
    <div id="registration-form">
      <div className="row">
        <TextInput
          className="grow"
          label="Nome"
          value={props.nome}
          onChange={(value) => props.onChange({ nome: value })}
        />
        <DropdownSelect
          label="Gênero"
          options={options.genero}
          value={props.genero}
          onChange={(value) => props.onChange({ genero: value })}
        ></DropdownSelect>

        <TextInput label="Idade" value="--" />
      </div>

      <div className="row">
        <TextInput
          className="grow"
          label="Data de nascimento"
          value={props.nascimento}
          onChange={(value) => props.onChange({ nascimento: value })}
        />
        <TextInput
          label="Telefone"
          value={props.telefone}
          onChange={(value) => props.onChange({ telefone: value })}
          style={{ minWidth: "22ch" }}
        />
        <DropdownSelect
          label="Grau de escolaridade"
          options={options.escolaridade}
          value={props.escolaridade}
          onChange={(value) => props.onChange({ escolaridade: value })}
          style={{ minWidth: "25ch" }}
        ></DropdownSelect>
      </div>
      <div className="row">
        <TextInput
          className="grow"
          label="Profissão"
          value={props.profissao}
          onChange={(value) => props.onChange({ profissao: value })}
        />
        <DropdownSelect
          label="Estado civil"
          options={options.estadoCivil}
          value={props.estadoCivil}
          onChange={(value) => props.onChange({ estadoCivil: value })}
        ></DropdownSelect>
        <TextInput
          className="grow"
          label="Cidade"
          value={props.endereco.cidade}
          onChange={(value) => props.onChange({ endereco: { ...props.endereco, cidade: value } })}
        />
        <DropdownSelect
          label="Estado"
          options={options.endereco.estado}
          value={props.endereco.estado}
          onChange={(value) => props.onChange({ endereco: { ...props.endereco, estado: value } })}
        />
      </div>
    </div>
  );
}
