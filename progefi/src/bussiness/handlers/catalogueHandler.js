"use strict";
import CatalogueDAO from '../dao/CatalogueDao.js'

class CatalogueHandler {
    constructor(){
        this.catalogueDao = new CatalogueDAO()
    }
    async getCatalogues(result) {
        let catalogues = await this.catalogueDao.getCatalogues();
        result(catalogues);
    }
}

export default CatalogueHandler;