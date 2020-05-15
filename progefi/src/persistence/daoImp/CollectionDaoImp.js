"use strict";

import CatalogueDaoImp from "./CatalogueDaoImp";
const Collection = require("../models/Collection");

class CollectionDaoImp {
  async getCollection() {
    let collection = await Collection.query()
      .eager("[catalogues]")
      .catch(error => {
        return error;
      });
    if (collection.length > 0) {
      let cataloguesNumber = await CatalogueDaoImp.getCataloguesCount().catch(
        error => {
          return error;
        }
      );
      collection[0].cataloguesNumber = cataloguesNumber;
    }
    return collection;
  }
  async save(collection) {
    const createdCollection = await Collection.query()
      .insert({
        name: collection.name,
        code: collection.code,
        description: collection.description,
        instituteName: collection.instituteName,
        instituteAcronym: collection.instituteAcronym,
        researchAreaAcronym: collection.researchAreaAcronym,
        researchArea: collection.researchArea,
        instituteLogoPath: collection.instituteLogoPath,
        cataloguesFolderPath: collection.cataloguesFolderPath
      })
      .catch(error => {
        console.info(error);
        return error;
      });
    console.log(createdCollection);
    return createdCollection;
  }
  async update(collection) {
    const updatedCollection = await Collection.query()
      .patchAndFetchById(collection.id, {
        name: collection.name,
          code: collection.code,
          description: collection.description,
          instituteName: collection.instituteName,
          instituteAcronym: collection.instituteAcronym,
          researchAreaAcronym: collection.researchAreaAcronym,
          researchArea: collection.researchArea,
          instituteLogoPath: collection.instituteLogoPath,
          cataloguesFolderPath: collection.cataloguesFolderPath
      })
      .catch(error => {
        return error;
      });

    return updatedCollection;
  }
}

export default CollectionDaoImp;
