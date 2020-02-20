'use strict'
import Sex from './sex'
import LifeStage from './lifeStage'

class SpeciesData {
  constructor () {
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
  getObservations () {
    return this.observations
  }
  getScientificName () {
    return this.scientificName
  }
  getCommonName () {
    return this.commonName
  }
  getPhylum () {
    return this.phylum
  }
  getKingdom () {
    return this.kingdom
  }
  getFamily () {
    return this.family
  }
  getGenus () {
    return this.genus
  }
  getOrder () {
    return this.order
  }
  getSpeciesClass () {
    return this.speciesClass
  }
  getSex () {
    return this.sex
  }
  getSexName () {
    return this.sex.getName()
  }
  getSexId () {
    return this.sex.getId()
  }
  getLifeStage () {
    return this.lifeStage
  }
  getLifeStageName () {
    return this.lifeStage.getName()
  }
  getLifeStageId () {
    return this.lifeStage.getId()
  }
  setScientificName (scientificName) {
    this.scientificName = scientificName
  }
  setObservations (observations) {
    this.observations = observations
  }
  setScientificNameValid (valid) {
    this.scientificNameValid.isValid = valid.isValid
    this.scientificNameValid.message = valid.message
  }
  setCommonName (commonName) {
    this.commonName = commonName
  }
  setCommonNameValid (valid) {
    this.commonNameValid.isValid = valid.isValid
    this.commonNameValid.message = valid.message
  }
  setGenus (genus) {
    this.genus = genus
  }
  setGenusValid (valid) {
    this.genusValid.isValid = valid.isValid
    this.genusValid.message = valid.message
  }
  setFamily (family) {
    this.family = family
  }
  setFamilyValid (valid) {
    this.familyValid.isValid = valid.isValid
    this.familyValid.message = valid.message
  }
  setOrder (order) {
    this.order = order
  }
  setOrderValid (valid) {
    this.orderValid.isValid = valid.isValid
    this.orderValid.message = valid.message
  }
  setPhylum (phylum) {
    this.phylum = phylum
  }
  setPhylumValid (valid) {
    this.phylumValid.isValid = valid.isValid
    this.phylumValid.message = valid.message
  }
  setSpeciesClass (speciesClass) {
    this.speciesClass = speciesClass
  }
  setSpeciesClassValid (valid) {
    this.speciesClassValid.isValid = valid.isValid
    this.speciesClassValid.message = valid.message
  }
  setKingdom (kingdom) {
    this.kingdom = kingdom
  }
  setKingdomValid (valid) {
    this.kingdomValid.isValid = valid.isValid
    this.kingdomValid.message = valid.message
  }
  setSex (sex) {
    this.sex = sex
  }
  setLifeStage (lifeStage) {
    this.lifeStage = lifeStage
  }
  isScientificNameValid () {
    return this.scientificNameValid.isValid
  }
  isCommonNameValid () {
    return this.commonNameValid.isValid
  }
  isGenusValid () {
    return this.genusValid.isValid
  }
  isOrderValid () {
    return this.orderValid.isValid
  }
  isFamilyValid () {
    return this.familyValid.isValid
  }
  isPhylumValid () {
    return this.phylumValid.isValid
  }
  isSpeciesClassValid () {
    return this.speciesClassValid.isValid
  }
  isKingdomValid () {
    return this.kingdomValid.isValid
  }
  isSexValid () {
    let valid = this.sex.isValid()
    return valid
  }
  isLifeStageValid () {
    let valid = this.lifeStage.isValid()
    return valid
  }
  getScientificNameValid () {
    return this.scientificNameValid
  }
  getCommonNameValid () {
    return this.commonNameValid
  }
  getGenusValid () {
    return this.genusValid
  }
  getOrderValid () {
    return this.orderValid
  }
  getFamilyValid () {
    return this.familyValid
  }
  getPhylumValid () {
    return this.phylumValid
  }
  getSpeciesClassValid () {
    return this.speciesClassValid
  }
  getKingdomValid () {
    return this.kingdomValid
  }
  getSexValid () {
    let valid = this.sex.getValid()
    return valid
  }
  getLifeStageValid () {
    let valid = this.lifeStage.getValid()
    return valid
  }
}

export default SpeciesData
