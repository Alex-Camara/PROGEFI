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
}

export default CollectorHandler;