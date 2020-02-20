'use strict'

const Collector = require('../models/Collector')
const Datacard = require('../models/Datacard')

class CollectorDaoImp {
  async getCollectors (selectedCollector) {
    const collectors = await Collector.query()
      .where('name', 'like', '%' + selectedCollector + '%')
      .limit(10)

    return collectors
  }
  async countDatacardsCreated (collectorCode, catalogueId) {
    const countResult = await Datacard.query()
      .count('collectorId as count')
      .as('count')
      .where('collectorId', collectorCode)
      .where('catalogueId', catalogueId)

    console.info(countResult)
    return countResult[0].count
  }
  async createCollector (collector) {
    const createdCollector = await Collector.query().insert({
      name: collector.name,
      code: collector.code
    })
    console.log(createdCollector)
    return createdCollector
  }
  async verifyDuplicateCode (code) {
    const isDuplicated = await Collector.query().where('code', code)
    console.log(isDuplicated)
    return isDuplicated
  }
}

export default CollectorDaoImp
