import TextInput from "./utils/TextInput";
import DateInput from "./utils/DateInput";
import DropdownSelect from "./utils/DropdownSelect";
import allOptions from "./options";

export default function RegistrationForm(props) {
  function getPatientAge() {
    if (!props.nascimento) {
      return "--";
    }
    const today = new Date();
    const birth = new Date(props.nascimento);
    const yearDelta = today.getFullYear() - birth.getFullYear();
    const timeOffset =
      new Date(2023, today.getMonth(), today.getDate()) -
      new Date(2023, birth.getMonth(), birth.getDate() + 1);

    const patientAge = timeOffset < 0 ? yearDelta - 1 : yearDelta;
    return patientAge >= 0 && patientAge <= 120 ? patientAge : "--";
  }

  function formatPhoneNumber(value) {
    const number = value.replace(/[^0-9]/g, "");

    if (number.length <= 1) {
      return number.slice(0, 1);
    }
    if (number.length <= 9) {
      return `(${number.slice(0, 2)}) ${number.slice(2, 9)}`;
    }
    if (number.length === 10) {
      return `(${number.slice(0, 2)}) ${number.slice(2, 6)}-${number.slice(6, 10)}`;
    }
    if (number.length > 10) {
      return `(${number.slice(0, 2)}) ${number[2]} ${number.slice(3, 7)}-${number.slice(7, 11)}`;
    }
  }

  const options = allOptions.cadastro;

  return (
    <div id="registration-form">
      <div className="row">
        <TextInput
          label="Nome"
          value={props.nome}
          onChange={(value) => props.onChange({ nome: value })}
        />
        <DropdownSelect
          label="Gênero"
          options={options.genero}
          value={props.genero}
          onChange={(value) => props.onChange({ genero: value })}
        />
      </div>

      <div className="row">
        <DateInput
          label="Data de nascimento"
          value={props.nascimento}
          onChange={(value) => props.onChange({ nascimento: value })}
        />
        <TextInput label="Idade" value={getPatientAge()} disabled />
      </div>
      <div className="row">
        <TextInput
          label="Telefone"
          value={props.telefone}
          onChange={(value) => props.onChange({ telefone: formatPhoneNumber(value) })}
        />
        <TextInput
          label="Profissão"
          value={props.profissao}
          onChange={(value) => props.onChange({ profissao: value })}
        />
      </div>
      <div className="row">
        <DropdownSelect
          label="Grau de escolaridade"
          options={options.escolaridade}
          value={props.escolaridade}
          onChange={(value) => props.onChange({ escolaridade: value })}
        />
        <DropdownSelect
          label="Estado civil"
          options={options.estadoCivil}
          value={props.estadoCivil}
          onChange={(value) => props.onChange({ estadoCivil: value })}
        />
      </div>
      <div className="row">
        <TextInput
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
