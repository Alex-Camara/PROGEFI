"use strict";
const path = require("path");
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
    var destinationFolder =
      path.resolve(".") +
      "/src/persistence/resources/institute_logos/" + new Date().getTime() + ".webp";
    const sharp = require("sharp");
    await sharp(collection.instituteLogoPath)
      .webp({
        nearLossless: true,
        quality: 80,
        reductionEffort: 5
      })
      .toFile(destinationFolder);
    collection.instituteLogoPath = destinationFolder;
    let createdCollection = await this.collectionDAO.save(collection);
    result(createdCollection);
  }
  async update(collection, result) {
    var destinationFolder =
      path.resolve(".") +
        "/src/persistence/resources/institute_logos/" + new Date().getTime() + ".webp";
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
