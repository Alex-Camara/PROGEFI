"use strict";
import { ipcRenderer } from "electron";
import moment from "moment";
import Catalogue from "./catalogue";
import Curator from "./curator";
import Collect from "./collect";
import Template from "./template";
import User from "./user";

class Datacard {
  constructor() {
    this.id = null;
    this.code = null;
    this.validated = false;
    this.formattedDate = null;
    this.formattedHour = null;
    this.base64 = null;
    this.curator = new Curator();
    this.collectorCode = null;
    this.creationDate = null;
    this.catalogue = new Catalogue();
    this.thumbnail = null;
    this.datacardPath = null;
    this.collect = new Collect();
    this.template = new Template();
    this.tempCollectorCode = null;
    this.user = new User();
    this.setCreationDate();
  }
  async setDatacard(datacard) {
    this.id = datacard.id;
    this.code = datacard.code;
    this.collectorCode = datacard.collectorCode;
    this.datacardPath = datacard.datacardPath;
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

    let newUser = new User();
    newUser.setUser(datacard.user);
    this.user = newUser;

    this.photocollectPath =
      datacard.datacardPath +
      "/original." +
      this.collect.getPhotocollectFormat();

    if (datacard.curator){
      let newCurator = new Curator();
      newCurator.setCurator(datacard.curator);
      this.curator = newCurator;
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
  setCurator(curator) {
    return new Promise(async resolve => {
      if (curator.hasOwnProperty("id")) {
        curator.valid = {isValid: true, message: null};
        this.curator = curator;
        resolve(curator);
      } else {
        let existingCurator = await Curator.getExisting(curator);
        if (existingCurator.length > 0) {
          existingCurator.setValid = {isValid: true, message: null};
          this.curator = existingCurator;
          resolve(existingCurator);
        } else {
          await this.curator.setName(curator);
          resolve(this.curator);
        }
      }

    });
  }
  setUser(user) {
    // let newUser = new User();
    // newUser.setUser(user);
    console.info("estableciendo usuario en datacard")
    console.info(user)
    this.user = user;
    console.info(this.user)
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
    return moment(this.creationDate).format("DD/MM/YYYY");
  }
  getFormattedCreationHour() {
    return moment(this.creationDate).format("HH:mm");
  }
  getFormattedDate() {
    return this.formattedDate;
  }
  getCurator() {
    return this.curator;
  }
  getFormattedHour() {
    return this.formattedHour;
  }
  getTemplate() {
    return this.template;
  }
  getUser() {
    return this.user;
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
  saveCurator() {
    return new Promise(async resolve => {
      if (this.curator.getId() === null) {
        await this.curator.save();
      }
      resolve();
    });
  }
  save() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("createDatacard", this);
      ipcRenderer.once("datacardCreated", (event, createdDatacard) => {
        if (
          createdDatacard.hasOwnProperty("nativeError") &&
          createdDatacard.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else if (createdDatacard === "file-error") {
          resolve("file-error");
        } else {
          resolve();
        }
      });
    });
  }
  update() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("updateDatacard", this);
      ipcRenderer.once("datacardUpdated", (event, updatedDatacard) => {
        if (
          updatedDatacard.hasOwnProperty("nativeError") &&
          updatedDatacard.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else if (updatedDatacard === "file-error") {
          resolve("file-error");
        } else {
          resolve();
        }
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
  static decode(base64) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("decodeDatacard", base64);
      ipcRenderer.once("datacardDecoded", (event, decodedDatacard) => {
        if (decodedDatacard === "DECODE ERROR") {
          reject();
        } else {
          decodedDatacard = decodedDatacard.split(",");
          console.info(decodedDatacard);
          resolve(decodedDatacard);
        }
      });
    });
  }
  static export(datacards, format, destinationDirectory) {
    return new Promise(resolve => {
      ipcRenderer.send(
        "exportDatacards",
        datacards,
        format,
        destinationDirectory
      );
      ipcRenderer.once("datacardsExported", (event, receivedDatacards) => {
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
      ipcRenderer.send(
        "getSortedDatacards",
        catalogueId,
        field,
        order,
        limit,
        offset
      );
      ipcRenderer.once("sortedDatacards", async (event, receivedDatacards) => {
        console.info(receivedDatacards);
        if (
          receivedDatacards.hasOwnProperty("nativeError") &&
          receivedDatacards.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          let datacards = [];
          for (let i = 0; i < receivedDatacards.length; i++) {
            let newDatacard = new Datacard();
            await newDatacard.setDatacard(receivedDatacards[i]);
            datacards.push(newDatacard);
          }
          resolve(datacards);
        }
      });
    });
  }
  static getFiltered(searchCriteria) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getFilteredDatacards", searchCriteria);
      ipcRenderer.once("filteredDatacards", (event, receivedDatacards) => {
        console.info(receivedDatacards);
        if (
          receivedDatacards.hasOwnProperty("nativeError") &&
          receivedDatacards.nativeError.code === "SQLITE_ERROR"
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
  static getByCode(catalogueId, code) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getDatacardsByCode", catalogueId, code);
      ipcRenderer.once("datacardsByCode", (event, receivedDatacards) => {
        if (
          receivedDatacards.hasOwnProperty("nativeError") &&
          receivedDatacards.nativeError.code === "SQLITE_ERROR"
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
