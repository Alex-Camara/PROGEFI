'use strict'

const Collector = require('../models/Collector')

class CollectorDaoImp {
    async getCollectors(selectedCollector) {
        const collectors = await Collector.query()
        .where('name', 'like', '%' + selectedCollector + '%')
        .limit(10)
        return collectors;
    }
    async createCollector(collector){
        const createdCollector = await Collector.query().insert({
            name: collector.name
        })
        console.log(createdCollector)
        return createdCollector;
    }
}

export default CollectorDaoImp;