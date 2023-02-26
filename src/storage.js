class Storage {
  constructor() {
    this.storageFileName = "patients.json";
  }

  async init() {
    const sfid = await this.getStorageFileId();
    // If the storage file was found
    if (sfid) {
      this.sfid = sfid;
      await this.loadStorage();
    }
    // If the storage file was not found
    else {
      this.patients = [];
      this.sfid = await this.createStorageFile();
      await this.editStorageFile(this.patients);
    }
  }

  async getStorageFileId() {
    const res = await gapi.client.drive.files.list({
      spaces: "appDataFolder",
      fields: "files(id, name)",
    });
    const matches = res.result.files.filter((f) => f.name === this.storageFileName);

    if (matches.length === 0) {
      return;
    }
    if (matches.length > 1) {
      throw `[Storage] Found ${matches.length} storage files in Appdata.`;
    }
    return matches[0].id;
  }

  async createStorageFile() {
    const file = await gapi.client.drive.files.create({
      resource: {
        name: this.storageFileName,
        parents: ["appDataFolder"],
      },
    });
    return file.result.id;
  }

  editStorageFile(data) {
    // Returns a promise that is resolved when the upload is done
    return fetch(`https://www.googleapis.com/upload/drive/v3/files/${this.sfid}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${gapi.client.getToken().access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async loadStorage() {
    const file = await gapi.client.drive.files.get({
      fileId: this.sfid,
      alt: "media",
    });
    this.patients = file.result;
  }

  getAllPatients() {
    return this.patients;
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
    // Creates a new patient locally and returns its PID (Patient Identifier).
    // After creating a patient, you must edit their registration immediately or
    // the App may crash, since it needs their name to render the MainPage.
    const newPatient = { cadastro: {}, anamnese: {}, registrosDeSessao: [] };
    this.patients = [...this.patients, newPatient];
    return this.patients.length - 1;
  }

  async editPatient(id, data) {
    // Setting window.beforeunload to a function that returns a string will make the
    // browser warn the user if they are trying to close the page before the upload is done.
    window.onbeforeunload = () => "";
    this.patients[id] = data;
    await this.editStorageFile(this.patients);
    window.onbeforeunload = null;
  }
}

export default new Storage();
