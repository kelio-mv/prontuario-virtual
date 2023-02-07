import React from "react";
import Modal from "./utils/Modal";
import SessionLogForm from "./SessionLogForm";
import "./SessionLogEditor.css";

export default class SessionLogEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLogs: this.getSessionLogs(),
      sessionLogId: null,
      displayForm: false,
      form: this.getForm(),
    };
    this.patientName = JSON.parse(localStorage.patients)[props.patientId].cadastro.nome;
  }

  getSessionLogs() {
    const allPatients = JSON.parse(localStorage.patients);
    const patient = allPatients[this.props.patientId];
    return patient.registroDeSessoes;
  }

  getForm(sessionLogId) {
    if (sessionLogId == null) {
      return {
        data: "",
        temasAbordados: "",
        tecnicasUtilizadas: "",
        planejamentoProximaSessao: "",
      };
    }
    return this.getSessionLogs()[sessionLogId];
  }

  getFooter() {
    if (this.state.displayForm) {
      return (
        <>
          <div
            className="input-container pointer"
            onClick={() => this.setState({ displayForm: false })}
          >
            Voltar
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
          onClick={() => this.setState({ displayForm: true })}
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

    const allPatients = JSON.parse(localStorage.patients);
    const patient = allPatients[this.props.patientId];
    const patientSessionLogs = patient.registroDeSessoes;
    // When the user is creating a new Session log
    if (this.state.sessionLogId == null) {
      allPatients[this.props.patientId] = {
        ...patient,
        registroDeSessoes: [...patientSessionLogs, this.state.form],
      };
    }
    // When the user is editing a Session log
    else {
      allPatients[this.props.patientId].registroDeSessoes[this.state.sessionLogId] =
        this.state.form;
    }

    localStorage.patients = JSON.stringify(allPatients);
    this.setState({
      sessionLogs: this.getSessionLogs(),
      sessionLogId: null,
      displayForm: false,
      form: this.getForm(),
    });
  };

  render() {
    return (
      <Modal
        header={
          <>
            <h1>Registro de Sessão</h1>
            <h2>{this.patientName}</h2>
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
            {this.state.sessionLogs.map((e, i) => (
              <div
                key={i}
                className="session-log input-container"
                onClick={() =>
                  this.setState({ displayForm: true, sessionLogId: i, form: this.getForm(i) })
                }
              >
                <p>{e.data.split("-").reverse().join("/")}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    );
  }
}
