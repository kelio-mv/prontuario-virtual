import React from "react";
import Modal from "./utils/Modal";
import RegistrationForm from "./RegistrationForm";
import SaveButton from "./utils/SaveButton";
import storage from "./storage";
import utils from "./utils";

export const RegEditorCtx = React.createContext();

export default class RegistrationEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editing = props.pid != undefined;
    this.state = {
      // The eventTarget value is a reference to the last clicked DOM element in the Modal.
      // When a click event is triggered, the eventTarget is changed, which updates the
      // RegEditorCtx value. The DropdownSelect components gets this value, using useContext.
      // If the component contains the event target and its options is being displayed, it
      // closes itself like an HTML Select element.
      eventTarget: null,
      saving: false,
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
    this.formInitialState = JSON.stringify(this.state.form);
    this.modalRef = React.createRef();
  }

  save = async () => {
    const form = utils.trimObject(this.state.form);

    if (!form.nome) {
      alert("Por favor, digite o nome do paciente!");
      return;
    }

    this.setState({ saving: true });

    if (this.editing) {
      const pdata = storage.getPatient(this.props.pid);
      pdata.cadastro = form;
      await storage.editPatient(this.props.pid, pdata);
    } //
    else {
      const pid = storage.createPatient();
      const pdata = storage.getPatient(pid);
      pdata.cadastro = form;
      await storage.editPatient(pid, pdata);
    }
    this.modalRef.current.close();
  };

  render() {
    return (
      <Modal
        ref={this.modalRef}
        header={<h1>{this.editing ? "Cadastro" : "Novo Paciente"}</h1>}
        footer={
          <SaveButton
            onClick={this.save}
            disabled={JSON.stringify(this.state.form) === this.formInitialState}
            saving={this.state.saving}
          />
        }
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
