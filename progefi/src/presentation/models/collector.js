'use strict'

class Collector {
  constructor () {
    this.id = null
    this.name = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setCollector (collector) {
    this.id = collector.id
    this.name = collector.name
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
  getId(){
      return this.id
  }
  getName(){
      return this.name
  }
  getValid(){
      return this.valid
  }
  isValid () {
    return this.valid.isValid
  }
  isRequired () {
    return this.required
  }
  getErrorMessage(){
      return this.valid.message
  }
}

export default Collector
