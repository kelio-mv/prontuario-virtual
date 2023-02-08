import Modal from "./utils/Modal";
import RegistrationForm from "./RegistrationForm";
import AnamnesisForm from "./AnamnesisForm";
import storage from "./storage";

export default function MedicalRecord(props) {
  const patient = storage.getPatient(props.pid);

  return (
    <Modal header={<h1>Prontuário</h1>} onClose={props.onClose}>
      <div id="medical-record">
        <RegistrationForm {...patient.cadastro} />
        {/* <AnamnesisForm {...patient.anamnese} /> */}
      </div>
    </Modal>
  );
}
