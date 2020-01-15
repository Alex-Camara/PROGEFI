'use strict'

class ClimateType {
  constructor () {
    this.id = null
    this.code = null
    this.colorCode = null
    this.description = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setClimateType (climateType) {
    this.id = climateType.id
    this.code = climateType.code
    this.colorCode = climateType.colorCode
    this.description = climateType.description
  }
  setCode (code) {
    this.code = code
  }
  setRequired (isRequired) {
    this.required = isRequired
  }
  setValid (valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
  getCode(){
    return this.code
  }
  getDescription(){
    return this.description
  }
  getColorCode(){
    return this.colorCode
  }
  isValid(){
    return this.valid.isValid
  }
  getValid(){
    return this.valid
  }
}

export default ClimateType
