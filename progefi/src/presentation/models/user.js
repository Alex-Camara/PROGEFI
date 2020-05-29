"use strict";

import Validator from "../validators/validator";
const { ipcRenderer } = require("electron");

class User {
  constructor() {
    this.id = null;
    this.name = null;
    this.nameValid = {};
    this.nameValid.isValid = false;
    this.nameValid.message = "Campo requerido";
    this.lastName = null;
    this.lastNameValid = {};
    this.lastNameValid.isValid = false;
    this.lastNameValid.message = "Campo requerido";
    this.password = null;
    this.passwordValid = {};
    this.passwordValid.isValid = false;
    this.passwordValid.message = "Campo requerido";
    this.passwordConfirmation = null;
    this.passwordConfirmationValid = {};
    this.passwordConfirmationValid.isValid = false;
    this.passwordConfirmationValid.message = "Campo requerido";
    this.keepSession = false;
  }
  setUser(user) {
    this.id = user.id;
    this.name = user.name;
    this.lastName = user.lastName;
    this.keepSession = user.keepSession;
  }
  async setName(name) {
    let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
    await this.validateString(name, "name", 3, 80, regex);
  }
  async setLastName(lastName) {
    let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
    await this.validateString(lastName, "lastName", 3, 80, regex);
  }
  async setPassword(password) {
    let regex = "^[a-zA-Z0-9 \\u00C0-\\u00FF]*$";
    await this.validateString(password, "password", 8, 15, regex);
  }
  async setPasswordConfirmation(password) {
    this.passwordConfirmation = password;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getLastName() {
    return this.lastName;
  }
  getPassword() {
    return this.password;
  }
  getPasswordConfirmation() {
    return this.passwordConfirmation;
  }
  getNameValid() {
    return this.nameValid;
  }
  getLastNameValid() {
    return this.lastNameValid;
  }
  getPasswordValid() {
    return this.passwordValid;
  }
  getPasswordConfirmationValid() {
    return this.passwordConfirmationValid;
  }
  isKeepingSession() {
    return this.keepSession;
  }
  doKeepSession(keepSession) {
    this.keepSession = keepSession;
  }
  validateString(testValue, testValueName, minLimit, maxLimit, regex) {
    return new Promise(resolve => {
      var validator = new Validator();
      validator
        .testValidationOne(testValue, minLimit, maxLimit, true, regex)
        .then(() => {
          this[testValueName] = testValue;
          this[testValueName + "Valid"] = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (
            error == "Campo requerido" ||
            error == "Longitud mínima inválida"
          ) {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          } else if (error == "Campo vacío") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else if (this[testValueName + "Valid"].isValid) {
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else {
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          }
        });
    });
  }
  save() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("createUser", this);
      ipcRenderer.once("userCreated", (event, createdUser) => {
        if (
          createdUser.hasOwnProperty("nativeError") &&
          createdUser.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          this.setUser(createdUser);
          resolve();
        }
      });
    });
  }
  validateCredentials() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("validateCredentials", this);
      ipcRenderer.once("credentialsValidated", (event, user) => {
        if (
          user.hasOwnProperty("nativeError") &&
          user.nativeError.code === "SQLITE_ERROR"

        ) {
          reject("db-error");
        } else {
          if (user.credentialsValid) {
            this.setUser(user)
            resolve();
          } else {
            reject("invalid-credentials");
          }
        }
      });
    });
  }
  static get() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getUser");
      ipcRenderer.once("userGot", (event, userGot) => {
        if (
          userGot.hasOwnProperty("nativeError") &&
          userGot.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          resolve(userGot);
        }
      });
    });
  }
}

export default User;
