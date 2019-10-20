'use strict'

import ClimateTypeDaoImp from '../../persistence/dao/ClimateTypeDaoImp'

class ClimateTypeDao {
    constructor() {
        this.climateTypeDaoImp = new ClimateTypeDaoImp();
    }
    getClimateTypes() {
        let climateTypes = Promise.resolve(this.climateTypeDaoImp.getClimateTypes())
        return climateTypes;
    }
    getVegetationTypes() {
        let vegetationTypes = Promise.resolve(this.climateTypeDaoImp.getVegetationTypes())
        return vegetationTypes;
    }
}

export default ClimateTypeDao;