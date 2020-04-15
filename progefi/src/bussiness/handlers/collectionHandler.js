"use strict";
import CollectionDAO from '../../persistence/dao/CollectionDao'

class CollectionHandler {
    constructor(){
        this.collectionDAO = new CollectionDAO()
    }
    async getCollection(result) {
        let collection = await this.collectionDAO.getCollection();
        result(collection);
    }
}

export default CollectionHandler;