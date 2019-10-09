"use strict";
import CollectionDAO from '../dao/CollectionDao.js'

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