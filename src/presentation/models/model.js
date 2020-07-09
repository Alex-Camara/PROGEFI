"use strict";
import Validator from "../validators/validator";
import Device from "./device";
const { ipcRenderer } = require("electron");

class Model {
  constructor() {
    this.id = null;
    this.name = null;
    this.deviceId = null;
    this.device = new Device();
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  async setModel(model) {
    this.id = model.id;
    await this.setName(model.name);
    this.deviceId = model.deviceId;
    if (model.hasOwnProperty("device")) {
      let newDevice = new Device();
      await newDevice.setDevice(model.device);
      this.device = newDevice;
    }
    // debugger;
  }
  setName(name) {
    return new Promise(resolve => {
      var validator = new Validator();
      let regex = "^[a-zA-Z0-9 /():_-]*$";
      validator
        .testValidationOne(name, 2, 30, this.required, regex)
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
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
  }
  setRequired(isRequired) {
    this.required = isRequired;
  }
  async setDevice(device) {
    return new Promise(async resolve => {
      if (device.hasOwnProperty("id")) {
        device.valid = {isValid: true, message: null};
        this.device = device;
        resolve()
      } else {
        let existingDevice = await Device.getExisting(device);
        if (existingDevice) {
          existingDevice.setValid = {isValid: true, message: null};
          this.device = existingDevice;
          resolve()
        } else {
          await this.device.setName(device);
          resolve()
        }
      }
    })
  }
  getId() {
    return this.id;
  }
  getDeviceId() {
    return this.deviceId;
  }
  setDeviceId(deviceId) {
    this.deviceId = deviceId;
  }
  getName() {
    return this.name;
  }
  getValid() {
    return this.valid;
  }
  getDevice() {
    return this.device;
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
    return new Promise(async resolve => {
      if (this.id != null) {
        resolve();
      } else {
        if (this.device.getId() == null) {
          await this.device.save();
        }
        ipcRenderer.send("createModel", this);
        ipcRenderer.once("modelCreated", (event, createdModel) => {
          this.id = createdModel.id;
          resolve();
        });
      }
    });
  }
  static getAll(deviceId) {
    return new Promise(resolve => {
      if (deviceId != null) {
        ipcRenderer.send("getModels", deviceId);
        ipcRenderer.once("models", async (event, receivedModels) => {
          let models = [];
          for (let i = 0; i < receivedModels.length; i++) {
            let newModel = new Model();
            await newModel.setModel(receivedModels[i]);
            models.push(newModel);
          }
          resolve(models);
        });
      } else {
        resolve([]);
      }
    });
  }
  static getExisting(model, deviceId) {
    return new Promise(async resolve => {
      let models = await Model.getAll(deviceId);
      let foundModel = models.find(x => x.name === model);
      // Si el dispositivo ya esta registrado en la lista, se obtiene el objeto y no se valida
      if (foundModel) {
        resolve(foundModel);
      } else {
        resolve(null);
      }
    });
  }
}

export default Model;
