'use strict'

import LifeStageDaoImp from '../daoImp/LifeStageDaoImp'

class SpeciesDataDao {
    constructor() {
        this.lifeStageDaoImp = new LifeStageDaoImp();
    }
    getLifeStages() {
        let lifeStages = Promise.resolve(this.lifeStageDaoImp.getLifeStages())
        return lifeStages;
    }
    getLifeStage(lifeStageId) {
        let lifeStage = Promise.resolve(this.lifeStageDaoImp.getLifeStage(lifeStageId))
        return lifeStage;
    }
}

export default SpeciesDataDao;