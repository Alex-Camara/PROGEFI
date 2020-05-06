"use strict";
import Validator from "../validators/validator";

const { ipcRenderer } = require("electron");

class ClimateType {
  constructor() {
    this.id = null;
    this.code = "";
    this.colorCode = null;
    this.description = null;
    this.required = true;
    this.codeValid = {};
    this.codeValid.isValid = false;
    this.codeValid.message = "Campo requerido";
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  setClimateType(climateType) {
    this.id = climateType.id;
    this.code = climateType.code;
    this.colorCode = climateType.colorCode;
    this.description = climateType.description;
    this.setValid({ isValid: true, message: null });
    this.setCodeValid({ isValid: true, message: null });
  }
  setCode(code) {
    return new Promise(resolve => {
      var validator = new Validator();
      let regex = "^[a-zA-Z0-9 \\'/():_-]*$";
      validator
        .testValidationOne(code, 2, 30, true, regex)
        .then(() => {
          this.code = code;
          this.codeValid = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (error === "Campo requerido") {
            this.code = code;
            this.codeValid = { isValid: false, message: error };
            resolve();
          } else if (error === "Longitud mínima inválida") {
            this.code = code;
            this.codeValid = { isValid: false, message: error };
            resolve();
          } else if (this.codeValid.isValid) {
            this.codeValid = { isValid: true, message: "temporary error" };
            resolve();
          } else {
            this.codeValid = { isValid: false, message: error };
            resolve();
          }
        });
    });
  }
  setRequired(isRequired) {
    this.required = isRequired;
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
  }
  setCodeValid(valid) {
    this.codeValid.isValid = valid.isValid;
    this.codeValid.message = valid.message;
  }
  getCode() {
    return this.code;
  }
  getDescription() {
    return this.description;
  }
  getColorCode() {
    return this.colorCode;
  }
  isCodeValid() {
    return this.codeValid.isValid;
  }
  getValid() {
    return this.valid;
  }
  getCodeValid() {
    return this.codeValid;
  }
  static getAll() {
    return new Promise(resolve => {
      ipcRenderer.send("getClimateTypes");
      ipcRenderer.once("climateTypes", (event, receivedClimateTypes) => {
        let climatesTypes = [];
        for (let i = 0; i < receivedClimateTypes.length; i++) {
          let climateType = new ClimateType();
          climateType.setClimateType(receivedClimateTypes[i]);
          climatesTypes.push(climateType);
        }
        resolve(climatesTypes)
      });
    });
  }
}

export default ClimateType;
