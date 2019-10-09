"use strict";
import CatalogueDAO from '../dao/CatalogueDao.js'
import Catalogue from '../models/Catalogue.js'

class CatalogueHandler {
    constructor(){
        this.catalogueDao = new CatalogueDAO()
    }
    async getCatalogues(result) {
        console.log('catalogue Handler')
        let catalogues = await this.catalogueDao.getCatalogues();
        console.log('resultado del catalogue Handler: ' + catalogues)
        result(catalogues);
    }
}

export default CatalogueHandler;