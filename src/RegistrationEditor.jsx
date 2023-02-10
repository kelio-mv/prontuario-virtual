import React from "react";
import Modal from "./utils/Modal";
import RegistrationForm from "./RegistrationForm";
import storage from "./storage";

export const RegEditorCtx = React.createContext();

export default class RegistrationEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The eventTarget value is a reference to the last clicked DOM element in the Modal.
      // When a click event is triggered, the eventTarget is changed, which updates the
      // RegEditorCtx value. The DropdownSelect components gets this value, using useContext.
      // If the component contains the event target and its options is being displayed, it
      // closes itself, to behaves like a HTML Select element.
      eventTarget: null,
    };
    if (this.editing) {
      this.state.form = storage.getPatient(props.pid).cadastro;
    } else {
      this.state.form = {
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
    this.initialState = { ...this.state.form };
    this.editing = props.pid != undefined;
    this.modalRef = React.createRef();
  }

  getFooter() {
    const disabled = JSON.stringify(this.state.form) === JSON.stringify(this.initialState);
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
        onClick={(e) => this.setState({ eventTarget: e.target })}
        modalBodyStyle={{ paddingBottom: "6rem", overflow: "visible" }}
      >
        <RegEditorCtx.Provider value={this.state.eventTarget}>
          <RegistrationForm
            {...this.state.form}
            onChange={(state) => this.setState({ form: { ...this.state.form, ...state } })}
          />
        </RegEditorCtx.Provider>
      </Modal>
    );
  }
}
