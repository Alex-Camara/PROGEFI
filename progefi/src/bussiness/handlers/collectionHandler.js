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
    async save(collection, result){
        let createdCollecion = await this.collectionDAO.save(collection);
        result(createdCollecion);
    }
    async update(collection, result){
        let updatedCollecion = await this.collectionDAO.update(collection);
        result(updatedCollecion);
    }
}

export default CollectionHandler;