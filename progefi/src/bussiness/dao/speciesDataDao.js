'use strict'

import SpeciesDataDaoImp from '../../persistence/dao/SpeciesDataDaoImp'

class SpeciesDataDao {
    constructor() {
        this.speciesDataDaoImp = new SpeciesDataDaoImp();
    }
    getSexes() {
        let sexes = Promise.resolve(this.speciesDataDaoImp.getSexes())
        return sexes;
    }
    getLifeStages() {
        let lifeStages = Promise.resolve(this.speciesDataDaoImp.getLifeStages())
        return lifeStages;
    }
}

export default SpeciesDataDao;