'use strict'

class Catalogue {
  constructor () {
    this.id = null
    this.name = null
    this.code = null
    this.collectionId = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setCatalogue (catalogue) {
    this.id = catalogue.id
    this.name = catalogue.name
    this.code = catalogue.code
    this.collectionId = catalogue.collectionId
  }
  setValid (valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
}

export default Catalogue
