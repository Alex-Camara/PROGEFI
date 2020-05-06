"use strict";
import Validator from "../validators/validator";
const { ipcRenderer } = require("electron");

class Sex {
  constructor() {
    this.id = null;
    this.name = "";
    this.iconPath = null;
    this.symbol = "";
    this.nameValid = {};
    this.nameValid.isValid = false;
    this.nameValid.message = "Campo requerido";
  }
  setSex(sex) {
    this.id = sex.id;
    this.name = sex.name;
    this.symbol = sex.symbol;
    this.iconPath = sex.iconPath;
    this.nameValid = { isValid: true, message: null };
  }
  setName(name) {
    return new Promise(resolve => {
      var validator = new Validator();
      let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
      validator
        .testValidationOne(name, 2, 30, true, regex)
        .then(() => {
          this.name = name;
          this.nameValid = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (error === "Campo requerido") {
            this.name = name;
            this.nameValid = { isValid: false, message: error };
            resolve();
          } else if (error === "Longitud mínima inválida") {
            this.name = name;
            // debugger;
            this.nameValid = { isValid: false, message: error };
            resolve();
          } else if (this.nameValid.isValid) {
            this.nameValid = { isValid: true, message: "temporary error" };
            resolve();
          } else {
            this.nameValid = { isValid: false, message: error };
            resolve();
          }
        });
    });
  }
  setNameValid(valid) {
    this.nameValid.isValid = valid.isValid;
    this.nameValid.message = valid.message;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getSymbol() {
    if (this.symbol === ""){
      return this.name;
    } else{
      return this.symbol;
    }
  }
  getIconPath() {
    return this.iconPath;
  }
  getNameValid() {
    return this.nameValid;
  }
  isValid() {
    return this.nameValid.isValid;
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
