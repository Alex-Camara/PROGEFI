'use strict'
import VegetalFormation from './vegetalFormation'

class VegetationType {
  constructor () {
    this.id = null
    this.name = null
    this.vegetalFormation = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = null
  }
  setVegetationType (vegetationType) {
    this.id = vegetationType.id
    this.name = vegetationType.name
  }
  setVegetalFormation (vegetalFormation) {
    this.vegetalFormation = vegetalFormation
  }
  setName(name){
    this.name = name
  }
  setValid (valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
  getId(){
    return this.id
  }
  getValid(){
    return this.valid
  }
  getName(){
    return this.name
  }
}

export default VegetationType
