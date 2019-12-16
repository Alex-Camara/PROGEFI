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
    createCollector(collector) {
        let createdCollector = Promise.resolve(this.collectorDaoImp.createCollector(collector));
        return createdCollector;
    }
}

export default CollectorDao;