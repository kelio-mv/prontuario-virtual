class Utils {
  trimObject(object) {
    for (let key in object) {
      if (typeof object[key] === "string") {
        object[key] = object[key].trim();
      } else if (typeof object[key] === "object") {
        this.trimObject(object[key]);
      }
    }
    return object;
  }

  removeAccents(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

export default new Utils();
