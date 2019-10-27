'use strict'

import VegetationTypeDaoImp from '../../persistence/dao/VegetationTypeDaoImp'

class VegetationTypeDao {
    constructor() {
        this.vegetationTypeDaoImp = new VegetationTypeDaoImp();
    }
    getVegetationTypes() {
        let vegetationTypes = Promise.resolve(this.vegetationTypeDaoImp.getVegetationTypes())
        return vegetationTypes;
    }
}

export default VegetationTypeDao;