'use strict'

const Collector = require('../models/Collector')

class CollectorDaoImp {
    async getCollectors(selectedCollector) {
        const collectors = await Collector.query()
        .where('name', 'like', '%' + selectedCollector + '%')
        .limit(10)
        return collectors;
    }
}

export default CollectorDaoImp;