'use strict'

const Datacard = require('../models/Datacard')
const Datacard_has_curators = require('../models/Datacard_has_curators')

class DatacardDaoImp {
  async createDatacard (datacard) {
    const newDatacard = await Datacard.query().insert({
      code: '',
      validated: datacard.validated,
      datacardPath: datacard.datacardPath,
      collectDate: datacard.collectDate,
      longitude: datacard.longitude,
      latitude: datacard.latitude,
      altitude: datacard.altitude,
      country: datacard.country,
      countryState: datacard.countryState,
      municipality: datacard.municipality,
      locality: datacard.locality,
      scientificName: datacard.scientificName,
      commonName: datacard.commonName,
      genus: datacard.genus,
      order: datacard.order,
      family: datacard.family,
      speciesClass: datacard.speciesClass,
      phylum: datacard.phylum,
      kingdom: datacard.kingdom,
      catalogueId: datacard.catalogueId,
      collectionId: datacard.collectionId,
      projectId: datacard.projectId,
      collectorId: datacard.collectorId,
      sexId: datacard.sexId,
      sex: datacard.sex,
      lifeStageId: datacard.lifeStageId,
      lifeStage: datacard.lifeStage,
      climateTypeId: datacard.climateTypeId,
      climateType: datacard.climateType,
      vegetationType: datacard.vegetationType,
      vegetationTypeId: datacard.vegetationTypeId,
      deviceId: datacard.deviceId,
      modelId: datacard.modelId
    })
    console.log(newDatacard)

    let datacardCode = datacard.code + '-' + newDatacard.id

    const createdDatacard = await Datacard.query()
      .findById(newDatacard.id)
      .patch({
        code: datacardCode
      })

    for (let i = 0; i < datacard.curators.length; i++) {
      await Datacard_has_curators.query().insert({
        datacardId: newDatacard.id,
        curatorId: datacard.curators[i].id
      })
    }

    return createdDatacard
  }
}

export default DatacardDaoImp
