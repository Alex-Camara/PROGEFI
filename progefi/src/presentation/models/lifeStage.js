"use strict";
const { ipcRenderer } = require("electron");

class LifeStage {
  constructor() {
    this.id = null;
    this.name = null;
    this.iconPath = null;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  setLifeStage(lifeStage) {
    this.id = lifeStage.id;
    this.name = lifeStage.name;
    this.iconPath = lifeStage.iconPath;
    this.valid = { isValid: true, message: null };
  }
  setName(name) {
    this.name = name;
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
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
  isValid() {
    return this.valid.isValid;
  }
  getValid() {
    return this.valid;
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
