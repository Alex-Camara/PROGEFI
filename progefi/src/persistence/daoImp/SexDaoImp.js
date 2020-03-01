'use strict'

const Sex = require('../models/Sex')

class SexDaoImp {
    constructor() {
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
    async getSex(sexId) {
        const sex = await Sex.query()
            .where('id', sexId);

        var fullPath = require('path').resolve(__dirname, '..') + this.resourcesPath;
        sex.iconPath = fullPath + sex.iconPath;
        return sex[0];
    }
}

export default SexDaoImp;