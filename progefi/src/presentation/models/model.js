'use strict'
import Device from './device'

class Model {
  constructor() {
    this.id = null
    this.name = null
    this.deviceId = null
    this.device = new Device()
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setModel(model) {
    this.id = model.id
    this.name = model.name
    this.deviceId = model.deviceId
    if (model.hasOwnProperty('device')) {
      let newDevice = new Device()
      newDevice.setDevice(model.device[0])
      this.device = newDevice;
    }
    // debugger;
  }
  setName(name) {
    this.name = name
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
  setRequired(isRequired) {
    this.required = isRequired
  }
  setDevice(device) {
    this.device = device
  }
  getId() {
    return this.id
  }
  getDeviceId() {
    return this.deviceId
  }
  setDeviceId(deviceId) {
    this.deviceId = deviceId
  }
  getName() {
    return this.name
  }
  getValid() {
    return this.valid
  }
  getDevice() {
    return this.device
  }
  isValid() {
    return this.valid.isValid
  }
  isRequired() {
    return this.required
  }
  getErrorMessage() {
    return this.valid.message
  }
}

export default Model