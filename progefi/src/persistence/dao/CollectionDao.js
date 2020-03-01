'use strict'

import CollectionDaoImp from '../daoImp/CollectionDaoImp'

class CollectionDao {
    constructor() {
        this.collectionDaoImp = new CollectionDaoImp();
    }
    getCollections() {
        let collections = Promise.resolve(this.collectionDaoImp.getCollections())
        return collections;
    }
    getCollection(collectionId) {
        let collection = Promise.resolve(this.collectionDaoImp.getCollection(collectionId))
        return collection;
    }
}

export default CollectionDao;