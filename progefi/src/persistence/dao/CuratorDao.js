'use strict'

import CuratorDaoImp from '../daoImp/CuratorDaoImp'

class CuratorDao {
    constructor() {
        this.curatorDaoImp = new CuratorDaoImp();
    }
    getAll() {
        let curators = Promise.resolve(this.curatorDaoImp.getAll());
        return curators;
    }
    getAllByName(selectedCurator) {
        let curators = Promise.resolve(this.curatorDaoImp.getAllByName(selectedCurator));
        return curators;
    }
    getDatacardCurators(datacardId){
        let curators = Promise.resolve(this.curatorDaoImp.getDatacardCurators(datacardId));
        return curators;
    }
    createCurator(curator) {
        let createdCurator = Promise.resolve(this.curatorDaoImp.createCurator(curator));
        return createdCurator;
    }
}

export default CuratorDao;