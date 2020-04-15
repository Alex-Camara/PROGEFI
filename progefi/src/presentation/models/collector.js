"use strict";
import Validator from "../validators/validator";
const { ipcRenderer } = require("electron");

class Collector {
  constructor() {
    this.id = null;
    this.name = null;
    this.code = null;
    this.createdDatacards = 0;
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
    //Atributo para general el código del colector
    this.codeCounter = 0;
  }
  async setCollector(collector) {
    this.id = collector.id;
    await this.setName(collector.name);
    this.code = collector.code;
    this.createdDatacards = collector.createdDatacards;
  }
  setId(id) {
    this.id = id;
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
            // debugger;
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
  setCode(code) {
    this.code = code;
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
  getCode() {
    return this.code;
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
  getValidMessage() {
    return this.valid.message;
  }
  generateCode() {
    return new Promise(async (resolve, reject) => {
      let names = this.name.split(" ");
      let code = "";
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        let firstLetter = name.charAt(0);
        code = code + firstLetter.toUpperCase();
      }
      let newCode = await this.verifyDuplicateCode(code);
      this.code = newCode;
      resolve(newCode);
    });
  }
  verifyDuplicateCode(code) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("verifyDuplicateCollectorCode", code);
      ipcRenderer.once("collectorCodeVerified", (event, isCodeDuplicated) => {
        if (isCodeDuplicated) {
          this.codeCounter = this.codeCounter + 1;
          let newCode = code + this.codeCounter;
          this.verifyDuplicateCode(newCode);
        } else {
          this.codeCounter = 0;
          resolve(code);
        }
      });
    });
  }
  save() {
    return new Promise(resolve => {
      if (this.id != null) {
        resolve();
      } else {
        ipcRenderer.send("createCollector", this);
        ipcRenderer.once("collectorCreated", (event, createdCollector) => {
          this.setCollector(createdCollector);
          resolve();
        });
      }
    });
  }
  static getAll(collector) {
    return new Promise(resolve => {
      if (collector !== "") {
        ipcRenderer.send("getCollectors", collector);
        ipcRenderer.once("collectors", (event, receivedCollectors) => {
          let collectors = [];
          for (let i = 0; i < receivedCollectors.length; i++) {
            let newCollector = new Collector();
            newCollector.setCollector(receivedCollectors[i]);
            collectors.push(newCollector);
          }
          resolve(collectors);
        });
      } else {
        resolve([]);
      }
    });
  }
  static getExisting(collector) {
    return new Promise(async resolve => {
      ipcRenderer.send("getCollectorByName", collector);
      ipcRenderer.once("collectorByName", async (event, receivedCollector) => {
        // debugger
        if (receivedCollector.length > 0) {
          let newCollector = new Collector();
          await newCollector.setCollector(receivedCollector[0]);
          // debugger
          resolve(newCollector);
        } else{
          resolve([])
        }
      });
    });
  }
}

export default Collector;
