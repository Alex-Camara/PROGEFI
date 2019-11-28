'use strict'

import CollectorDaoImp from '../../persistence/dao/CollectorDaoImp'

class CollectorDao {
    constructor() {
        this.collectorDaoImp = new CollectorDaoImp();
    }
    getCollectors(selectedCollector) {
        let collectors = Promise.resolve(this.collectorDaoImp.getCollectors(selectedCollector));
        return collectors;
    }
}

export default CollectorDao;