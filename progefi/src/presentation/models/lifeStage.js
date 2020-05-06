"use strict";
import Validator from "../validators/validator";

const { ipcRenderer } = require("electron");

class LifeStage {
  constructor() {
    this.id = null;
    this.name = null;
    this.iconPath = null;
    this.nameValid = {};
    this.nameValid.isValid = false;
    this.nameValid.message = "Campo requerido";
  }
  setLifeStage(lifeStage) {
    this.id = lifeStage.id;
    this.name = lifeStage.name;
    this.iconPath = lifeStage.iconPath;
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
  getIconPath() {
    return this.iconPath;
  }
  isNameValid() {
    return this.nameValid.isValid;
  }
  getNameValid() {
    return this.nameValid;
  }
  static getAll() {
    return new Promise(resolve => {
      ipcRenderer.send("getLifeStages");
      ipcRenderer.once("lifeStages", (event, receivedLifeStages) => {
        let lifeStages = [];
        for (let i = 0; i < receivedLifeStages.length; i++) {
          let lifeStage = new LifeStage();
          lifeStage.setLifeStage(receivedLifeStages[i]);
          lifeStages.push(lifeStage);
        }
        resolve(lifeStages);
      });
    });
  }
}

export default LifeStage;
