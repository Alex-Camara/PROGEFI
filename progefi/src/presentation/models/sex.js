"use strict";
const { ipcRenderer } = require("electron");

class Sex {
  constructor() {
    this.id = null;
    this.name = null;
    this.iconPath = null;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  setSex(sex) {
    this.id = sex.id;
    this.name = sex.name;
    this.iconPath = sex.iconPath;
    this.valid = { isValid: true, message: null };
  }
  setName(name) {
    this.name = name;
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getIconPath() {
    return this.iconPath;
  }
  getValid() {
    return this.valid;
  }
  isValid() {
    return this.valid.isValid;
  }
  static getAll() {
    return new Promise(resolve => {
      ipcRenderer.send("getSexes");
      ipcRenderer.once("sexes", (event, receivedSexes) => {
        let sexes = [];
        for (let i = 0; i < receivedSexes.length; i++) {
          let sex = new Sex();
          sex.setSex(receivedSexes[i]);
          sexes.push(sex);
        }
        resolve(sexes);
      });
    });
  }
}

export default Sex;
