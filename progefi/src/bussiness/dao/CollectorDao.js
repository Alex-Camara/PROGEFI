'use strict'

import CollectorDaoImp from '../../persistence/dao/CollectorDaoImp'

class CollectorDao {
  constructor () {
    this.collectorDaoImp = new CollectorDaoImp()
  }
  getCollectors (selectedCollector) {
    let collectors = Promise.resolve(
      this.collectorDaoImp.getCollectors(selectedCollector)
    )
    return collectors
  }
  createCollector (collector) {
    let createdCollector = Promise.resolve(
      this.collectorDaoImp.createCollector(collector)
    )
    return createdCollector
  }
  verifyDuplicateCode (code) {
    let isDuplicated = Promise.resolve(
      this.collectorDaoImp.verifyDuplicateCode(code)
    )
    return isDuplicated
  }
  getDatacardsCountByCollector (collectorCode, catalogueId) {
    let count = Promise.resolve(
      this.collectorDaoImp.countDatacardsCreated(collectorCode, catalogueId)
    )
    return count
  }
}

export default CollectorDao
