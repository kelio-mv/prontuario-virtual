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
}

export default new Utils();
