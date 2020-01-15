'use strict'

class Model {
  constructor () {
    this.id = null
    this.name = null
    this.deviceId = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setModel (model) {
    this.id = model.id
    this.name = model.name
    this.deviceId = model.deviceId
  }
  setName (name) {
    this.name = name
  }
  setValid (valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
  setRequired (isRequired) {
    this.required = isRequired
  }
  getId () {
    return this.id
  }
  getDeviceId () {
    return this.deviceId
  }
  setDeviceId (deviceId) {
    this.deviceId = deviceId
  }
  getName () {
    return this.name
  }
  getValid () {
    return this.valid
  }
  isValid () {
    return this.valid.isValid
  }
  isRequired () {
    return this.required
  }
  getErrorMessage () {
    return this.valid.message
  }
}

export default Model
