import React from "react";
import Modal from "./utils/Modal";
import AnamnesisForm from "./AnamnesisForm";
import SaveButton from "./utils/SaveButton";
import storage from "./storage";
import utils from "./utils";

export default class AnamnesisEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      form: {
        atendimento: {
          queixaPrincipal: "",
          sintomas: "",
        },
        historicoDoenca: {
          inicio: "",
          frequencia: "",
          intensidade: "",
          tratamentosAnteriores: "",
          medicamentos: "",
        },
        historicoPessoal: {
          infancia: "",
          rotina: "",
          vicios: "",
          hobbies: "",
          trabalho: "",
          hpp: "",
        },
        historicoFamiliar: {
          pais: "",
          irmaos: "",
          conjuge: "",
          filhos: "",
          hpp: "",
        },
        examePsiquico: {
          aparencia: "",
          comportamento: "",
          atitude: [],
          memoria: "",
          inteligencia: "",
          sensopercepcao: [],
          pensamento: [],
          conteudoPensamento: [],
          conteudoPensamentoOutros: "",
          afetividade: "",
          humor: [],
          humorOutros: "",
          conscienciaDoenca: [],
        },
        hipoteseDiagnostica: "",
      },
    };
    this.state.form = { ...this.state.form, ...storage.getPatient(props.pid).anamnese };
    this.formInitialState = JSON.stringify(this.state.form);
    this.modalRef = React.createRef();
  }

  save = async () => {
    this.setState({ saving: true });

    const pdata = storage.getPatient(this.props.pid);
    pdata.anamnese = utils.trimObject(this.state.form);
    await storage.editPatient(this.props.pid, pdata);
    this.modalRef.current.close();
  };

  render() {
    return (
      <Modal
        ref={this.modalRef}
        header={
          <>
            <h1>Anamnese</h1>
            <h2>{storage.getPatientName(this.props.pid)}</h2>
          </>
        }
        footer={
          <SaveButton
            onClick={this.save}
            disabled={JSON.stringify(this.state.form) === this.formInitialState}
            saving={this.state.saving}
          />
        }
        onClose={this.props.onClose}
      >
        <AnamnesisForm
          {...this.state.form}
          onChange={(state) => this.setState({ form: { ...this.state.form, ...state } })}
        />
      </Modal>
    );
  }
}
