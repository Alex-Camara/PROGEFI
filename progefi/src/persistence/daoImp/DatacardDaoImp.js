'use strict';

const Datacard = require('../models/Datacard');
const Datacard_has_curators = require('../models/Datacard_has_curators');

class DatacardDaoImp {
  async getDatacardsInCatalogue(catalogueId, searchString) {
    const datacards = await Datacard.query()
      .where('catalogueId', catalogueId)
      .where('code', 'like', '%' + searchString + '%')
      .limit(10);

    return datacards;
  }

  async createDatacard(datacard) {
    let sex = null;
    let sexId = null;
    if (datacard.sex.id != null) {
      sexId = datacard.sex.id;
    } else {
      sex = datacard.sex.name;
    }

    let lifeStage = null;
    let lifeStageId = null
    if (datacard.lifeStage.id != null) {
      lifeStageId = datacard.lifeStage.id;
    } else {
      lifeStage = datacard.lifeStage.name;
    }

    let vegetationType = null;
    let vegetationTypeId = null;
    if (datacard.vegetationType.id != null) {
      vegetationTypeId = datacard.vegetationType.id;
    } else {
      vegetationType = datacard.vegetationType.name;
    }

    let climateType;
    let climateTypeId;
    if (datacard.climateType.id != null) {
      climateTypeId = datacard.climateType.id;
    } else {
      climateType = datacard.climateType.name;
    }
    const newDatacard = await Datacard.query().insert({
      code: datacard.code,
      validated: datacard.validated,
      datacardPath: datacard.datacardPath,
      collectDate: datacard.collectDate,
      creationDate: datacard.creationDate,
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
      catalogueId: datacard.catalogue.id,
      projectId: datacard.project.id,
      collectorId: datacard.collector.id,
      collectorCode: datacard.collectorCode,
      modelId: datacard.model.id,
      observations: datacard.observations,
      sex: sex,
      lifeStage: lifeStage,
      climateType: climateType,
      vegetationType: vegetationType,
      sexId: sexId,
      lifeStageId: lifeStageId,
      climateTypeId: climateTypeId,
      vegetationTypeId: vegetationTypeId
    });
    console.log(newDatacard);

    for (let i = 0; i < datacard.curators.length; i++) {
      await Datacard_has_curators.query().insert({
        datacardId: newDatacard.id,
        curatorId: datacard.curators[i].id,
      });
    }

    return newDatacard;
  }
  async updateDatacard(datacard) {
    let sex = null;
    let sexId = null;
    if (datacard.sex.id != null) {
      sexId = datacard.sex.id;
    } else {
      sex = datacard.sex.name;
    }

    let lifeStage = null;
    let lifeStageId = null
    if (datacard.lifeStage.id != null) {
      lifeStageId = datacard.lifeStage.id;
    } else {
      lifeStage = datacard.lifeStage.name;
    }

    let vegetationType = null;
    let vegetationTypeId = null;
    if (datacard.vegetationType.id != null) {
      vegetationTypeId = datacard.vegetationType.id;
    } else {
      vegetationType = datacard.vegetationType.name;
    }

    let climateType;
    let climateTypeId;
    if (datacard.climateType.id != null) {
      climateTypeId = datacard.climateType.id;
    } else {
      climateType = datacard.climateType.name;
    }

    let oldDatacard = await Datacard.query()
      .findOne({ code: datacard.code })

    let updatedDatacard = await oldDatacard.$query()
      .updateAndFetch({
        validated: datacard.validated,
        collectDate: datacard.collectDate,
        creationDate: datacard.creationDate,
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
        catalogueId: datacard.catalogue.id,
        projectId: datacard.project.id,
        collectorId: datacard.collector.id,
        collectorCode: datacard.collectorCode,
        modelId: datacard.model.id,
        observations: datacard.observations,
        sex: sex,
        lifeStage: lifeStage,
        climateType: climateType,
        vegetationType: vegetationType,
        sexId: sexId,
        lifeStageId: lifeStageId,
        climateTypeId: climateTypeId,
        vegetationTypeId: vegetationTypeId
      })

    for (let i = 0; i < datacard.curators.length; i++) {
      await Datacard_has_curators.query().insert({
        datacardId: datacard.id,
        curatorId: datacard.curators[i].id,
      });
    }

    console.log('updated datacard: ')
    console.info(updatedDatacard)

    return updatedDatacard
  }
}

export default DatacardDaoImp;