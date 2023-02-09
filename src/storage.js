class Storage {
  constructor() {
    if (!localStorage.patients) {
      localStorage.patients = "[]";
    }
  }

  getAllPatients() {
    return JSON.parse(localStorage.patients);
  }

  getPatient(id) {
    return this.getAllPatients()[id];
  }

  getAllPatientsNames() {
    return this.getAllPatients().map((p) => p.cadastro.nome);
  }

  getPatientName(id) {
    return this.getPatient(id).cadastro.nome;
  }

  createPatient() {
    const allPatients = this.getAllPatients();
    const newPatient = { cadastro: {}, anamnese: {}, registroDeSessoes: [] };
    localStorage.patients = JSON.stringify([...allPatients, newPatient]);
    return allPatients.length;
  }

  editPatient(id, data) {
    const allPatients = this.getAllPatients();
    allPatients[id] = data;
    localStorage.patients = JSON.stringify(allPatients);
  }
}

export default new Storage();
