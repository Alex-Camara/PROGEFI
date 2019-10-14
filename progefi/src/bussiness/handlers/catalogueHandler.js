"use strict";
import CatalogueDAO from '../dao/CatalogueDao.js'

class CatalogueHandler {
    constructor(){
        this.catalogueDao = new CatalogueDAO()
    }
    async getCatalogues(collectionId, result) {
        let catalogues = await this.catalogueDao.getCatalogues(collectionId);
        result(catalogues);
    }
}

export default CatalogueHandler;