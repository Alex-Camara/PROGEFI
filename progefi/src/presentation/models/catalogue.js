"use strict";
import Validator from "../validators/validator";
const { ipcRenderer } = require("electron");
import Collection from "./collection";

class Catalogue {
  constructor() {
    this.id = null;
    this.name = null;
    this.nameValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.code = null;
    this.codeValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.description = null;
    this.descriptionValid = {
      isValid: true,
      message: null
    };
    // this.collectionId = null;
    this.collection = new Collection();
    this.collectionValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.datacardCount = 0;
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  async setCatalogue(catalogue) {
    this.id = catalogue.id;
    this.name = catalogue.name;
    this.code = catalogue.code;
    this.description = catalogue.description;
    this.datacardCount = catalogue.datacardCount;
    if (catalogue.hasOwnProperty("collection")) {
      let newCollection = new Collection();
      newCollection.setCollection(catalogue.collection);
      this.collection = newCollection;
    }
    this.nameValid = { isValid: true, message: null };
    this.codeValid = { isValid: true, message: null };
    this.descriptionValid = { isValid: true, message: null };
    this.setValid({ isValid: true, message: null });
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
    this.collection = collection;
  }
  async setName(name) {
    let catalogues = [];
    try {
      catalogues = await Catalogue.getAll();
    } catch (error) {
      return "error";
    }

    let foundCatalogueName = catalogues.find(x => x.name === name.toString().trim());
    if (foundCatalogueName) {
      // debugger
      this.name = name;
      this.nameValid = {
        isValid: false,
        message: "Nombre ya en uso"
      };
    } else {
      let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
      await this.validate(name, "name", 3, 50, regex);
    }
  }
  async setCode(code) {
    let catalogues = await Catalogue.getAll();
    let foundCatalogueCode = catalogues.find(x => x.code === code.toString().trim());
    if (foundCatalogueCode) {

      // debugger
      this.code = code;
      this.codeValid = {
        isValid: false,
        message: "Código ya en uso"
      };
    } else {
      let regex = "^[a-zA-Z0-9 \\u00C0-\\u00FF\\_-]*$";
      await this.validate(code, "code", 2, 10, regex);
    }
  }
  async setDescription(description) {
    let regex =
      "^[a-zA-Z0-9 \\u00C0-\\u00FF \\/():_.,;{}\\[\\]ñ<<>>+=%#$\"'-\\«\\»]*$";
    await this.validate(description, "description", 5, 350, regex);
  }
  setNameValid(valid) {
    this.nameValid.isValid = valid.isValid;
    this.nameValid.message = valid.message;
  }
  setCodeValid(valid) {
    this.codeValid.isValid = valid.isValid;
    this.codeValid.message = valid.message;
  }
  setDescriptionValid(valid) {
    this.descriptionValid.isValid = valid.isValid;
    this.descriptionValid.message = valid.message;
  }
  setCollectionValid(valid) {
    this.collectionValid.isValid = valid.isValid;
    this.collectionValid.message = valid.message;
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
    return this.description;
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
    return this.collection;
  }
  getNameValid() {
    return this.nameValid;
  }
  isNameValid() {
    return this.nameValid.isValid;
  }
  getCodeValid() {
    return this.codeValid;
  }
  isCodeValid() {
    return this.codeValid.isValid;
  }
  getDescriptionValid() {
    return this.descriptionValid;
  }
  isDescriptionValid() {
    return this.descriptionValid.isValid;
  }
  getCollectionValid() {
    return this.collectionValid;
  }
  isCollectionValid() {
    return this.collectionValid.isValid;
  }
  save() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("createCatalogue", this);
      ipcRenderer.once("catalogueCreated", createdCatalogue => {
        if (
            createdCatalogue.hasOwnProperty("nativeError") &&
            createdCatalogue.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }
  delete() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("deleteCatalogue", this.id);
      ipcRenderer.once("catalogueDeleted", deletedCatalogue => {
        if (
            deletedCatalogue.hasOwnProperty("nativeError") &&
            deletedCatalogue.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }
  static getAll() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getAllCatalogues");

      ipcRenderer.once("catalogues", (event, receivedCatalogues) => {
        console.info(receivedCatalogues);
        if (
            receivedCatalogues.hasOwnProperty("nativeError") &&
            receivedCatalogues.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          let catalogues = [];
          for (let i = 0; i < receivedCatalogues.length; i++) {
            let catalogue = new Catalogue();
            catalogue.setCatalogue(receivedCatalogues[i]);
            catalogues.push(catalogue);
          }
          resolve(catalogues);
        }
      });
    });
  }
  validate(testValue, testValueName, minLimit, maxLimit, regex) {
    return new Promise(async resolve => {
      // debugger;
      var validator = new Validator();
      validator
        .testValidationOne(testValue, minLimit, maxLimit, true, regex)
        .then(() => {
          this[testValueName] = testValue;
          this[testValueName + "Valid"] = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (
            error === "Campo requerido" ||
            error === "Longitud mínima inválida"
          ) {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          } else if (error === "Campo vacío") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else if (this[testValueName + "Valid"].isValid) {
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else {
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          }
        });
    });
  }
}

export default Catalogue;
