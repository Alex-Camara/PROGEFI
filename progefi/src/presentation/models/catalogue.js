'use strict';
import Collection from './collection';

class Catalogue {
  constructor() {
    this.id = null;
    this.name = null;
    this.nameValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.code = null;
    this.codeValid = {
      isValid: false,
      message: 'Campo requerido'
    }
    this.description = null;
    this.descriptionValid = {
      isValid: true,
      message: null
    }
    this.collectionId = null;
    this.collection = new Collection();
    this.collectionValid = {
      isValid: false,
      message:  'Campo requerido'
    }
    this.datacardCount = 0;
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = 'Campo requerido';
  }
  setCatalogue(catalogue) {
    this.id = catalogue.id;
    this.name = catalogue.name;
    this.code = catalogue.code;
    this.description = catalogue.description;
    this.collectionId = catalogue.collectionId;
    this.datacardCount = catalogue.datacardCount;
    if (catalogue.hasOwnProperty('collection')) {
      let newCollection = new Collection()
      newCollection.setCollection(catalogue.collection)
      this.collection = newCollection;
    }
  }
  setId(catalogueId) {
    this.id = catalogueId;
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
  }
  setDatacardCount(datacardCount) {
    this.datacardCount = datacardCount;
  }
  setCollection(collection) {
    this.collection = collection
  }
  setName(name) {
    this.name = name
  }
  setCode(code) {
    // debugger;
    this.code = code
  }
  setDescription(description) {
    this.description = description
  }
  setNameValid(valid) {
    this.nameValid.isValid = valid.isValid
    this.nameValid.message = valid.message
  }
  setCodeValid(valid) {
    this.codeValid.isValid = valid.isValid
    this.codeValid.message = valid.message
  }
  setDescriptionValid(valid) {
    this.descriptionValid.isValid = valid.isValid
    this.descriptionValid.message = valid.message
  }
  setCollectionValid(valid) {
    this.collectionValid.isValid = valid.isValid
    this.collectionValid.message = valid.message
  }
  isValid() {
    return this.valid.isValid;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getDescription() {
    return this.description
  }
  getCode() {
    return this.code;
  }
  getDatacardCount() {
    return this.datacardCount;
  }
  getValid() {
    return this.valid;
  }
  getCollection() {
    return this.collection
  }
  getNameValid() {
    return this.nameValid
  }
  isNameValid() {
    return this.nameValid.isValid
  }
  getCodeValid() {
    return this.codeValid
  }
  isCodeValid() {
    return this.codeValid.isValid
  }
  getDescriptionValid() {
    return this.descriptionValid
  }
  isDescriptionValid() {
    return this.descriptionValid.isValid
  }
  getCollectionValid() {
    return this.collectionValid
  }
  isCollectionValid() {
    return this.collectionValid.isValid
  }
}

export default Catalogue;
