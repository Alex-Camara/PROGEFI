'use strict'

class Collection {
  constructor () {
    this.id = null
    this.name = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setCollection (collection) {
    this.id = collection.id
    this.name = collection.name
  }
  setValid (valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
}

export default Collection
