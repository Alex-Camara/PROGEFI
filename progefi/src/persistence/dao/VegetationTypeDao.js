'use strict'

import VegetationTypeDaoImp from '../daoImp/VegetationTypeDaoImp'

class VegetationTypeDao {
    constructor() {
        this.vegetationTypeDaoImp = new VegetationTypeDaoImp();
    }
    getVegetationTypes() {
        let vegetationTypes = Promise.resolve(this.vegetationTypeDaoImp.getVegetationTypes())
        return vegetationTypes;
    }
    getVegetationType(vegetationTypeId) {
        let vegetationType = Promise.resolve(this.vegetationTypeDaoImp.getVegetationType(vegetationTypeId))
        return vegetationType;
    }
}

export default VegetationTypeDao;