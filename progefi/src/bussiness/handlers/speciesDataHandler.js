"use strict";
import SpeciesDataDao from '../dao/SpeciesDataDao.js'

class SpeciesDataHandler {
    constructor() {
        this.speciesDataDAO = new SpeciesDataDao()
    }
    async getSexes(result) {
        let sexes = await this.speciesDataDAO.getSexes();
        result(sexes);
    }
    async getLifeStages(result) {
        let lifeStages = await this.speciesDataDAO.getLifeStages();
        result(lifeStages);
    }
}

export default SpeciesDataHandler;