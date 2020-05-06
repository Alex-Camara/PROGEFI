"use strict";
const { ipcRenderer } = require("electron");

import Catalogue from "./catalogue";

class Collection {
  constructor() {
    this.id = null;
    this.name = "";
    this.code= "";
    this.description = "";
    this.instituteName = "";
    this.instituteAcronym = "";
    this.researchAreaAcronym = "";
    this.researchArea = "";
    this.instituteLogoPath = "";
    this.cataloguesFolderPath = "",
    this.cataloguesNumber = "",
        this.catalogues = [];
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  async setCollection(collection) {
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
    this.researchAreaAcronym = collection.researchAreaAcronym;
    if (collection.hasOwnProperty("catalogues")) {
      for (let i = 0; i < collection.catalogues.length; i++) {
        let newCatalogue = new Catalogue();
        await newCatalogue.setCatalogue(collection.catalogues[i]);
        this.catalogues.push(newCatalogue);
      }
    }
  }
  setId(collectionId) {
    this.id = collectionId;
  }
  setName(name){
    this.name = name;
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
  getInstituteAcronym(){
    return this.instituteAcronym;
  }
  getResearchAreaAcronym(){
    return this.researchAreaAcronym;
  }
  getInstituteName() {
    return this.instituteName;
  }
  getDescription(){
    return this.description;
  }
  getCataloguesFolderPath(){
    return this.cataloguesFolderPath;
  }
  getCatalogues() {
    return this.catalogues;
  }
  getCataloguesNumber(){
    return this.cataloguesNumber;
  }
  static getAll() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getCollection");
      ipcRenderer.once("collection", (event, receivedCollection) => {
        let newCollection = [];
        if (
            receivedCollection.hasOwnProperty("nativeError") &&
            receivedCollection.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          if (receivedCollection.length > 0){
            newCollection = new Collection();
            newCollection.setCollection(receivedCollection[0]);
          }
          resolve(newCollection);
        }
      });
    });
  }
}

export default Collection;
