"use strict";
import CuratorDao from '../dao/CuratorDao.js'

class CuratorHandler {
    constructor(){
        this.curatorDao = new CuratorDao()
    }
    async getCurators(selectedCurator, result) {
        let curators = await this.curatorDao.getCurators(selectedCurator);
        result(curators);
    }
    async createCurator(curator, result) {
        let createdCurator = await this.curatorDao.createCurator(curator);
        result(createdCurator);
    }
}

export default CuratorHandler;