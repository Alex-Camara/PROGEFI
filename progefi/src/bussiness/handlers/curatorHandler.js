"use strict";
import CuratorDao from '../../persistence/dao/CuratorDao'

class CuratorHandler {
    constructor() {
        this.curatorDao = new CuratorDao()
    }
    async getCurators(result) {
        let curators = await this.curatorDao.getAll();
        result(curators);
    }
    async getCuratorsByName(selectedCurator, result) {
        let curators = await this.curatorDao.getAllByName(selectedCurator);
        result(curators);
    }
    async getDatacardCurators(datacardId) {
        return new Promise(async (resolve) => {
            let curators = await this.curatorDao.getDatacardCurators(datacardId);
            resolve(curators);
        });
    }
    async createCurator(curator, result) {
        let createdCurator = await this.curatorDao.createCurator(curator);
        result(createdCurator);
    }
}

export default CuratorHandler;