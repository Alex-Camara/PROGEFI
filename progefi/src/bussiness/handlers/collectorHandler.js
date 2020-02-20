'use strict'
import CollectorDao from '../dao/CollectorDao.js'

class CollectorHandler {
  constructor () {
    this.collectorDao = new CollectorDao()
  }
  async getCollectors (selectedCollector, result) {
    let collectors = await this.collectorDao.getCollectors(selectedCollector)
    result(collectors)
  }
  async createCollector (collector, result) {
    let createdCollector = await this.collectorDao.createCollector(collector)
    result(createdCollector)
  }
  async getDatacardsCountByCollector (collectorCode, catalogue, result) {
    let count = await this.collectorDao.getDatacardsCountByCollector(
      collectorCode,
      catalogue
    )
    result(count)
  }
  async verifyDuplicateCode (code, result) {
    let isDuplicated = await this.collectorDao.verifyDuplicateCode(code)
    if (isDuplicated.length <= 0) {
      result(false)
    } else {
      result(true)
    }
  }
}

export default CollectorHandler
