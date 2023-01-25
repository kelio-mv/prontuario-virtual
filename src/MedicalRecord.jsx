import Modal from "./Modal";
import RegistrationForm from "./RegistrationForm";

export default function MedicalRecord(props) {
  const data = {
    registration: JSON.parse(localStorage.patients)[props.patientId].cadastro,
  };

  return (
    <Modal header="Prontuário" onClose={props.onClose}>
      <RegistrationForm {...data.registration} />
    </Modal>
  );
}
