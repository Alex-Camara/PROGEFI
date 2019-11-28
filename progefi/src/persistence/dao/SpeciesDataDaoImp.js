'use strict'

const Sex = require('../models/Sex')
const LifeStage = require('../models/LifeStage').default

class SpeciesDataDaoImp {
    async getSexes() {
        const sexes = await Sex.query();

        var resourcesPath = "/src/persistence/resources/";
        var fullPath = require('path').resolve(__dirname, '..') + resourcesPath;

        for (let i = 0; i < sexes.length; i++) {
            sexes[i].iconPath = fullPath + sexes[i].iconPath;
        }

        return sexes;
    }
    async getLifeStages() {
        const lifeStages = await LifeStage.query();
        return lifeStages;
    }
}

export default SpeciesDataDaoImp;