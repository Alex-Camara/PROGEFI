'use strict'

const fs = require('fs')
const VegetationType = require('../models/VegetationType')

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
}

export default VegetationTypeDaoImp;