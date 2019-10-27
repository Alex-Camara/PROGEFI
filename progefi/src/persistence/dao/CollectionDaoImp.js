'use strict'

const Collection = require('../models/Collection')

class CollectionDaoImp {
    async getCollections() {
        const collections = await Collection.query();
        console.log('collecciones: ' + collections)
        return collections;
    }

}

export default CollectionDaoImp;