'use strict'
const LifeStage = require('../models/LifeStage')

class LifeStageDaoImp {
    async getLifeStages() {
        const lifeStages = await LifeStage.query();
        return lifeStages;
    }
    async getLifeStage(lifeStageId) {
        const lifeStage = await LifeStage.query()
            .where('id', lifeStageId);
        return lifeStage[0];
    }
}

export default LifeStageDaoImp;