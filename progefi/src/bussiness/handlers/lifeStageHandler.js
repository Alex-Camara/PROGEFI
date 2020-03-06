"use strict";
import LifeStageDao from '../../persistence/dao/LifeStageDao'

class LifeStageHandler {
    constructor() {
        this.lifeStageDao = new LifeStageDao()
    }
    async getLifeStages(result) {
        let lifeStages = await this.lifeStageDao.getLifeStages();
        result(lifeStages);
    }
    async getLifeStage(lifeStageId) {
        return new Promise(async (resolve) => {
            let lifeStage = await this.lifeStageDao.getLifeStage(lifeStageId);
            resolve(lifeStage);
        });
    }
}

export default LifeStageHandler;