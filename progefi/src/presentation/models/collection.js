"use strict";
import Validator from "../validators/validator";

const { ipcRenderer } = require("electron");

import Catalogue from "./catalogue";

class Collection {
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
    this.instituteName = "";
    this.instituteNameValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.instituteAcronym = "";
    this.instituteAcronymValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.researchAreaAcronym = "";
    this.researchAreaAcronymValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.researchArea = "";
    this.researchAreaValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.instituteLogoPath = "";
    this.instituteLogoPathValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.cataloguesFolderPath = "";
    this.cataloguesFolderPathValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.cataloguesNumber = "";
    this.catalogues = [];
    this.required = true;
    this.valid = {};
    this.valid.isValid = false;
    this.valid.message = "Campo requerido";
  }
  async setCollection(collection) {
    this.id = collection.id;
    this.code = collection.code;
    this.name = collection.name;
    this.description = collection.description;
    this.instituteName = collection.instituteName;
    this.instituteAcronym = collection.instituteAcronym;
    this.instituteLogoPath = collection.instituteLogoPath;
    this.cataloguesFolderPath = collection.cataloguesFolderPath;
    this.researchArea = collection.researchArea;
    this.cataloguesNumber = collection.cataloguesNumber;
    this.researchAreaAcronym = collection.researchAreaAcronym;

    this.nameValid = { isValid: true, message: null };
    this.codeValid = { isValid: true, message: null };
    this.descriptionValid = { isValid: true, message: null };
    this.setValid({ isValid: true, message: null });
    this.researchAreaValid = { isValid: true, message: null };
    this.researchAreaAcronymValid = { isValid: true, message: null };
    this.cataloguesFolderPathValid = { isValid: true, message: null };
    this.instituteNameValid = { isValid: true, message: null };
    this.instituteAcronymValid = { isValid: true, message: null };
    this.instituteLogoPathValid = { isValid: true, message: null };

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
  async setName(name) {
    let regex = "^[a-zA-Z \\u00C0-\\u00FF'\"]*$";
    await this.validate(name, "name", 3, 100, regex, true);
  }
  async setCode(code) {
    let regex = "^[a-zA-Z0-9 \\u00C0-\\u00FF\\_-]*$";
    await this.validate(code, "code", 2, 10, regex, true);
  }
  async setInstituteAcronym(instituteAcronym) {
    let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
    await this.validate(
      instituteAcronym,
      "instituteAcronym",
      2,
      20,
      regex,
      true
    );
  }
  async setResearchAreaAcronym(researchAreaAcronym) {
    let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
    await this.validate(
      researchAreaAcronym,
      "researchAreaAcronym",
      2,
      20,
      regex,
      true
    );
  }
  async setInstituteName(instituteName) {
    let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
    await this.validate(instituteName, "instituteName", 5, 100, regex, true);
  }
  async setResearchArea(researchArea) {
    let regex = "^[a-zA-Z0-9 \\u00C0-\\u00FF\\_-]*$";
    await this.validate(researchArea, "researchArea", 5, 100, regex, true);
  }
  async setDescription(description) {
    let regex =
      "^[a-zA-Z0-9 \\u00C0-\\u00FF \\/():_.,;{}\\[\\]ñ<<>>+=%#$\"'-\\«\\»]*$";
    await this.validate(description, "description", 5, 350, regex, false);
  }
  setInstituteLogoPath(instituteLogoPath) {
    if (instituteLogoPath !== null && instituteLogoPath !== "") {
      this.instituteLogoPath = instituteLogoPath;
      this.checkFileExtension(instituteLogoPath);
    } else {
      this.instituteLogoPathValid = {
        isValid: false,
        message: "Campo requerido"
      };
    }
  }
  setCataloguesFolderPath(cataloguesFolderPath) {
    this.cataloguesFolderPath = cataloguesFolderPath;
    if (cataloguesFolderPath !== null && cataloguesFolderPath !== "") {
      this.cataloguesFolderPathValid = { isValid: true, message: null };
    } else {
      this.cataloguesFolderPathValid = {
        isValid: false,
        message: "Campo requerido"
      };
    }
  }
  checkFileExtension(file) {
    let splittedFile = file.split(".");
    let fileExtension = splittedFile[1];
    if (
      fileExtension === "png" ||
      fileExtension === "jpeg" ||
      fileExtension === "jpg" ||
      fileExtension === "svg" ||
      fileExtension === "webp"
    ) {
      this.instituteLogoPathValid = { isValid: true, message: null };
    } else {
      this.instituteLogoPathValid = {
        isValid: false,
        message: "Formato inválido"
      };
    }
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
  getCode() {
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
  getInstituteAcronym() {
    return this.instituteAcronym;
  }
  getResearchAreaAcronym() {
    return this.researchAreaAcronym;
  }
  getInstituteName() {
    return this.instituteName;
  }
  getDescription() {
    return this.description;
  }
  getCataloguesFolderPath() {
    return this.cataloguesFolderPath;
  }
  getCatalogues() {
    return this.catalogues;
  }
  getCataloguesNumber() {
    return this.cataloguesNumber;
  }
  getNameValid() {
    return this.nameValid;
  }
  getCodeValid() {
    return this.codeValid;
  }
  getDescriptionValid() {
    return this.descriptionValid;
  }
  getInstituteNameValid() {
    return this.instituteNameValid;
  }
  getInstituteAcronymValid() {
    return this.instituteAcronymValid;
  }
  getInstituteLogoPathValid() {
    return this.instituteLogoPathValid;
  }
  getResearchAreaValid() {
    return this.researchAreaValid;
  }
  getResearchAreaAcronymValid() {
    return this.researchAreaAcronymValid;
  }
  getCataloguesFolderPathValid() {
    return this.cataloguesFolderPathValid;
  }
  save() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("createCollection", this);
      ipcRenderer.once("collectionCreated", createdCollection => {
        if (
          createdCollection.hasOwnProperty("nativeError") &&
          createdCollection.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }
  update() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("updateCollection", this);
      ipcRenderer.once("collectionUpdated", (event, updateCollection) => {
        if (
            updateCollection.hasOwnProperty("nativeError") &&
            updateCollection.nativeError.code === "SQLITE_ERROR"
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
      ipcRenderer.send("getCollection");
      ipcRenderer.once("collection", (event, receivedCollection) => {
        let newCollection = [];
        if (
          receivedCollection.hasOwnProperty("nativeError") &&
          receivedCollection.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          if (receivedCollection.length > 0) {
            newCollection = new Collection();
            newCollection.setCollection(receivedCollection[0]);
          }
          resolve(newCollection);
        }
      });
    });
  }
  validate(testValue, testValueName, minLimit, maxLimit, regex, isRequired) {
    return new Promise(async resolve => {
      // debugger;
      var validator = new Validator();
      validator
        .testValidationOne(testValue, minLimit, maxLimit, isRequired, regex)
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

export default Collection;
