'use strict'
import CollectorDao from '../../persistence/dao/CollectorDao'

class CollectorHandler {
  constructor() {
    this.collectorDao = new CollectorDao()
  }
  async getCollectors(selectedCollector, result) {
    let collectors = await this.collectorDao.getCollectors(selectedCollector)
    result(collectors)
  }
  async getCollector(collectorId) {
    return new Promise(async (resolve) => {
      let collector = await this.collectorDao.getCollector(collectorId);
      resolve(collector);
    });
  }
  async createCollector(collector, result) {
    let createdCollector = await this.collectorDao.createCollector(collector)
    result(createdCollector)
  }
  async getDatacardsCountByCollector(collectorCode, catalogue, result) {
    let count = await this.collectorDao.getDatacardsCountByCollector(
      collectorCode,
      catalogue
    )
    result(count)
  }
  async verifyDuplicateCode(code, result) {
    let isDuplicated = await this.collectorDao.verifyDuplicateCode(code)
    if (isDuplicated.length <= 0) {
      result(false)
    } else {
      result(true)
    }
  }
}

export default CollectorHandler