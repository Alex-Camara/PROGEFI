'use strict'

class LifeStage {
  constructor () {
    this.id = null
    this.name = null
    this.iconPath = null
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setLifeStage (lifeStage) {
    this.id = lifeStage.id
    this.name = lifeStage.name
    this.iconPath = lifeStage.iconPath
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
  getIconPath () {
    return this.iconPath
  }
  isValid () {
    return this.valid.isValid
  }
  getValid () {
    return this.valid
  }
}

export default LifeStage
