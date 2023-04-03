class Storage {
  constructor() {
    this.storageFileName = "app_data.json";
    this.defaultProfilePicture =
      "data:image/png;base64,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";
    this.defaultProfileColor = "#a040ff";
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
      this.data = {
        profilePicture: this.defaultProfilePicture,
        profileColor: this.defaultProfileColor,
        patients: [],
      };
      this.sfid = await this.createStorageFile();
      await this.editStorageFile(this.data);
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
      alert(`[Storage] Error: Found ${matches.length} storage files.`);
    }
    return matches[0].id;
  }

  async loadStorage() {
    const file = await gapi.client.drive.files.get({
      fileId: this.sfid,
      alt: "media",
    });
    this.data = file.result;
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

  async editStorageFile(data) {
    const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${this.sfid}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${gapi.client.getToken().access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
  }

  getAllPatients() {
    return this.data.patients;
  }

  getPatient(id) {
    return this.getAllPatients()[id];
  }

  getPatientName(id) {
    return this.getPatient(id).cadastro.nome;
  }

  createPatient() {
    // Creates a new patient locally and returns its PID (Patient Identifier).
    // After creating a patient, you must edit their registration immediately or
    // the App may crash, since it needs their name to render the MainPage.
    const newPatient = { cadastro: {}, anamnese: {}, registrosDeSessao: [] };
    this.data.patients = [...this.data.patients, newPatient];
    return this.data.patients.length - 1;
  }

  async editPatient(id, data) {
    // Setting window.beforeunload to a function that returns a string will make the
    // browser warn the user if they are trying to close the page before the upload is done.
    window.onbeforeunload = () => "";
    this.data.patients[id] = data;
    await this.editStorageFile(this.data);
    window.onbeforeunload = null;
  }

  async editProfile(data) {
    this.data.profilePicture = data.picture;
    this.data.profileColor = data.color;
    await this.editStorageFile(this.data);
  }
}

export default new Storage();
