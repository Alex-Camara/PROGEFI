'use strict'

import CollectionDaoImp from '../../persistence/dao/CollectionDaoImp'

class CollectionDao {
    constructor() {
        this.collectionDaoImp = new CollectionDaoImp();
    }
    getCollections() {
        let collections = Promise.resolve(this.collectionDaoImp.getCollections())
        return collections;
    }
}

export default CollectionDao;