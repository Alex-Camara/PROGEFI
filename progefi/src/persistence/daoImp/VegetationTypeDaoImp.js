'use strict'

const fs = require('fs')
const VegetationType = require('../models/VegetationType')
const VegetalFormation = require('../models/VegetalFormation')

class VegetationTypeDaoImp {
    async getVegetationTypes() {
        const vegetationTypes = await VegetationType.query()
            .select('vegetationType.*', 'vegetalFormation.name as vegetalFormationName', 'vegetalFormation.imagePath as vegetalFormationImagePath')
            .join('vegetalFormation', 'vegetationType.vegetalFormationId', 'vegetalFormation.id');

        var resourcesPath = "/src/persistence/resources/";
        var fullPath = require('path').resolve(__dirname, '..') + resourcesPath;

        for (let i = 0; i < vegetationTypes.length; i++) {
            vegetationTypes[i].vegetalFormationImagePath = fullPath + vegetationTypes[i].vegetalFormationImagePath
        }

        return vegetationTypes;
    }
    async getVegetationType(vegetationTypeId) {
        let vegetationType = await VegetationType.query()
            .where('id', vegetationTypeId)

        let vegetalFormation = await VegetalFormation.query()
            .where('id', vegetationType[0].vegetalFormationId)

        vegetationType[0].vegetalFormation = vegetalFormation

        return vegetationType[0]
    }
}

export default VegetationTypeDaoImp;