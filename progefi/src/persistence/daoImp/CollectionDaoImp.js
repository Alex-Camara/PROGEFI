"use strict";

import CatalogueDaoImp from "./CatalogueDaoImp";
const Collection = require("../models/Collection");

class CollectionDaoImp {
  async getCollection() {
    let collection = await Collection.query().eager("[catalogues]");

    let cataloguesNumber = await CatalogueDaoImp.getCataloguesCount();
    collection[0].cataloguesNumber = cataloguesNumber;
    return collection;
  }
}

export default CollectionDaoImp;
