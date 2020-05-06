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
      let cataloguesNumber = await CatalogueDaoImp.getCataloguesCount().catch(error => {
          return error;
      });
      collection[0].cataloguesNumber = cataloguesNumber;
    }
    return collection;
  }
}

export default CollectionDaoImp;
