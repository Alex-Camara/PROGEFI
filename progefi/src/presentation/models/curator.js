"use strict";
import Validator from "../validators/validator";
const { ipcRenderer } = require("electron");

class Curator {
  constructor() {
    this.id = null;
    this.name = null;
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = null;
  }
  setCurator(curator) {
    this.id = curator.id;
    this.name = curator.name;
  }
  setName(name) {
    return new Promise(resolve => {
      var validator = new Validator();
      let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
      validator
        .testValidationOne(name, 2, 50, this.required, regex)
        .then(() => {
          this.name = name;
          this.valid = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (error === "Campo requerido") {
            this.name = name;
            this.valid = { isValid: false, message: error };
            resolve();
          } else if (error === "Longitud mínima inválida") {
            this.name = name;
            this.valid = { isValid: false, message: error };
            resolve();
          } else if (this.valid.isValid) {
            this.valid = { isValid: true, message: "temporary error" };
            resolve();
          } else {
            this.valid = { isValid: false, message: error };
            resolve();
          }
        });
    });
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
  }
  setRequired(isRequired) {
    this.required = isRequired;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getValid() {
    return this.valid;
  }
  isValid() {
    return this.valid.isValid;
  }
  isRequired() {
    return this.required;
  }
  getErrorMessage() {
    return this.valid.message;
  }
  save(){
    return new Promise(resolve => {
      if (this.id != null) {
        resolve();
      } else {
        ipcRenderer.send("createCurator", this);
        ipcRenderer.once("curatorCreated", (event, curatorCreated) => {
          this.setCurator(curatorCreated);
          resolve();
        });
      }
    });
  }
  static getAll(curator) {
    return new Promise(async resolve => {
      if (curator !== "") {
        ipcRenderer.send("getCurators", curator);
        ipcRenderer.once("curators", (event, receivedCurators) => {
          let curators = [];
          for (let i = 0; i < receivedCurators.length; i++) {
            let newCurator = new Curator();
            newCurator.setCurator(receivedCurators[i]);
            curators.push(newCurator);
          }
          resolve(curators);
        });
      } else {
        resolve([]);
      }
    });
  }
}

export default Curator;
