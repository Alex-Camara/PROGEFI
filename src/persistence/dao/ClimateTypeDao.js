'use strict'

import ClimateTypeDaoImp from '../daoImp/ClimateTypeDaoImp'

class ClimateTypeDao {
    constructor() {
        this.climateTypeDaoImp = new ClimateTypeDaoImp();
    }
    getClimateTypes() {
        let climateTypes = Promise.resolve(this.climateTypeDaoImp.getClimateTypes())
        return climateTypes;
    }
    getClimateType(climateTypeId){
        let climateType = Promise.resolve(this.climateTypeDaoImp.getClimateType(climateTypeId))
        return climateType;
    }
}

export default ClimateTypeDao;