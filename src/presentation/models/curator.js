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
  setId(id){
    this.id = id;
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
  getPreviewName(){
    if (this.name == null){
      return "Pendiente";
    } else{
      return this.name;
    }
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
  save() {
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
  static getAllByName(name) {
    return new Promise(async resolve => {
      if (name !== "") {
        ipcRenderer.send("getCuratorsByName", name);
        ipcRenderer.once("curatorsByName", (event, receivedCurators) => {
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
  static getAll() {
    return new Promise(async resolve => {
      ipcRenderer.send("getCurators");
      ipcRenderer.once("curators", (event, receivedCurators) => {
        let curators = [];
        for (let i = 0; i < receivedCurators.length; i++) {
          let newCurator = new Curator();
          newCurator.setCurator(receivedCurators[i]);
          curators.push(newCurator);
        }
        resolve(curators);
      });
    });
  }
  static getExisting(curator) {
    return new Promise(async resolve => {
      ipcRenderer.send("getCuratorByName", curator);
      ipcRenderer.once("curatorByName", async (event, receivedCurator) => {
        // debugger
        if (receivedCurator.length > 0) {
          let newCurator = new Curator();
          await newCurator.setCurator(receivedCurator[0]);
          // debugger
          resolve(newCurator);
        } else {
          resolve([]);
        }
      });
    });
  }
}

export default Curator;
