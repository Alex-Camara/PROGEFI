"use strict";
const { ipcRenderer } = require("electron");

class ClimateType {
  constructor() {
    this.id = null;
    this.code = null;
    this.colorCode = null;
    this.description = null;
    this.required = true;
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
  }
  setCode(code) {
    this.code = code;
  }
  setRequired(isRequired) {
    this.required = isRequired;
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
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
  isValid() {
    return this.valid.isValid;
  }
  getValid() {
    return this.valid;
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
