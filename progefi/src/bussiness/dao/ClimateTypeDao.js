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
}

export default ClimateTypeDao;