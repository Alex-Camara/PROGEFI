"use strict";

import Validator from "../validators/validator";

class VegetationType {
  constructor() {
    this.id = null;
    this.name = "";
    this.vegetalFormationId = null;
    this.required = true;
    this.nameValid = {};
    this.nameValid.isValid = false;
    this.nameValid.message = "Campo requerido";
  }
  setVegetationType(vegetationType) {
    if (vegetationType.hasOwnProperty("id")) {
      this.id = vegetationType.id;
    }
    this.name = vegetationType.name;
    this.vegetalFormationId = vegetationType.vegetalFormationId;
    this.nameValid = { isValid: true, message: null };
  }
  setVegetalFormation(vegetalFormation) {
    this.vegetalFormation = vegetalFormation;
  }
  setName(name) {
    return new Promise(resolve => {
      var validator = new Validator();
      let regex = "^[a-zA-Z \\u00C0-\\u00FF -]*$";
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
  getNameValid() {
    return this.nameValid;
  }
  isNameValid() {
    return this.nameValid.isValid;
  }
  getName() {
    return this.name;
  }
}

export default VegetationType;
