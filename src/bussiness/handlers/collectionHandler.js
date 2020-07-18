"use strict";
const path = require("path");
const electron = require("electron");
const log = require("electron-log");
var os = require("os");
const fs = require("fs");
import CollectionDAO from "../../persistence/dao/CollectionDao";

class CollectionHandler {
  constructor() {
    this.collectionDAO = new CollectionDAO();
  }
  async getCollection(result) {
    let collection = await this.collectionDAO.getCollection();
    result(collection);
  }
  async save(collection, result) {
    // var destinationFolder;

    log.info("collection: ");
    log.info(collection);

    log.info("directorio actual: ");
    log.info(__dirname);

    // log.info("directorio nuevo: ");
    // log.info(path.resolve(__dirname, ".."));
    //
    // if (os.platform() === "win32") {
    //   destinationFolder =
    //     path.resolve(__dirname, "..") +
    //     "/src/persistence/resources/institute_logos/" +
    //     new Date().getTime() +
    //     ".webp";
    // } else {
    //   destinationFolder =
    //     path.resolve(__dirname, "..") +
    //     "/src/persistence/resources/institute_logos/" +
    //     new Date().getTime() +
    //     ".webp";
    //   // destinationFolder = electron.app.getPath("userData")+ new Date().getTime() + ".webp";
    // }

    let destinationFolder = electron.app.getPath("userData") + "/instituteLogo";

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder)
    }

    log.info("directorio del logo: ");
    log.info(destinationFolder);
    const sharp = require("sharp");

    // let createdCollection = await this.collectionDAO.save(collection);
    // result(createdCollection);

    sharp("file://" + collection.instituteLogoPath)
      .webp({
        nearLossless: true,
        quality: 80,
        reductionEffort: 5
      })
      .toFile(destinationFolder)
      .catch(err => {
        log.error("error de sharp " + err);
      })
      .then(async () => {
        log.info("finaliza sharp ");
        collection.instituteLogoPath = destinationFolder;
        let createdCollection = await this.collectionDAO.save(collection);
        result(createdCollection);
      })
      .catch(err => {
        log.error("error de sharp " + err);
      });
  }
  async update(collection, result) {
    var destinationFolder =
      path.resolve(".") +
      "/src/persistence/resources/institute_logos/" +
      new Date().getTime() +
      ".webp";
    const sharp = require("sharp");
    await sharp(collection.instituteLogoPath)
      .webp({
        nearLossless: true,
        quality: 80,
        reductionEffort: 5
      })
      .toFile(destinationFolder);
    collection.instituteLogoPath = destinationFolder;
    let updatedCollecion = await this.collectionDAO.update(collection);
    result(updatedCollecion);
  }
}

export default CollectionHandler;
