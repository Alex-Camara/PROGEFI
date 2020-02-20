'use strict'
import SpeciesData from './speciesData'
import Location from './location'
import Catalogue from './catalogue'

class Datacard {
  constructor () {
    this.id = null
    this.code = null
    this.validated = false
    this.collectDate = new Date()
    this.collectDateValid = {}
    this.collectDateValid.isValid = false
    this.collectDateValid.message = null
    this.formattedDate = null
    this.formattedHour = null
    this.projectId = null
    this.catalogueId = null
    this.base64 = null
    this.longitude = null
    this.latitude = null
    this.altitude = null
    this.country = null
    this.countryState = null
    this.municipality = null
    this.locality = null
    this.sex = null
    this.lifeStage = null
    this.sexId = null
    this.lifeStageId = null
    this.climateTypeId = null
    this.climateType = null
    this.vegetationTypeId = null
    this.vegetationType = null
    this.scientificName = null
    this.commonName = null
    this.genus = null
    this.family = null
    this.speciesClass = null
    this.order = null
    this.kingdom = null
    this.phylum = null
    this.observations = null
    this.modelId = null
    this.collectorId = null
    this.curators = []
    this.collectorCode = null
    this.creationDate = null
  }
  setCreationDate () {
    this.creationDate = new Date()
  }
  setCurators (curators) {
    this.curators = curators
  }
  setCollectorCode (collectorCode) {
    this.collectorCode = collectorCode
  }
  setCollectorId (collectorId) {
    this.collectorId = collectorId
  }
  setModelId (modelId) {
    this.modelId = modelId
  }
  setObservations (observations) {
    this.observations = observations
  }
  setCollectDate (collectDate) {
    this.collectDate = collectDate
  }
  setProjectId (projectId) {
    this.projectId = projectId
  }
  setCatalogueId (catalogueId) {
    this.catalogueId = catalogueId
  }
  setBase64 (base64) {
    this.base64 = base64
  }
  setLatitude (latitude) {
    this.latitude = latitude
  }
  setLongitude (longitude) {
    this.longitude = longitude
  }
  setAltitude (altitude) {
    this.altitude = altitude
  }
  setCountry (country) {
    this.country = country
  }
  setCountryState (countryState) {
    this.countryState = countryState
  }
  setMunicipality (municipality) {
    this.municipality = municipality
  }
  setLocality (locality) {
    this.locality = locality
  }
  setSex (sex) {
    this.sex = sex
  }
  setLifeStage (lifeStage) {
    this.lifeStage = lifeStage
  }
  setSexId (sexId) {
    this.sexId = sexId
  }
  setLifeStageId (lifeStageId) {
    this.lifeStageId = lifeStageId
  }
  setClimateType (climateType) {
    this.climateType = climateType
  }
  setClimateTypeId (climateTypeId) {
    this.climateTypeId = climateTypeId
  }
  setVegetationType (vegetationType) {
    this.vegetationType = vegetationType
  }
  setVegetationTypeId (vegetationTypeId) {
    this.vegetationTypeId = vegetationTypeId
  }
  setScientificName (scientificName) {
    this.scientificName = scientificName
  }
  setCommonName (commonName) {
    this.commonName = commonName
  }
  setOrder (order) {
    this.order = order
  }
  setSpeciesClass (speciesClass) {
    this.speciesClass = speciesClass
  }
  setKingdom (kingdom) {
    this.kingdom = kingdom
  }
  setGenus (genus) {
    this.genus = genus
  }
  setPhylum (phylum) {
    this.phylum = phylum
  }
  setFamily (family) {
    this.family = family
  }
  setCollectDateValid (valid) {
    this.collectDateValid.isValid = valid.isValid
    this.collectDateValid.message = valid.message
  }
  setFormattedDate (formattedDate) {
    this.formattedDate = formattedDate
  }
  setFormattedHour (formattedHour) {
    this.formattedHour = formattedHour
  }
  setCode (code) {
    this.code = code
  }
  getObservations () {
    return this.observations
  }
  getCollectDate () {
    return this.collectDate
  }
  getFormattedDate () {
    return this.formattedDate
  }
  getFormattedHour () {
    return this.formattedHour
  }
  getCollectDateValid () {
    return this.collectDateValid
  }
  getCatalogueId () {
    return this.catalogueId
  }
  getCollectorId(){
    return this.collectorId
  }
  isCollectDateValid () {
    return this.collectDateValid.isValid
  }
  isValidated () {
    return this.validated
  }
  validate () {
    this.validated = true
  }
  invalidate () {
    this.validated = false
  }
}

export default Datacard
