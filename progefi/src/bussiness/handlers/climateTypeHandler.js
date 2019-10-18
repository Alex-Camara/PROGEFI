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
}

export default ClimateTypeHandler;