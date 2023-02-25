import Modal from "./utils/Modal";
import RegistrationForm from "./RegistrationForm";
import AnamnesisForm from "./AnamnesisForm";
import SessionLogForm from "./SessionLogForm";
import storage from "./storage";

export default function MedicalRecord(props) {
  const patient = storage.getPatient(props.pid);
  const displayAnamnesis = JSON.stringify(patient.anamnese) !== "{}";

  const getSortedSessionLogs = () => {
    return patient.registrosDeSessao.sort((sl1, sl2) => {
      const [t1, t2] = [sl1.data, sl2.data].map((date) => new Date(date).getTime());
      return t1 - t2;
    });
  };

  return (
    <Modal
      header={<h1>Prontuário</h1>}
      footer={
        <div className="input-box pointer" onClick={print}>
          Imprimir
        </div>
      }
      onClose={props.onClose}
    >
      <div id="medical-record">
        <MRSectionHeader text="Cadastro" />
        <RegistrationForm {...patient.cadastro} />

        <MRSectionHeader text="Anamnese" />
        {displayAnamnesis && <AnamnesisForm {...patient.anamnese} />}

        <MRSectionHeader text="Registros de Sessão" />
        {getSortedSessionLogs().map((sl, i) => (
          <SessionLogForm key={i} {...sl} />
        ))}
      </div>
    </Modal>
  );
}

function MRSectionHeader(props) {
  return (
    <div className="mr-section-header">
      <div className="line" />
      <h2>{props.text}</h2>
      <div className="line" />
    </div>
  );
}
