'use strict'

import DatacardDaoImp from '../../persistence/dao/DatacardDaoImp'

class DatacardDao {
    constructor() {
        this.datacardDaoImp = new DatacardDaoImp();
    }
    createDatacard(datacard) {
        let createdDatacard = Promise.resolve(this.datacardDaoImp.createDatacard(datacard));
        return createdDatacard;
    }
}

export default DatacardDao;