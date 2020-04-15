'use strict'

class VegetationType {
  constructor() {
    this.id = null
    this.name = null
    this.vegetalFormationId = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setVegetationType(vegetationType) {
    if (vegetationType.hasOwnProperty("id")) {
      this.id = vegetationType.id
    }
    this.name = vegetationType.name
    this.vegetalFormationId = vegetationType.vegetalFormationId
    this.valid = { isValid: true, message: null };
  }
  setVegetalFormation(vegetalFormation) {
    this.vegetalFormation = vegetalFormation
  }
  setName(name) {
    this.name = name
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
  getId() {
    return this.id
  }
  getValid() {
    return this.valid
  }
  isValid(){
    return this.valid.isValid
  }
  getName() {
    return this.name
  }
}

export default VegetationType
