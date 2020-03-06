'use strict'

const Collector = require('../models/Collector')
const Datacard = require('../models/Datacard')

class CollectorDaoImp {
  async getCollectors(selectedCollector) {
    const collectors = await Collector.query()
      .where('name', 'like', '%' + selectedCollector + '%')
      .limit(10)

    return collectors
  }
  async getCollector(collectorId) {
    const collector = await Collector.query()
      .where('id', collectorId)
    return collector[0]
  }
  async countDatacardsCreated(collectorCode, catalogueId) {
    const countResult = await Datacard.query()
      .count('collectorId as count')
      .as('count')
      .where('collectorId', collectorCode)
      .where('catalogueId', catalogueId)

    return countResult[0].count
  }
  async createCollector(collector) {
    const createdCollector = await Collector.query().insert({
      name: collector.name,
      code: collector.code
    })
    // console.log(createdCollector)
    return createdCollector
  }
  async verifyDuplicateCode(code) {
    const isDuplicated = await Collector.query().where('code', code)
    // console.log(isDuplicated)
    return isDuplicated
  }
}

export default CollectorDaoImp