"use strict";
import CollectionDAO from '../../persistence/dao/CollectionDao'

class CollectionHandler {
    constructor(){
        this.collectionDAO = new CollectionDAO()
    }
    async getCollections(result) {
        let collections = await this.collectionDAO.getCollections();
        result(collections);
    }
}

export default CollectionHandler;