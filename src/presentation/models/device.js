"use strict";
const { ipcRenderer } = require("electron");
import Validator from "../validators/validator";

class Device {
  constructor() {
    this.id = null;
    this.name = null;
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  async setDevice(device) {
    await this.setName(device.name);
    this.id = device.id;
  }
  setName(name) {
    return new Promise(resolve => {
      var validator = new Validator();
      let regex = "^[a-zA-Z /()]*$";
      validator
        .testValidationOne(name, 2, 30, this.required, regex)
        .then(() => {
          this.name = name;
          this.valid = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (error == "Campo requerido") {
            this.name = name;
            this.valid = { isValid: false, message: error };
            resolve();
          } else if (error == "Longitud mínima inválida") {
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
        ipcRenderer.send("createDevice", this);
        ipcRenderer.once("deviceCreated", (event, createdDeviceId) => {
          this.id = createdDeviceId;
          resolve();
        });
      }
    });
  }
  static getAll(device) {
    return new Promise(resolve => {
      if (device !== "") {
        ipcRenderer.send("getDevices", device);
        ipcRenderer.once("devices", async (event, receivedDevices) => {
          let devices = [];
          for (let i = 0; i < receivedDevices.length; i++) {
            let newDevice = new Device();
            await newDevice.setDevice(receivedDevices[i]);
            devices.push(newDevice);
          }
          resolve(devices);
        });
      } else {
        resolve([]);
      }
    });
  }
  static getExisting(device) {
    return new Promise(async resolve => {
      let devices = await this.getAll(device);
      let foundDevice = devices.find(x => x.name === device);
      // Si el dispositivo ya esta registrado en la lista, se obtiene el objeto y no se valida
      if (foundDevice) {
        resolve(foundDevice);
      } else {
        resolve(null);
      }
    });
  }
}

export default Device;
