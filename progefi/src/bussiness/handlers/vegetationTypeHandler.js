"use strict";
import VegetationTypeDao from '../dao/VegetationTypeDao.js'

class VegetationTypeHandler {
    constructor(){
        this.vegetationTypeDao = new VegetationTypeDao()
    }
    async getVegetationTypes(result) {
        let vegetationTypes = await this.vegetationTypeDao.getVegetationTypes();
        result(vegetationTypes);
    }
}

export default VegetationTypeHandler;