import React from "react";
import Modal from "./utils/Modal";
import SessionLogForm from "./SessionLogForm";
import storage from "./storage";

export default class SessionLogEditor extends React.Component {
  constructor(props) {
    super(props);
    // The "slid" (Session Log Identifier) is the index of the selected Session Log in
    // the stored array of Session Logs of the patient.
    this.state = {
      sessionLogs: this.getSortedSessionLogs(),
      slid: null,
      displayForm: false,
      form: null,
    };

    this.emptyForm = {
      data: "",
      temasAbordados: "",
      tecnicasUtilizadas: "",
      planejamentoProximaSessao: "",
    };
  }

  getSessionLogs() {
    return storage.getPatient(this.props.pid).registroDeSessoes;
  }

  getSortedSessionLogs() {
    return this.getSessionLogs()
      .map((sl, i) => ({ ...sl, id: i }))
      .sort((sl1, sl2) => {
        const [t1, t2] = [sl1.data, sl2.data].map((date) => new Date(date).getTime());
        return t1 - t2;
      });
  }

  getSessionLog(slid) {
    return this.getSessionLogs()[slid];
  }

  getFooter() {
    if (this.state.displayForm) {
      return (
        <>
          <div
            className="input-container pointer"
            onClick={() => this.setState({ displayForm: false })}
          >
            Cancelar
          </div>
          <div className="input-container pointer" onClick={this.save}>
            Salvar
          </div>
        </>
      );
    } else {
      return (
        <div
          className="input-container pointer"
          onClick={() => this.setState({ displayForm: true, form: this.emptyForm })}
        >
          Novo
        </div>
      );
    }
  }

  save = () => {
    if (!this.state.form.data) {
      alert("Por favor, defina uma data válida!");
      return;
    }
    if (
      this.getSessionLogs()
        .filter((_, i) => i !== this.state.slid)
        .map((sl) => sl.data)
        .includes(this.state.form.data)
    ) {
      alert("Já existe um registro de sessão nessa data!");
      return;
    }

    const pdata = storage.getPatient(this.props.pid);
    // When the user is creating a new Session log
    if (this.state.slid == null) {
      pdata.registroDeSessoes = [...pdata.registroDeSessoes, this.state.form];
    }
    // When the user is editing a Session log
    else {
      pdata.registroDeSessoes[this.state.slid] = this.state.form;
    }
    storage.editPatient(this.props.pid, pdata);

    this.setState({
      sessionLogs: this.getSortedSessionLogs(),
      displayForm: false,
    });
  };

  render() {
    return (
      <Modal
        header={
          <>
            <h1>Registro de Sessão</h1>
            <h2>{storage.getPatientName(this.props.pid)}</h2>
          </>
        }
        footer={this.getFooter()}
        onClose={this.props.onClose}
      >
        {this.state.displayForm && (
          <SessionLogForm
            {...this.state.form}
            onChange={(state) => this.setState({ form: { ...this.state.form, ...state } })}
          />
        )}
        {!this.state.displayForm && (
          <div id="session-log-editor">
            {this.state.sessionLogs.map((sl) => (
              <div
                key={sl.id}
                className="session-log input-container"
                onClick={() =>
                  this.setState({ displayForm: true, slid: sl.id, form: this.getSessionLog(sl.id) })
                }
              >
                <p>{sl.data.split("-").reverse().join("/")}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    );
  }
}
