'use strict'

class Sex {
  constructor () {
    this.id = null
    this.name = null
    this.iconPath = null
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setSex (sex) {
    this.id = sex.id
    this.name = sex.name
    this.iconPath = sex.iconPath
  }
  setName(name){
    this.name = name
  }
  setValid (valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
  getId () {
    return this.id
  }
  getName () {
    return this.name
  }
  getIconPath(){
    return this.iconPath
  }
  getValid () {
    return this.valid
  }
  isValid(){
    return this.valid.isValid
  }
}

export default Sex
