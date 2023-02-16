import React from "react";
import Modal from "./utils/Modal";
import AnamnesisForm from "./AnamnesisForm";
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
    this.initialState = { ...this.state.form };
    this.modalRef = React.createRef();
  }

  getFooter() {
    const unchanged = JSON.stringify(this.state.form) === JSON.stringify(this.initialState);
    const disabled = unchanged || this.state.saving;

    return (
      <div
        className={"input-box " + (disabled ? "disabled" : "pointer")}
        onClick={disabled ? () => {} : this.save}
      >
        {this.state.saving && <div className="loader" />}
        Salvar
      </div>
    );
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
        footer={this.getFooter()}
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
