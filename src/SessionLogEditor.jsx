import React from "react";
import Modal from "./utils/Modal";
import SessionLogForm from "./SessionLogForm";
import InputBox from "./utils/InputBox";
import storage from "./storage";
import utils from "./utils";

export default class SessionLogEditor extends React.Component {
  constructor(props) {
    super(props);
    // The "slid" (Session Log Identifier) is the index of the selected Session Log in
    // the stored array of Session Logs of the patient.
    // When the user is creating a new Session Log, the slid value is set to "null".
    // The modal body ref and the lifecycle functions are being used for animating the
    // trasition between the session log viewer and the session log form.
    this.state = {
      sessionLogs: this.getSortedSessionLogs(),
      slid: null,
      displayForm: false,
      saving: false,
      form: null,
    };
    this.emptyForm = {
      data: "",
      temasAbordados: "",
      tecnicasUtilizadas: "",
      planejamentoProximaSessao: "",
    };
    this.modalBodyRef = React.createRef();
  }

  componentDidMount() {
    this.modalBodyHeight = this.modalBodyRef.current.offsetHeight;
  }

  componentDidUpdate(_, prevState) {
    if (this.state.displayForm !== prevState.displayForm) {
      const modalBody = this.modalBodyRef.current;
      const [prevHeight, currHeight] = [this.modalBodyHeight, modalBody.offsetHeight];
      this.modalBodyHeight = currHeight;

      if (currHeight > prevHeight) {
        requestAnimationFrame(() => {
          modalBody.style.maxHeight = `${prevHeight}px`;

          setTimeout(() => {
            modalBody.style.transition = "0.33s";
            modalBody.style.maxHeight = `${currHeight}px`;

            setTimeout(() => {
              modalBody.style.maxHeight = null;
              modalBody.style.transition = null;
            }, 330);
          });
        });
      } else if (currHeight < prevHeight) {
        requestAnimationFrame(() => {
          modalBody.style.minHeight = `${prevHeight}px`;

          setTimeout(() => {
            modalBody.style.transition = "0.33s";
            modalBody.style.minHeight = `${currHeight}px`;

            setTimeout(() => {
              modalBody.style.minHeight = null;
              modalBody.style.transition = null;
            }, 330);
          });
        });
      }
    }
  }

  getSessionLogs() {
    return storage.getPatient(this.props.pid).registrosDeSessao;
  }

  getSortedSessionLogs() {
    return this.getSessionLogs()
      .map((sl, i) => ({ ...sl, id: i }))
      .sort((sl1, sl2) => {
        const [t1, t2] = [sl1.data, sl2.data].map((date) => new Date(date).getTime());
        return t1 - t2;
      });
  }

  getSessionLog(id) {
    return this.getSessionLogs()[id];
  }

  getFooter() {
    if (this.state.displayForm) {
      const formIsUnchanged = JSON.stringify(this.state.form) === this.formInitialState;

      return (
        <>
          {!this.state.saving && (
            <InputBox onClick={() => this.setState({ displayForm: false })}>
              {formIsUnchanged ? "Voltar" : "Cancelar"}
            </InputBox>
          )}
          <InputBox onClick={this.save} disabled={formIsUnchanged || this.state.saving}>
            {this.state.saving && <div className="loader" />}
            Salvar
          </InputBox>
        </>
      );
    } else {
      return (
        <InputBox
          onClick={() => {
            const form = this.emptyForm;
            this.formInitialState = JSON.stringify(form);
            this.setState({ displayForm: true, slid: null, form });
          }}
        >
          Novo
        </InputBox>
      );
    }
  }

  save = async () => {
    // If date is invalid
    if (!this.state.form.data) {
      alert("Por favor, defina uma data válida!");
      return;
    }
    // If there is another Session log with the same date
    if (
      this.getSessionLogs()
        .filter((_, i) => i !== this.state.slid)
        .map((sl) => sl.data)
        .includes(this.state.form.data)
    ) {
      alert("Já existe um registro de sessão nessa data!");
      return;
    }
    // If the user is creating an empty Session log
    if (this.state.slid === null && utils.isSessionLogEmpty(this.state.form)) {
      alert("Por favor, preencha pelo menos um campo!");
      return;
    }

    this.setState({ saving: true });

    const pdata = storage.getPatient(this.props.pid);
    // When the user is creating a new Session log
    if (this.state.slid == null) {
      pdata.registrosDeSessao = [...pdata.registrosDeSessao, utils.trimObject(this.state.form)];
    }
    // When the user is editing a Session log...
    // If the form is empty the Sessiong log will be deleted
    else {
      if (utils.isSessionLogEmpty(this.state.form)) {
        pdata.registrosDeSessao.splice(this.state.slid, 1);
      } else {
        pdata.registrosDeSessao[this.state.slid] = utils.trimObject(this.state.form);
      }
    }
    await storage.editPatient(this.props.pid, pdata);

    this.setState({
      saving: false,
      displayForm: false,
      sessionLogs: this.getSortedSessionLogs(),
    });
  };

  render() {
    return (
      <Modal
        header={
          <>
            <h1>Registros de Sessão</h1>
            <h2>{storage.getPatientName(this.props.pid)}</h2>
          </>
        }
        footer={this.getFooter()}
        onClose={this.props.onClose}
        modalBodyRef={this.modalBodyRef}
      >
        {this.state.displayForm && (
          <>
            <SessionLogForm
              {...this.state.form}
              onChange={(state) => this.setState({ form: { ...this.state.form, ...state } })}
            />
            {this.state.slid !== null && (
              <div className="del-session-log-tip">
                <div className="icon">?</div>
                Para excluir o registro, apague todo seu conteúdo e clique em Salvar.
              </div>
            )}
          </>
        )}
        {!this.state.displayForm && (
          <div id="session-logs-viewer">
            {this.state.sessionLogs.map((sl) => (
              <InputBox
                key={sl.id}
                className="session-log"
                onClick={() => {
                  const form = this.getSessionLog(sl.id);
                  this.formInitialState = JSON.stringify(form);
                  this.setState({ displayForm: true, slid: sl.id, form });
                }}
                cursorDefault
              >
                <p>{sl.data.split("-").reverse().join("/")}</p>
              </InputBox>
            ))}
          </div>
        )}
      </Modal>
    );
  }
}
