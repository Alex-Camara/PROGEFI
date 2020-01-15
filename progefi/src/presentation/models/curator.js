'use strict'

class Curator {
  constructor () {
    this.id = null
    this.name = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = null
  }
  setCurator (curator) {
    this.id = curator.id
    this.name = curator.name
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

export default Curator
