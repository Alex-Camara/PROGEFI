'use strict'

class Collection {
  constructor() {
    this.id = null
    this.name = null
    this.instituteId = null
    this.instituteName = null
    this.researchArea = null
    this.imagePath = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setCollection(collection) {
    this.id = collection.id
    this.name = collection.name
    this.instituteId = collection.instituteId
    this.researchArea = collection.instituteResearchArea
    this.imagePath = collection.instituteImagePath
    this.instituteName = collection.instituteName
  }
  setId(collectionId) {
    this.id = collectionId
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
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
  getValid() {
    return this.valid
  }
  getImagePath() {
    return this.imagePath
  }
  getResearchArea() {
    return this.researchArea
  }
  getInstituteName(){
    return this.instituteName
  }
}

export default Collection
