"use strict";
const { ipcRenderer } = require("electron");

import Catalogue from "./catalogue";

class Collection {
  constructor() {
    this.id = null;
    this.name = null;
    this.code= null;
    this.description = null;
    this.instituteName = null;
    this.acronym = null;
    this.researchArea = null;
    this.instituteLogoPath = null;
    this.cataloguesFolderPath = this.catalogues = [];
    this.cataloguesNumber = null,
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  setCollection(collection) {
    // debugger;
    this.id = collection.id;
    this.code = collection.code;
    this.name = collection.name;
    this.description = collection.description;
    this.instituteName = collection.instituteName;
    this.acronym = collection.acronym;
    this.instituteLogoPath = collection.instituteLogoPath;
    this.cataloguesFolderPath = collection.cataloguesFolderPath;
    this.researchArea = collection.researchArea;
    this.cataloguesNumber = collection.cataloguesNumber;
    if (collection.hasOwnProperty("catalogues")) {
      for (let i = 0; i < collection.catalogues.length; i++) {
        let newCatalogue = new Catalogue();
        newCatalogue.setCatalogue(collection.catalogues[i]);
        this.catalogues.push(newCatalogue);
      }
    }
  }
  setId(collectionId) {
    this.id = collectionId;
  }
  setValid(valid) {
    this.valid.isValid = valid.isValid;
    this.valid.message = valid.message;
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
  getCode(){
    return this.code;
  }
  getValid() {
    return this.valid;
  }
  getInstituteLogoPath() {
    return this.instituteLogoPath;
  }
  getResearchArea() {
    return this.researchArea;
  }
  getAcronym(){
    return this.acronym;
  }
  getInstituteName() {
    return this.instituteName;
  }
  getDescription(){
    return this.description;
  }
  getCatalogues() {
    return this.catalogues;
  }
  getCataloguesNumber(){
    return this.cataloguesNumber;
  }
  static getAll() {
    return new Promise(resolve => {
      ipcRenderer.send("getCollection");
      ipcRenderer.once("collection", (event, receivedCollection) => {
        let newCollection = new Collection();
        newCollection.setCollection(receivedCollection[0]);
        resolve(newCollection);
      });
    });
  }
}

export default Collection;
