"use strict";
const electron = require("electron");
const log = require("electron-log");
const sharp = require("sharp")
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
    let destinationFolder = electron.app.getPath("userData") + "/instituteLogo";
    let destinationFolderFile = destinationFolder + "/" + new Date().getTime() + ".webp";

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder)
    }
    var data = fs.readFileSync(collection.instituteLogoPath);

    sharp(data)
      .webp({
        nearLossless: true,
        quality: 80,
        reductionEffort: 5
      })
      .toFile(destinationFolderFile)
      .catch(err => {
        log.error("error de sharp " + err);
      })
      .then(async () => {
        log.info("finaliza sharp ");
        collection.instituteLogoPath = destinationFolderFile;
        let createdCollection = await this.collectionDAO.save(collection);
        result(createdCollection);
      })
      .catch(err => {
        log.error("error de sharp " + err);
      });
  }
  async update(collection, result) {
    let destinationFolder = electron.app.getPath("userData") + "/instituteLogo";
    let destinationFolderFile = destinationFolder + "/" + new Date().getTime() + ".webp";

    await sharp(collection.instituteLogoPath)
      .webp({
        nearLossless: true,
        quality: 80,
        reductionEffort: 5
      })
      .toFile(destinationFolderFile);
    collection.instituteLogoPath = destinationFolderFile;
    let updatedCollecion = await this.collectionDAO.update(collection);
    result(updatedCollecion);
  }
}

export default CollectionHandler;
