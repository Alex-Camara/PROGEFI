'use strict'

class Collector {
  constructor () {
    this.id = null
    this.name = null
    this.code = null
    this.createdDatacards = 0
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setCollector (collector) {
    this.id = collector.id
    this.name = collector.name
    this.code = collector.code
    this.createdDatacards = collector.createdDatacards
  }
  setId (id) {
    this.id = id
  }
  setName (name) {
    this.name = name
  }
  setCode (code) {
    this.code = code
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
  getName () {
    return this.name
  }
  getCode () {
    return this.code
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

export default Collector
