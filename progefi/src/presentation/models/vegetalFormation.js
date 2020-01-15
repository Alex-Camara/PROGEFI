'use strict'

class VegetalFormation {
  constructor () {
    this.id = null
    this.name = null
    this.imagePath = null
  }
  setVegetalFormation (vegetalFormation) {
    this.id = vegetalFormation.vegetalFormationId
    this.name = vegetalFormation.vegetalFormationName
    this.imagePath = vegetalFormation.vegetalFormationImagePath
  }
  getId(){
    return this.id
  }
  getName(){
    return this.name
  }
  getImagePath(){
    return this.imagePath
  }
}

export default VegetalFormation
