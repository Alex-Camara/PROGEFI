"use strict";
import { ipcRenderer } from "electron";
import moment from "moment";
import Catalogue from "./catalogue";
import Curator from "./curator";
import Collect from "./collect";
import Template from "./template";

class Datacard {
  constructor() {
    this.id = null;
    this.code = null;
    this.validated = false;
    this.formattedDate = null;
    this.formattedHour = null;
    this.base64 = null;
    this.curators = [];
    this.collectorCode = null;
    this.creationDate = null;
    this.catalogue = new Catalogue();
    this.curators = [];
    this.thumbnail = null;
    this.datacardPath = null;
    this.collect = new Collect();
    this.template = new Template();
    this.tempCollectorCode = null;
  }
  async setDatacard(datacard) {
    this.id = datacard.id;
    this.code = datacard.code;
    this.collectorCode = datacard.collectorCode;
    this.datacardPath = datacard.datacardPath;
    this.photocollectPath = datacard.datacardPath + "/original.png";
    this.validated = datacard.validated;
    this.creationDate = new Date(datacard.creationDate);
    this.thumbnail = datacard.thumbnail;

    let newCatalogue = new Catalogue();
    newCatalogue.setCatalogue(datacard.catalogue);
    this.catalogue = newCatalogue;

    let newTemplate = new Template();
    await newTemplate.setTemplate(datacard.template);
    this.template = newTemplate;

    let newCollect = new Collect();
    await newCollect.setCollect(datacard.collect);
    this.collect = newCollect;

    for (let i = 0; i < datacard.curators.length; i++) {
      let curator = new Curator();
      curator.setCurator(datacard.curators[i]);
      this.curators.push(curator);
    }
  }
  setCollect(collect) {
    this.collect = collect;
  }
  setDatacardPath(datacardPath) {
    this.datacardPath = datacardPath;
  }
  setPhotocollectPath(photocollectPath) {
    this.photocollectPath = photocollectPath;
  }
  setCatalogue(catalogue) {
    catalogue.setValid({ isValid: true, message: null });
    this.catalogue = catalogue;
    let collectionCode = catalogue.getCollection().getCode();
    this.generateCode(
      collectionCode,
      catalogue.getCode(),
      catalogue.getDatacardCount()
    );
  }
  setCurators(curators) {
    this.curators = curators;
  }
  addCurator(curator) {
    this.curators.push(curator);
  }
  setTemplate(template) {
    this.template = template;
  }
  setCreationDate() {
    this.creationDate = new Date();
  }
  setCollectorCode(collectorCode) {
    this.collectorCode = collectorCode;
    // this.generateCollectorCode();
    // debugger
  }
  setBase64(base64) {
    this.base64 = base64;
  }
  setFormattedDate(collectDate) {
    let formattedDate = moment(collectDate).format("DD/MM/YYYY");
    this.formattedDate = formattedDate;
  }
  setFormattedHour(collectDate) {
    let formattedHour = moment(collectDate).format("HH:mm");
    this.formattedHour = formattedHour;
  }
  setCode(code) {
    this.code = code;
  }
  getPhotocollectPath() {
    return this.photocollectPath;
  }
  getDatacardPath() {
    return this.datacardPath;
  }
  getCreationDate() {
    return this.creationDate;
  }
  getFormattedCreationDate() {
    return moment(this.creationDate).format("DD/MM/YYYY HH:mm");
  }
  getFormattedDate() {
    return this.formattedDate;
  }
  getCurators() {
    return this.curators;
  }
  getFormattedHour() {
    return this.formattedHour;
  }
  getTemplate() {
    return this.template;
  }
  isValidated() {
    return this.validated;
  }
  validate() {
    this.validated = true;
  }
  invalidate() {
    this.validated = false;
  }
  getCode() {
    return this.code;
  }
  getCatalogue() {
    return this.catalogue;
  }
  getCollectorCode() {
    return this.collectorCode;
  }
  getCollect() {
    return this.collect;
  }
  getFormattedCurators() {
    let curatorsName = "";
    for (let i = 0; i < this.curators.length; i++) {
      curatorsName += this.curators[i].getName();
      if (i !== this.curators.length - 1) {
        curatorsName += " | ";
      }
    }
    return curatorsName;
  }
  generateCode(collectionCode, catalogueCode, datacardCountInCatalogue) {
    let codeWithZeroes = datacardCountInCatalogue.toString().padStart(5, "0");
    codeWithZeroes = codeWithZeroes + "f";
    this.code = collectionCode + catalogueCode + " " + codeWithZeroes;
  }
  async generateCollectorCode() {
    let collectorId = this.collect.getCollector().getId();
    let catalogueId = this.catalogue.getId();

    if (collectorId !== null) {
      let baseCollectorCode = await this.collect.getCollector().getCode();
      ipcRenderer.send(
        "getDatacardsCountByCollector",
        collectorId,
        catalogueId
      );
      ipcRenderer.once("datacardsCountByCollector", (event, count) => {
        count++;
        count = count.toString().padStart(4, "0");
        this.collectorCode = baseCollectorCode + " " + count;
      });
    } else {
      let baseCollectorCode = await this.collect.getCollector().generateCode();
      this.collectorCode = baseCollectorCode + " 0001";
    }
  }
  saveCurators() {
    return new Promise(async resolve => {
      for (let i = 0; i < this.curators.length; i++) {
        await this.curators[i].save();
      }
      resolve();
    });
  }
  save() {
    return new Promise(resolve => {
      ipcRenderer.send("createDatacard", this);
      ipcRenderer.once("datacardCreated", () => {
        resolve();
      });
    });
  }
  update() {
    return new Promise(resolve => {
      ipcRenderer.send("updateDatacard", this);
      ipcRenderer.once("datacardUpdated", () => {
        resolve();
      });
    });
  }
  delete() {
    return new Promise(resolve => {
      ipcRenderer.send("deleteDatacard", this.id);
      ipcRenderer.once("datacardDeleted", () => {
        resolve();
      });
    });
  }
  static getAll(catalogueId) {
    return new Promise((resolve, reject) => {
      if (catalogueId != null) {
        ipcRenderer.send("getDatacards", catalogueId, "");
      } else {
        ipcRenderer.send("getAllDatacards");
      }
      ipcRenderer.once("datacards", (event, receivedDatacards) => {
        console.info(receivedDatacards);
        if (
          receivedDatacards.hasOwnProperty("code") &&
          receivedDatacards.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          let datacards = [];
          for (let i = 0; i < receivedDatacards.length; i++) {
            let newDatacard = new Datacard();
            newDatacard.setDatacard(receivedDatacards[i]);
            datacards.push(newDatacard);
          }
          resolve(datacards);
        }
      });
    });
  }
  static getSorted(catalogueId, field, order, limit, offset) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getSortedDatacards", catalogueId, field, order, limit, offset);
      ipcRenderer.once("sortedDatacards", (event, receivedDatacards) => {
        console.info(receivedDatacards);
        if (
          receivedDatacards.hasOwnProperty("code") &&
          receivedDatacards.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          let datacards = [];
          for (let i = 0; i < receivedDatacards.length; i++) {
            let newDatacard = new Datacard();
            newDatacard.setDatacard(receivedDatacards[i]);
            datacards.push(newDatacard);
          }
          resolve(datacards);
        }
      });
    });
  }
  static getSortedByScientificName(catalogueId, order, limit) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getSortedDatacards", catalogueId, order, limit);
      ipcRenderer.once("sortedDatacards", (event, receivedDatacards) => {
        console.info(receivedDatacards);
        if (
          receivedDatacards.hasOwnProperty("code") &&
          receivedDatacards.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          let datacards = [];
          for (let i = 0; i < receivedDatacards.length; i++) {
            let newDatacard = new Datacard();
            newDatacard.setDatacard(receivedDatacards[i]);
            datacards.push(newDatacard);
          }
          resolve(datacards);
        }
      });
    });
  }
}

export default Datacard;
