'use strict';
import moment from "moment";
import Project from './project';
import Catalogue from './catalogue';
import Model from './model';
import Collector from './collector';
import ClimateType from './climateType';
import VegetationType from './vegetationType';
import Sex from './sex';
import LifeStage from './lifeStage';
import Curator from './curator';

class Datacard {
  constructor() {
    this.id = null;
    this.code = null;
    this.validated = false;
    this.collectDate = new Date();
    this.collectDateValid = {};
    this.collectDateValid.isValid = true;
    this.collectDateValid.message = null;
    this.formattedDate = null;
    this.formattedHour = null;
    this.projectId = null;
    this.catalogueId = null;
    this.base64 = null;
    this.sex = new Sex();
    this.lifeStage = new LifeStage();
    this.sexId = null;
    this.lifeStageId = null;
    this.climateTypeId = null;
    this.vegetationTypeId = null;
    this.modelId = null;
    this.collectorId = null;
    this.curators = [];
    this.collectorCode = null;
    this.creationDate = null;
    this.project = new Project();
    this.catalogue = new Catalogue();
    this.model = new Model();
    this.collector = new Collector();
    this.curators = [];
    this.climateType = new ClimateType();
    this.vegetationType = new VegetationType();
    this.thumbnail = null
    this.datacardPath = null
    this.photocollectPath = null
    this.latitude = 20.102365
    this.latitudeValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.longitude = -101.433236
    this.longitudeValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.altitude = null
    this.altitudeValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.country = null
    this.countryValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.countryState = null
    this.countryStateValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.municipality = null
    this.municipalityValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.locality = null
    this.localityValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.scientificName = null
    this.scientificNameValid = {}
    this.scientificNameValid.isValid = false
    this.scientificNameValid.message = 'Campo requerido'
    this.commonName = null
    this.commonNameValid = {}
    this.commonNameValid.isValid = true
    this.commonNameValid.message = null
    this.genus = null
    this.genusValid = {}
    this.genusValid.isValid = true
    this.genusValid.message = null
    this.order = null
    this.orderValid = {}
    this.orderValid.isValid = true
    this.orderValid.message = null
    this.family = null
    this.familyValid = {}
    this.familyValid.isValid = true
    this.familyValid.message = null
    this.speciesClass = null
    this.speciesClassValid = {}
    this.speciesClassValid.isValid = true
    this.speciesClassValid.message = null
    this.phylum = null
    this.phylumValid = {}
    this.phylumValid.isValid = true
    this.phylumValid.message = null
    this.kingdom = null
    this.kingdomValid = {}
    this.kingdomValid.isValid = true
    this.kingdomValid.message = null
    this.sex = new Sex()
    this.lifeStage = new LifeStage()
    this.observations = null
  }
  setDatacard(datacard) {
    this.id = datacard.id;
    this.code = datacard.code;
    this.collectorCode = datacard.collectorCode;
    this.datacardPath = datacard.datacardPath;
    this.photocollectPath = datacard.datacardPath + "/original.png";
    this.validated = datacard.validated;
    this.collectDate = new Date(datacard.collectDate);
    this.creationDate = new Date(datacard.creationDate);
    this.projectId = datacard.projectId;
    this.catalogueId = datacard.catalogueId;
    this.collectorId = datacard.collectorId;
    this.modelId = datacard.modelId;
    this.longitude = datacard.longitude;
    this.latitude = datacard.latitude;
    this.altitude = datacard.altitude;
    this.country = datacard.country;
    this.countryState = datacard.countryState;
    this.municipality = datacard.municipality;
    this.locality = datacard.locality;
    this.sexId = datacard.sexId;
    this.lifeStageId = datacard.lifeStageId;
    this.scientificName = datacard.scientificName;
    this.family = datacard.family;
    this.genus = datacard.genus;
    this.speciesClass = datacard.speciesClass;
    this.order = datacard.order;
    this.kingdom = datacard.kingdom;
    this.commonName = datacard.commonName;
    this.phylum = datacard.phylum;
    this.observations = datacard.observations;
    this.vegetationTypeId = datacard.vegetationTypeId;
    this.climateTypeId = datacard.climateTypeId;
    this.thumbnail = datacard.thumbnail
    this.project = this.project.setProject(datacard.project)
    this.model = this.model.setModel(datacard.model)
    this.collector = this.collector.setCollector(datacard.collector)
    let newProject = new Project()
    newProject.setProject(datacard.project);
    this.project = newProject

    let newModel = new Model()
    newModel.setModel(datacard.model);
    this.model = newModel

    let newCollector = new Collector()
    newCollector.setCollector(datacard.collector);
    this.collector = newCollector

    let newCatalogue = new Catalogue()
    newCatalogue.setCatalogue(datacard.catalogue);
    this.catalogue = newCatalogue

    for (let i = 0; i < datacard.curators.length; i++) {
      let curator = new Curator();
      curator.setCurator(datacard.curators[i])
      this.curators.push(curator)
    }
    if (datacard.vegetationTypeId != null) {
      let newVegetationType = new VegetationType()
      newVegetationType.setVegetationType(datacard.vegetationType);
      this.vegetationType = newVegetationType
    } else {
      let newVegetationType = new VegetationType()
      newVegetationType.setName(datacard.vegetationType);
      this.vegetationType = newVegetationType
    }
    if (datacard.climateTypeId != null) {
      let newClimatetype = new ClimateType()
      newClimatetype.setClimateType(datacard.climateType);
      this.climateType = newClimatetype
    } else {
      let newClimatetype = new ClimateType()
      newClimatetype.setCode(datacard.climateType);
      this.climateType = newClimatetype
    }
    if (datacard.lifeStageId != null) {
      let newLifeStage = new LifeStage()
      newLifeStage.setLifeStage(datacard.lifeStage);
      this.lifeStage = newLifeStage
    } else {
      let newLifeStage = new LifeStage()
      newLifeStage.setName(datacard.lifeStage);
      this.lifeStage = newLifeStage
    }
    if (datacard.sexId != null) {
      let newSex = new Sex()
      newSex.setSex(datacard.sex);
      this.sex = newSex
    } else {
      let newSex = new Sex()
      newSex.setName(datacard.sex);
      this.sex = newSex
    }
    // debugger;
  }
  setDatacardPath(datacardPath) {
    this.datacardPath = datacardPath
  }
  setPhotocollectPath(photocollectPath) {
    this.photocollectPath = photocollectPath
  }
  setCatalogue(catalogue) {
    this.catalogue = catalogue;
  }
  setModel(model) {
    this.model = model;
  }
  setProject(project) {
    this.project = project;
  }
  setCollector(collector) {
    this.collector = collector;
  }
  setCurators(curators) {
    this.curators = curators;
  }
  setCreationDate() {
    this.creationDate = new Date();
  }
  setCurators(curators) {
    this.curators = curators;
  }
  setCollectorCode(collectorCode) {
    this.collectorCode = collectorCode;
  }
  setCollectorId(collectorId) {
    this.collectorId = collectorId;
  }
  setModelId(modelId) {
    this.modelId = modelId;
  }
  setObservations(observations) {
    this.observations = observations;
  }
  setCollectDate(collectDate) {
    this.collectDate = collectDate;
  }
  setProjectId(projectId) {
    this.projectId = projectId;
  }
  setCatalogueId(catalogueId) {
    this.catalogueId = catalogueId;
  }
  setBase64(base64) {
    this.base64 = base64;
  }
  setLatitude(latitude) {
    this.latitude = latitude;
  }
  setLongitude(longitude) {
    this.longitude = longitude;
  }
  setAltitude(altitude) {
    this.altitude = altitude;
  }
  setCountry(country) {
    this.country = country;
  }
  setCountryState(countryState) {
    this.countryState = countryState;
  }
  setMunicipality(municipality) {
    this.municipality = municipality;
  }
  setLocality(locality) {
    this.locality = locality;
  }
  setSex(sex) {
    this.sex = sex;
  }
  setLifeStage(lifeStage) {
    this.lifeStage = lifeStage;
  }
  setSexId(sexId) {
    this.sexId = sexId;
  }
  setLifeStageId(lifeStageId) {
    this.lifeStageId = lifeStageId;
  }
  setClimateType(climateType) {
    this.climateType = climateType;
  }
  setClimateTypeId(climateTypeId) {
    this.climateTypeId = climateTypeId;
  }
  setVegetationType(vegetationType) {
    this.vegetationType = vegetationType;
  }
  setVegetationTypeId(vegetationTypeId) {
    this.vegetationTypeId = vegetationTypeId;
  }
  setScientificName(scientificName) {
    this.scientificName = scientificName
  }
  setObservations(observations) {
    this.observations = observations
  }
  setScientificNameValid(valid) {
    this.scientificNameValid.isValid = valid.isValid
    this.scientificNameValid.message = valid.message
  }
  setCommonName(commonName) {
    this.commonName = commonName
  }
  setCommonNameValid(valid) {
    this.commonNameValid.isValid = valid.isValid
    this.commonNameValid.message = valid.message
  }
  setGenus(genus) {
    this.genus = genus
  }
  setGenusValid(valid) {
    this.genusValid.isValid = valid.isValid
    this.genusValid.message = valid.message
  }
  setFamily(family) {
    this.family = family
  }
  setFamilyValid(valid) {
    this.familyValid.isValid = valid.isValid
    this.familyValid.message = valid.message
  }
  setOrder(order) {
    this.order = order
  }
  setOrderValid(valid) {
    this.orderValid.isValid = valid.isValid
    this.orderValid.message = valid.message
  }
  setPhylum(phylum) {
    this.phylum = phylum
  }
  setPhylumValid(valid) {
    this.phylumValid.isValid = valid.isValid
    this.phylumValid.message = valid.message
  }
  setSpeciesClass(speciesClass) {
    this.speciesClass = speciesClass
  }
  setSpeciesClassValid(valid) {
    this.speciesClassValid.isValid = valid.isValid
    this.speciesClassValid.message = valid.message
  }
  setKingdom(kingdom) {
    this.kingdom = kingdom
  }
  setKingdomValid(valid) {
    this.kingdomValid.isValid = valid.isValid
    this.kingdomValid.message = valid.message
  }
  setCollectDateValid(valid) {
    this.collectDateValid.isValid = valid.isValid;
    this.collectDateValid.message = valid.message;
  }
  setFormattedDate(formattedDate) {
    this.formattedDate = formattedDate;
  }
  setFormattedHour(formattedHour) {
    this.formattedHour = formattedHour;
  }
  setCountryValid(valid) {
    this.countryValid.isValid = valid.isValid
    this.countryValid.message = valid.message
  }
  setCountryStateValid(valid) {
    this.countryStateValid.isValid = valid.isValid
    this.countryStateValid.message = valid.message
  }
  setMunicipalityValid(valid) {
    this.municipalityValid.isValid = valid.isValid
    this.municipalityValid.message = valid.message
  }
  setLocalityValid(valid) {
    this.localityValid.isValid = valid.isValid
    this.localityValid.message = valid.message
  }
  setLatitudeValid(valid) {
    this.latitudeValid.isValid = valid.isValid
    this.latitudeValid.message = valid.message
  }
  setLongitudeValid(valid) {
    this.longitudeValid.isValid = valid.isValid
    this.longitudeValid.message = valid.message
  }
  setAltitudeValid(valid) {
    this.altitudeValid.isValid = valid.isValid
    this.altitudeValid.message = valid.message
  }
  setCode(code) {
    this.code = code;
  }
  getObservations() {
    return this.observations;
  }
  getPhotocollectPath() {
    return this.photocollectPath
  }
  getDatacardPath() {
    return this.datacardPath;
  }
  getCollectDate() {
    return this.collectDate;
  }
  getCreationDate() {
    return this.creationDate;
  }
  getFormattedCollectDate() {
    return moment(this.collectDate).format("DD/MM/YYYY HH:mm");
  }
  getFormattedCreationDate() {
    return moment(this.creationDate).format("DD/MM/YYYY HH:mm");

  }
  getFormattedDate() {
    return this.formattedDate;
  }
  getProject() {
    return this.project;
  }
  getCurators() {
    return this.curators;
  }
  getModel() {
    return this.model
  }
  getFormattedHour() {
    return this.formattedHour;
  }
  getCollectDateValid() {
    return this.collectDateValid;
  }
  getCatalogueId() {
    return this.catalogueId;
  }
  getCollectorId() {
    return this.collectorId;
  }
  isCollectDateValid() {
    return this.collectDateValid.isValid;
  }
  isValidated() {
    return this.validated;
  }
  validate() {
    this.validated = true;
  }
  invalidate() {
    this.validated = false;
  }
  getCode() {
    return this.code
  }
  getLongitude() {
    return this.longitude;
  }
  getLatitude() {
    return this.latitude;
  }
  getAltitude() {
    return this.altitude;
  }
  getCountry() {
    return this.country;
  }
  getCountryState() {
    return this.countryState;
  }
  getMunicipality() {
    return this.municipality;
  }
  getLocality() {
    return this.locality;
  }
  getScientificName() {
    return this.scientificName;
  }
  getGenus() {
    return this.genus;
  }
  getOrder() {
    return this.order;
  }
  getSpeciesClass() {
    return this.speciesClass;
  }
  getKingdom() {
    return this.kingdom;
  }
  getPhylum() {
    return this.phylum;
  }
  getCommonName() {
    return this.commonName;
  }
  getFamily() {
    return this.family;
  }
  getCatalogue() {
    return this.catalogue;
  }
  getModel() {
    return this.model;
  }
  getVegetationType() {
    return this.vegetationType;
  }
  getClimateType() {
    return this.climateType;
  }
  getSex() {
    return this.sex;
  }
  getSexName() {
    return this.sex.getName();
  }
  getLifeStage() {
    return this.lifeStage;
  }
  getLifeStageName() {
    return this.lifeStage.getName();
  }
  getProject() {
    return this.project
  }
  getCollector() {
    return this.collector
  }
  getCollectorCode() {
    return this.collectorCode
  }
  getCountryValid() {
    return this.countryValid
  }
  getCountryStateValid() {
    return this.countryStateValid
  }
  getMunicipalityValid() {
    return this.municipalityValid
  }
  getLocalityValid() {
    return this.localityValid
  }
  getLatitudeValid() {
    return this.latitudeValid
  }
  getAltitudeValid() {
    return this.altitudeValid
  }
  getLongitudeValid() {
    return this.longitudeValid
  }
  isCountryValid() {
    return this.countryValid.isValid
  }
  isCountryStateValid() {
    return this.countryStateValid.isValid
  }
  isMunicipalityValid() {
    return this.municipalityValid.isValid
  }
  isLocalityValid() {
    return this.localityValid.isValid
  }
  isAltitudeValid() {
    return this.altitudeValid.isValid
  }
  isLongitudeValid() {
    return this.longitudeValid.isValid
  }
  isLatitudeValid() {
    return this.latitudeValid.isValid
  }
  isScientificNameValid() {
    return this.scientificNameValid.isValid
  }
  isCommonNameValid() {
    return this.commonNameValid.isValid
  }
  isGenusValid() {
    return this.genusValid.isValid
  }
  isOrderValid() {
    return this.orderValid.isValid
  }
  isFamilyValid() {
    return this.familyValid.isValid
  }
  isPhylumValid() {
    return this.phylumValid.isValid
  }
  isSpeciesClassValid() {
    return this.speciesClassValid.isValid
  }
  isKingdomValid() {
    return this.kingdomValid.isValid
  }
  isSexValid() {
    let valid = this.sex.isValid()
    return valid
  }
  isLifeStageValid() {
    let valid = this.lifeStage.isValid()
    return valid
  }
  getScientificNameValid() {
    return this.scientificNameValid
  }
  getCommonNameValid() {
    return this.commonNameValid
  }
  getGenusValid() {
    return this.genusValid
  }
  getOrderValid() {
    return this.orderValid
  }
  getFamilyValid() {
    return this.familyValid
  }
  getPhylumValid() {
    return this.phylumValid
  }
  getSpeciesClassValid() {
    return this.speciesClassValid
  }
  getKingdomValid() {
    return this.kingdomValid
  }
  getSexValid() {
    let valid = this.sex.getValid()
    return valid
  }
  getLifeStageValid() {
    let valid = this.lifeStage.getValid()
    return valid
  }
}

export default Datacard;