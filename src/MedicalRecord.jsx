import Modal from "./utils/Modal";
import RegistrationForm from "./RegistrationForm";

export default function MedicalRecord(props) {
  const data = {
    registration: JSON.parse(localStorage.patients)[props.patientId].cadastro,
  };

  return (
    <Modal header={<h1>Prontuário</h1>} onClose={props.onClose} readOnly>
      <RegistrationForm {...data.registration} />
    </Modal>
  );
}
