"use strict";

import Validator from "../validators/validator";

const { ipcRenderer } = require("electron");

class Project {
  constructor() {
    this.id = null;
    this.name = "";
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
    this.nameValid = {};
    this.nameValid.isValid = false;
    this.nameValid.message = "Campo requerido";
  }
  setProject(project) {
    this.id = project.id;
    this.name = project.name;
    this.valid = { isValid: true, message: null };
    this.nameValid = { isValid: true, message: null };
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
  }
  setId(id) {
    this.id = id;
  }
  async setName(name) {
    let projects = [];
    try {
      projects = await Project.getAll();
    } catch (error) {
      return "error";
    }

    let foundProjectName = projects.find(
      x => x.name === name.toString().trim()
    );
    if (foundProjectName) {
      // debugger
      this.name = name;
      this.nameValid = {
        isValid: false,
        message: "Proyecto ya registrado"
      };
    } else {
      let regex = "^[a-zA-Z0-9 \\u00C0-\\u00FF \\,\\./():_-]*$";
      await this.validate(name, "name", 3, 100, regex);
    }
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
  getNameValid() {
    return this.nameValid;
  }
  isValid() {
    return this.valid.isValid;
  }
  isNameValid() {
    return this.nameValid.isValid;
  }
  save() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("createProject", this);
      ipcRenderer.once("projectCreated", (event, createdProjectId) => {
        if (
            createdProjectId.hasOwnProperty("nativeError") &&
            createdProjectId.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          this.id = createdProjectId;
          resolve();
        }
      });
    });
  }
  validate(testValue, testValueName, minLimit, maxLimit, regex) {
    return new Promise(async resolve => {
      // debugger;
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
            error === "Campo requerido" ||
            error === "Longitud mínima inválida"
          ) {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          } else if (error === "Campo vacío") {
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
  static getAll() {
    return new Promise(resolve => {
      ipcRenderer.send("getProjects");
      ipcRenderer.once("projects", (event, receivedProjects) => {
        let projects = [];
        for (let i = 0; i < receivedProjects.length; i++) {
          let project = new Project();
          project.setProject(receivedProjects[i]);
          projects.push(project);
        }
        resolve(projects);
      });
    });
  }
}

export default Project;
