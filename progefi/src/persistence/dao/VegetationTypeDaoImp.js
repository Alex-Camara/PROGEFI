'use strict'

const VegetationType = require('../models/VegetationType')

class VegetationTypeDaoImp {
    async getVegetationTypes() {
        const vegetationTypes = await VegetationType.query()
            .select('vegetationTypes.*', 'vegetalFormations.name as vegetalFormationName')
            .join('vegetalFormations', 'vegetationTypes.vegetalFormation_id', 'vegetalFormations.id');
        //console.log('tipos de vegetación: ');
        //console.info(vegetationTypes)
        return vegetationTypes;
    }
}

export default VegetationTypeDaoImp;