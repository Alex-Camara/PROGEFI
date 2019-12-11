'use strict'

const Sex = require('../models/Sex')
const LifeStage = require('../models/LifeStage').default

class SpeciesDataDaoImp {
    constructor(){
        this.resourcesPath = "/src/persistence/resources/"
    }
    async getSexes() {
        const sexes = await Sex.query();

        //var resourcesPath = 
        var fullPath = require('path').resolve(__dirname, '..') + this.resourcesPath;

        for (let i = 0; i < sexes.length; i++) {
            sexes[i].iconPath = fullPath + sexes[i].iconPath;
        }

        return sexes;
    }
    async getLifeStages() {
        const lifeStages = await LifeStage.query();

        var fullPath = require('path').resolve(__dirname, '..') + this.resourcesPath;

        for (let i = 0; i < lifeStages.length; i++) {
            lifeStages[i].iconPath = fullPath + lifeStages[i].iconPath;
        }

        return lifeStages;
    }
}

export default SpeciesDataDaoImp;