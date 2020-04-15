'use strict'
const LifeStage = require('../models/LifeStage')

class LifeStageDaoImp {
    constructor() {
        this.resourcesPath = "/src/persistence/resources/"
    }
    async getLifeStages() {
        const lifeStages = await LifeStage.query();

        var fullPath = require('path').resolve(__dirname, '..') + this.resourcesPath;

        for (let i = 0; i < lifeStages.length; i++) {
            lifeStages[i].iconPath = fullPath + lifeStages[i].iconPath;
        }

        return lifeStages;
    }
    async getLifeStage(lifeStageId) {
        const lifeStage = await LifeStage.query()
            .where('id', lifeStageId);

        var fullPath = require('path').resolve(__dirname, '..') + this.resourcesPath;
        lifeStage.iconPath = fullPath + lifeStage.iconPath;
        return lifeStage[0];
    }
}

export default LifeStageDaoImp;