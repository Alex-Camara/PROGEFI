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
  async getDatacardsCountByCollector(collectorId, catalogue, result) {
    let count = await this.collectorDao.getDatacardsCountByCollector(
        collectorId,
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

  async getCollectorByName(collectorName, result){
    let collector = await this.collectorDao.getCollectorByName(collectorName)
    console.log('collector')
    console.info(collector)
    result(collector)
  }
}

export default CollectorHandler