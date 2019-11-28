'use strict'

import CuratorDaoImp from '../../persistence/dao/CuratorDaoImp'

class CuratorDao {
    constructor() {
        this.curatorDaoImp = new CuratorDaoImp();
    }
    getCurators(selectedCurator) {
        let curators = Promise.resolve(this.curatorDaoImp.getCurators(selectedCurator));
        return curators;
    }
}

export default CuratorDao;