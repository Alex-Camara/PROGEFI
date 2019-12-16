"use strict";
import CollectorDao from '../dao/CollectorDao.js'

class CollectorHandler {
    constructor(){
        this.collectorDao = new CollectorDao()
    }
    async getCollectors(selectedCollector, result) {
        let collectors = await this.collectorDao.getCollectors(selectedCollector);
        result(collectors);
    }
    async createCollector(collector, result) {
        let createdCollector = await this.collectorDao.createCollector(collector);
        result(createdCollector);
    }
}

export default CollectorHandler;