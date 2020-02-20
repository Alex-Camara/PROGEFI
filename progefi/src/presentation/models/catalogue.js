'use strict'

class Catalogue {
  constructor() {
    this.id = null
    this.name = null
    this.code = null
    this.collectionId = null
    this.datacardCount = 0
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setCatalogue(catalogue) {
    this.id = catalogue.id
    this.name = catalogue.name
    this.code = catalogue.code
    this.collectionId = catalogue.collectionId
    this.datacardCount = catalogue.datacardCount
  }
  setId(catalogueId) {
    this.id = catalogueId
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
  setDatacardCount(datacardCount) {
    this.datacardCount = datacardCount
  }
  isValid() {
    return this.valid.isValid
  }
  getId() {
    return this.id
  }
  getName() {
    return this.name
  }
  getCode() {
    return this.code
  }
  getDatacardCount() {
    return this.datacardCount
  }
  getValid() {
    return this.valid
  }
}

export default Catalogue