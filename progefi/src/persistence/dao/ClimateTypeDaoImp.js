'use strict'

const ClimateType = require('../models/ClimateType')

class ClimateTypeDaoImp {
  constructor () {
    this.resourcesPath = '/src/persistence/resources/'
  }
  async getClimateTypes () {
    const climateTypes = await ClimateType.query()

    for (let i = 0; i < climateTypes.length; i++) {
      if (climateTypes[i].code == 'Indeterminado') {
        var fullPath =
          require('path').resolve(__dirname, '..') + this.resourcesPath
        climateTypes[i].colorCode = fullPath + climateTypes[i].colorCode
      }
    }

    return climateTypes
  }
}

export default ClimateTypeDaoImp
