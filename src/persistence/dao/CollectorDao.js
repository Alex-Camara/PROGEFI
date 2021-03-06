'use strict'

import CollectorDaoImp from '../daoImp/CollectorDaoImp'

class CollectorDao {
  constructor () {
    this.collectorDaoImp = new CollectorDaoImp()
  }
  getAll () {
    let collectors = Promise.resolve(
      this.collectorDaoImp.getAll()
    )
    return collectors
  }
  getAllByName (name) {
    let collectors = Promise.resolve(
        this.collectorDaoImp.getAllByName(name)
    )
    return collectors
  }
  getCollector (collectorId) {
    let collector = Promise.resolve(
      this.collectorDaoImp.getCollector(collectorId)
    )
    return collector
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
  getDatacardsCountByCollector (collectorId, catalogueId) {
    let count = Promise.resolve(
      this.collectorDaoImp.countDatacardsCreated(collectorId, catalogueId)
    )
    return count
  }

  getCollectorByName(collectorName){
    let isDuplicated = Promise.resolve(
        this.collectorDaoImp.getCollectorByName(collectorName)
    )
    return isDuplicated
  }
}

export default CollectorDao
