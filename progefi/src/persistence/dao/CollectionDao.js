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
    save(collection){
        let createdCollection = Promise.resolve(this.collectionDaoImp.save(collection))
        return createdCollection;
    }
    update(collection){
        let updatedCollection = Promise.resolve(this.collectionDaoImp.update(collection))
        return updatedCollection;
    }
}

export default CollectionDao;