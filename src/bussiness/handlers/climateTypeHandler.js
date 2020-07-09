"use strict";
import ClimateTypeDao from '../../persistence/dao/ClimateTypeDao'

class ClimateTypeHandler {
    constructor(){
        this.climateTypeDao = new ClimateTypeDao()
    }
    async getClimateTypes(result) {
        let climateTypes = await this.climateTypeDao.getClimateTypes();
        result(climateTypes);
    }
    async getClimateType(climateTypeId) {
        return new Promise(async (resolve) => {
            let climateType = await this.climateTypeDao.getClimateType(climateTypeId);
            resolve(climateType);
        });
    }
}

export default ClimateTypeHandler;