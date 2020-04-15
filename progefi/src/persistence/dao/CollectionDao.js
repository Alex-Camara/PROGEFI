'use strict'

import CollectionDaoImp from '../daoImp/CollectionDaoImp'

class CollectionDao {
    constructor() {
        this.collectionDaoImp = new CollectionDaoImp();
    }
    getCollection() {
        let collection = Promise.resolve(this.collectionDaoImp.getCollection())
        return collection;
    }
}

export default CollectionDao;