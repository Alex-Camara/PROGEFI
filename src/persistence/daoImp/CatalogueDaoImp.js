"use strict";
import CollectionDaoImp from "./CollectionDaoImp";

const Catalogue = require("../models/Catalogue");
const Datacard = require("../models/Datacard");
const Collection = require("../models/Collection");

class CatalogueDaoImp {
  constructor() {
    this.collectionDaoImp = new CollectionDaoImp();
  }
  async getCatalogues(collectionId) {
    const catalogues = await Catalogue.query()
      .eager("[collection]")
      .where("collectionId", collectionId)
      .catch(error => {
        return error;
      });
    return catalogues;
  }
  async getAllCatalogues() {
    const catalogues = await Catalogue.query()
      .eager("[collection]")
      .catch(error => {
        return error;
      });

    for (let i = 0; i < catalogues.length; i++) {
      const catalogue = catalogues[i];
      catalogues[i].datacardCount = await this.countDatacardsInCatalog(
        catalogue.id
      );
    }
    return catalogues;
  }
  async getCatalogue(catalogueId) {
    // console.info(catalogueId)
    const catalogue = await Catalogue.query().where("id", catalogueId);

    let collection = await this.collectionDaoImp.getCollection(
      catalogue[0].collectionId
    );
    catalogue[0].collection = collection;

    return catalogue[0];
  }
  async createCatalogue(catalogue) {
    const createdCatalogue = await Catalogue.query()
      .insert({
        name: catalogue.name,
        code: catalogue.code,
        description: catalogue.description,
        collectionId: catalogue.collection.id
      })
      .catch(error => {
        return error;
      });
    // console.log(createdCatalogue)
    return createdCatalogue;
  }
  async countDatacardsInCatalog(catalogueId) {
    const countResult = await Datacard.query()
      .count("catalogueId as count")
      .as("count")
      .where("catalogueId", catalogueId);
    return countResult[0].count;
  }

  static async getCataloguesCount() {
    const countResult = await Catalogue.query()
      .count("id as count")
      .as("count");
    return countResult[0].count;
  }

  async deleteCatalogue(catalogueId) {
    const deletedCatalogue = await Catalogue.query().deleteById(catalogueId);
    return deletedCatalogue;
  }
  async update(catalogue) {
    const updatedCatalogue = await Catalogue.query().updateAndFetchById(
      catalogue.id,
      {
        code: catalogue.code,
        name: catalogue.name,
        description: catalogue.description
      }
    );
    return updatedCatalogue;
  }
}

export default CatalogueDaoImp;
