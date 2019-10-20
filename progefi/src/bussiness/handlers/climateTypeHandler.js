"use strict";
import ClimateTypeDao from '../dao/ClimateTypeDao.js'

class ClimateTypeHandler {
    constructor(){
        this.climateTypeDao = new ClimateTypeDao()
    }
    async getClimateTypes(result) {
        let climateTypes = await this.climateTypeDao.getClimateTypes();
        result(climateTypes);
    }
    async getVegetationTypes(result) {
        let vegetationTypes = await this.climateTypeDao.getVegetationTypes();
        result(vegetationTypes);
    }
}

export default ClimateTypeHandler;