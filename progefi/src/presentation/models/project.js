"use strict";

const { ipcRenderer } = require("electron");

class Project {
  constructor() {
    this.id = null;
    this.name = null;
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  setProject(project) {
    this.id = project.id;
    this.name = project.name;
    this.valid = { isValid: true, message: null };
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
  }
  setId(id) {
    this.id = id;
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
  static getAll() {
    return new Promise((resolve) => {
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
