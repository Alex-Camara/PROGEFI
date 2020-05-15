"use strict";

const Collect = require("../models/Collect");
const VegetationType = require("../models/VegetationType");
const Species = require("../models/Species");
const Specimen = require("../models/Specimen");
const ClimateType = require("../models/ClimateType");
const Datacard = require("../models/Datacard");
const Datacard_has_curators = require("../models/Datacard_has_curators");

class DatacardDaoImp {
  async getDatacardsInCatalogue(catalogueId, searchString) {
    const datacards = await Datacard.query()
      .withGraphFetched(
        "[collect.[collector, project, model.device, climateType, vegetationType.vegetalFormation, specimen.[species, sex, lifeStage]], catalogue.collection, curators, template.[tags]]"
      )
      .where("catalogueId", catalogueId)
      .where("code", "like", "%" + searchString + "%")
      .catch(error => {
        return error;
      });

    return datacards;
  }
  async getByCode(catalogueId, code) {
    let datacards = [];
    if (catalogueId !== null) {
      datacards = await Datacard.query()
        .withGraphFetched(
          "[collect.[collector, project, model.device, climateType, vegetationType.vegetalFormation, specimen.[species, sex, lifeStage]], catalogue.collection, curators, template.[tags]]"
        )
        .where("catalogueId", catalogueId)
        .where("code", "like", "%" + code + "%")
        .catch(error => {
          return error;
        });
    } else {
      datacards = await Datacard.query()
        .withGraphFetched(
          "[collect.[collector, project, model.device, climateType, vegetationType.vegetalFormation, specimen.[species, sex, lifeStage]], catalogue.collection, curators, template.[tags]]"
        )
        .where("code", "like", "%" + code + "%")
        .catch(error => {
          return error;
        });
    }

    return datacards;
  }
  async deleteDatacard(datacardId) {
    let datacard = await Datacard.query().findById(datacardId);
    let collect = await Collect.query().findById(datacard.collectId);
    await Specimen.query().deleteById(collect.specimenId);
    await Collect.query().deleteById(collect.id);
    let directoryToDelete = await Datacard.query()
      .select("datacardPath")
      .findById(datacardId);
    const deletedDatacard = await datacard.$query().delete();
    console.log("directorio a borrar:");
    console.info(directoryToDelete);
    return directoryToDelete;
  }
  static async getNotValidatedByTemplateId(templateId) {
    let query = Datacard.query()
      .where("templateId", templateId)
      .where("validated", false);

    let count = await Promise.resolve(query.resultSize());

    return count;
  }
  async getAllDatacards() {
    // console.log("recuperando fichas...");
    const datacards = await Datacard.query()
      .withGraphFetched(
        "[collect.[collector, project, model.device, climateType, vegetationType.vegetalFormation, specimen.[species, sex, lifeStage]], catalogue.collection, curators, template.[tags]]"
      )
      .catch(error => {
        console.info(error);
        return error;
      });
    return datacards;
  }
  async getSortedDatacards(catalogueId, field, order, limit, offset) {
    let orderByQuery = "";
    switch (field) {
      case "scientificName": {
        orderByQuery = "collect:specimen:species.scientificName";
        break;
      }
      case "project": {
        orderByQuery = "collect:project.name";
        break;
      }
      case "collector": {
        orderByQuery = "collect:collector.name";
        break;
      }
      case "validated": {
        orderByQuery = "validated";
        break;
      }
      case "creationDate": {
        orderByQuery = "creationDate";
        break;
      }
      case "code": {
        orderByQuery = "code";
        break;
      }
    }

    let datacards;
    if (catalogueId !== null) {
      datacards = await Datacard.query()
        .joinRelated("[collect.[specimen.species, collector, project]]")
        .withGraphFetched(
          "[collect.[collector, project, model.device, climateType, vegetationType.vegetalFormation, specimen.[species, sex, lifeStage]], catalogue.collection, curators, template.[tags]]"
        )
        .where("catalogueId", catalogueId)
        .orderBy(orderByQuery, order)
        .limit(limit)
        .offset(offset)
        .catch(error => {
          console.info(error);
          return error;
        });
    } else {
      datacards = await Datacard.query()
        .joinRelated("[collect.[specimen.species, collector, project]]")
        .withGraphFetched(
          "[collect.[collector, project, model.device, climateType, vegetationType.vegetalFormation, specimen.[species, sex, lifeStage]], catalogue.collection, curators, template.[tags]]"
        )
        .orderBy(orderByQuery, order)
        .limit(limit)
        .offset(offset)
        .catch(error => {
          console.info(error);
          return error;
        });
    }

    return datacards;
  }
  async getFiltered(searchCriteria) {
    let datacards = await Datacard.query()
      .withGraphFetched(
        "[collect.[collector, project, model.device, climateType, vegetationType.vegetalFormation, specimen.[species, sex, lifeStage]], catalogue.collection, curators, template.[tags]]"
      );
    let filterValue = null;
    let datacardFilter = searchCriteria.datacard;
    let creationDates = searchCriteria.creationDates;
    let collectDates = searchCriteria.collectDates;
    filterValue = datacardFilter.catalogue.id;
    if (filterValue !== null) {
      console.log("entró a catalogo");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].catalogue.id;
        if (actualValue !== filterValue) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.collect.project.id;
    if (filterValue !== null) {
      console.log("entró a proyecto");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].collect.project.id;
        if (actualValue !== filterValue) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.collect.collector.id;
    if (filterValue !== null) {
      console.log("entró a colector");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].collect.collector.id;
        if (actualValue !== filterValue) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.curators[0];
    if (filterValue !== null && filterValue !== undefined) {
      console.log("entró a curador");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let curator = datacards[i].curators.filter(
          curator => curator.id === filterValue.id
        );
        if (curator.length === 0) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }
    filterValue = null;

    filterValue = datacardFilter.collect.country;
    if (filterValue !== null) {
      console.log("entró a pais");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].collect.country;
        if (actualValue !== filterValue) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.collect.countryState;
    if (filterValue !== null) {
      console.log("entró a estado");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].collect.countryState;
        if (actualValue !== filterValue) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.collect.municipality;
    if (filterValue !== null) {
      console.log("entró a mucnicpio");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].collect.municipality;
        if (actualValue !== filterValue) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.collect.locality;
    if (filterValue !== null) {
      console.log("entró a licalidad");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].collect.locality;
        if (actualValue !== filterValue) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.collect.climateType.code;
    if (filterValue !== null && filterValue !== "") {
      console.log("entró a clima");
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue1 = datacards[i].collect.climateType.code;
        let actualValue2 = datacards[i].collect.customClimateTypeCode;
        if (!(actualValue1 === filterValue || actualValue2 === filterValue)) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.collect.vegetationType.name;
    if (filterValue !== null && filterValue !== "") {
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue1 = datacards[i].collect.vegetationType.name;
        let actualValue2 = datacards[i].collect.customVegetationTypeName;
        if (!(actualValue1 === filterValue || actualValue2 === filterValue)) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    filterValue = datacardFilter.collect.specimen.species.scientificName;
    if (filterValue !== null && filterValue !== "") {
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].collect.specimen.species.scientificName;
        if (actualValue !== filterValue) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    if (creationDates !== null && creationDates !== undefined) {
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].creationDate;
        let creationDate = new Date(actualValue);
        let initialDate = new Date(creationDates[0]);

        let endingDate = new Date(creationDates[1]);
        endingDate.setDate(endingDate.getDate() + 1)

        let inRange = creationDate >= initialDate && creationDate < endingDate;
        if (!inRange) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }

    if (collectDates !== null && collectDates !== undefined) {
      let idsToDelete = [];
      for (let i = 0; i < datacards.length; i++) {
        let actualValue = datacards[i].creationDate;
        let creationDate = new Date(actualValue);
        let initialDate = new Date(creationDates[0]);

        let endingDate = new Date(creationDates[1]);
        endingDate.setDate(endingDate.getDate() + 1)

        let inRange = creationDate >= initialDate && creationDate < endingDate;
        if (!inRange) {
          idsToDelete.push(datacards[i].id);
        }
      }
      datacards = datacards.filter(item => !idsToDelete.includes(item.id));
    }
    return datacards;
  }
  async createDatacard(datacard) {
    let species = await datacard.collect.specimen.species;
    let scientificName = species.scientificName.toString().toLowerCase();
    species.scientificName = scientificName;

    let newSpecies;
    let foundSpecies = await Species.query()
      .where("scientificName", scientificName)
      .catch(error => {
        console.info(error);
        return error;
      });

    if (foundSpecies.length > 0) {
      newSpecies = foundSpecies[0];
      if (newSpecies.kingdom === "" && species.kingdom !== "") {
        newSpecies = await newSpecies
          .$query()
          .updateAndFetch({
            genus: species.genus,
            order: species.order,
            family: species.family,
            phylum: species.phylum,
            kingdom: species.kingdom,
            speciesClass: species.speciesClass
          })
          .catch(error => {
            console.info(error);
            return error;
          });
      }
    } else {
      newSpecies = await Species.query()
        .insert({
          scientificName: species.scientificName,
          genus: species.genus,
          order: species.order,
          family: species.family,
          speciesClass: species.speciesClass,
          phylum: species.phylum,
          kingdom: species.kingdom
        })
        .catch(error => {
          console.info(error);
          return error;
        });
    }

    let specimen = datacard.collect.specimen;

    let customSexName = null;
    let sexId = null;
    if (specimen.sex.id != null) {
      sexId = specimen.sex.id;
    } else {
      customSexName = specimen.sex.name;
    }

    let customLifeStageName = null;
    let lifeStageId = null;
    if (specimen.lifeStage.id != null) {
      lifeStageId = specimen.lifeStage.id;
    } else {
      customLifeStageName = specimen.lifeStage.name;
    }
    let newSpecimen = await Specimen.query()
      .insert({
        observations: specimen.observations,
        customSexName: customSexName,
        customLifeStageName: customLifeStageName,
        sexId: sexId,
        lifeStageId: lifeStageId,
        speciesId: newSpecies.id
      })
      .catch(error => {
        console.info(error);
        return error;
      });

    let collect = datacard.collect;

    let customVegetationTypeName = null;
    let vegetationTypeId = null;
    if (collect.vegetationType.id != null) {
      vegetationTypeId = collect.vegetationType.id;
    } else {
      customVegetationTypeName = collect.vegetationType.name;
    }

    let customClimateTypeCode = null;
    let climateTypeId = null;
    if (collect.climateType.id != null) {
      climateTypeId = collect.climateType.id;
    } else {
      customClimateTypeCode = collect.climateType.code;
    }

    const newCollect = await Collect.query()
      .insert({
        collectDate: collect.collectDate,
        longitude: collect.longitude,
        latitude: collect.latitude,
        altitude: collect.altitude,
        country: collect.country,
        countryState: collect.countryState,
        municipality: collect.municipality,
        locality: collect.locality,
        customClimateTypeCode: customClimateTypeCode,
        customVegetationTypeName: customVegetationTypeName,
        climateTypeId: climateTypeId,
        vegetationTypeId: vegetationTypeId,
        projectId: collect.project.id,
        modelId: collect.model.id,
        collectorId: collect.collector.id,
        specimenId: newSpecimen.id
      })
      .catch(error => {
        console.info(error);
        return error;
      });

    const newDatacard = await Datacard.query()
      .insert({
        code: datacard.code,
        validated: datacard.validated,
        datacardPath: datacard.datacardPath,
        creationDate: datacard.creationDate,
        collectorCode: datacard.collectorCode,
        catalogueId: datacard.catalogue.id,
        templateId: datacard.template.id,
        collectId: newCollect.id
      })
      .catch(error => {
        console.info(error);
        return error;
      });

    for (let i = 0; i < datacard.curators.length; i++) {
      await Datacard_has_curators.query()
        .insert({
          datacardId: newDatacard.id,
          curatorId: datacard.curators[i].id
        })
        .catch(error => {
          console.info(error);
          return error;
        });
    }

    return newDatacard;
  }
  async updateDatacard(datacard) {
    let speciesToUpdate = await datacard.collect.specimen.species;
    let scientificName = speciesToUpdate.scientificName
      .toString()
      .toLowerCase();
    speciesToUpdate.scientificName = scientificName;

    let updatedSpecies;
    let foundSpecies = await Species.query()
      .where("scientificName", scientificName)
      .catch(error => {
        console.info(error);
        return error;
      });

    if (foundSpecies.length > 0) {
      updatedSpecies = foundSpecies[0];
      if (updatedSpecies.kingdom === "" && speciesToUpdate.kingdom !== "") {
        updatedSpecies = await updatedSpecies
          .$query()
          .updateAndFetch({
            genus: speciesToUpdate.genus,
            order: speciesToUpdate.order,
            family: speciesToUpdate.family,
            phylum: speciesToUpdate.phylum,
            kingdom: speciesToUpdate.kingdom,
            speciesClass: speciesToUpdate.speciesClass
          })
          .catch(error => {
            console.info(error);
            return error;
          });
      }
    } else {
      updatedSpecies = await Species.query()
        .insert({
          scientificName: speciesToUpdate.scientificName,
          genus: speciesToUpdate.genus,
          order: speciesToUpdate.order,
          family: speciesToUpdate.family,
          speciesClass: speciesToUpdate.speciesClass,
          phylum: speciesToUpdate.phylum,
          kingdom: speciesToUpdate.kingdom
        })
        .catch(error => {
          console.info(error);
          return error;
        });
    }

    let specimenToUpdate = datacard.collect.specimen;

    let customSexName = null;
    let sexId = null;
    if (specimenToUpdate.sex.id != null) {
      sexId = specimenToUpdate.sex.id;
    } else {
      customSexName = specimenToUpdate.sex.name;
    }

    let customLifeStageName = null;
    let lifeStageId = null;
    if (specimenToUpdate.lifeStage.id != null) {
      lifeStageId = specimenToUpdate.lifeStage.id;
    } else {
      customLifeStageName = specimenToUpdate.lifeStage.name;
    }

    let oldSpecimen = await Specimen.query()
      .findById(specimenToUpdate.id)
      .catch(error => {
        console.info(error);
        return error;
      });
    // console.info(oldSpecimen)
    let updatedSpecimen = await oldSpecimen
      .$query()
      .updateAndFetch({
        observations: specimenToUpdate.observations,
        customSexName: customSexName,
        customLifeStageName: customLifeStageName,
        sexId: sexId,
        lifeStageId: lifeStageId,
        speciesId: updatedSpecies.id
      })
      .catch(error => {
        console.info(error);
        return error;
      });

    let oldCollect = await Collect.query()
      .eager("[vegetationType, climateType]")
      .findById(datacard.collect.id)
      .catch(error => {
        console.info(error);
        return error;
      });
    let collectToUpdate = datacard.collect;

    let customVegetationTypeName = null;
    let vegetationTypeId = null;
    if (collectToUpdate.vegetationType.id != null) {
      vegetationTypeId = collectToUpdate.vegetationType.id;
    } else {
      customVegetationTypeName = collectToUpdate.vegetationType.name;
    }

    let customClimateTypeCode;
    let climateTypeId;
    if (collectToUpdate.climateType.id != null) {
      climateTypeId = collectToUpdate.climateType.id;
    } else {
      customClimateTypeCode = collectToUpdate.climateType.name;
    }

    let updatedCollect = await oldCollect
      .$query()
      .updateAndFetch({
        collectDate: collectToUpdate.collectDate,
        longitude: collectToUpdate.longitude,
        latitude: collectToUpdate.latitude,
        altitude: collectToUpdate.altitude,
        country: collectToUpdate.country,
        countryState: collectToUpdate.countryState,
        municipality: collectToUpdate.municipality,
        locality: collectToUpdate.locality,
        customClimateTypeCode: customClimateTypeCode,
        customVegetationTypeName: customVegetationTypeName,
        climateTypeId: climateTypeId,
        vegetationTypeId: vegetationTypeId,
        projectId: collectToUpdate.project.id,
        modelId: collectToUpdate.model.id,
        collectorId: collectToUpdate.collector.id,
        specimenId: specimenToUpdate.id
      })
      .catch(error => {
        console.info(error);
        return error;
      });

    let oldDatacard = await Datacard.query()
      .findById(datacard.id)
      .catch(error => {
        console.info(error);
        return error;
      });

    const updatedDatacard = await oldDatacard
      .$query()
      .updateAndFetch({
        validated: datacard.validated,
        datacardPath: datacard.datacardPath,
        creationDate: datacard.creationDate,
        collectorCode: datacard.collectorCode,
        catalogueId: datacard.catalogue.id,
        collectId: updatedCollect.id,
        templateId: datacard.template.id
      })
      .catch(error => {
        console.info(error);
        return error;
      });

    for (let i = 0; i < datacard.curators.length; i++) {
      await Datacard_has_curators.query()
        .insert({
          datacardId: datacard.id,
          curatorId: datacard.curators[i].id
        })
        .catch(error => {
          console.info(error);
          return error;
        });
    }

    return updatedDatacard;
  }
}

export default DatacardDaoImp;
