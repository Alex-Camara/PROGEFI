'use strict'

const Collection = require('../models/Collection')

class CollectionDaoImp {
    async getCollections() {
        const collections = await Collection.query()
            .select('collection.*', 'institute.name as instituteName',
                'institute.researchArea as instituteResearchArea',
                'institute.imagePath as instituteImagePath')
            .join('institute',
                'collection.instituteId',
                'institute.id');

        var resourcesPath = "/src/persistence/resources/";
        var fullPath = require('path').resolve(__dirname, '..') + resourcesPath;

        for (let i = 0; i < collections.length; i++) {
            collections[i].instituteImagePath = fullPath + collections[i].instituteImagePath;
        }

        return collections;
    }
    async getCollection(collectionId) {
        const collection = await Collection.query()
            .select('collection.*', 'institute.name as instituteName',
                'institute.researchArea as instituteResearchArea',
                'institute.imagePath as instituteImagePath')
            .where('collection.id', collectionId)
            .join('institute',
                'collection.instituteId',
                'institute.id');

        var resourcesPath = "/src/persistence/resources/";
        var fullPath = require('path').resolve(__dirname, '..') + resourcesPath;

        // for (let i = 0; i < collections.length; i++) {
        collection.instituteImagePath = fullPath + collection.instituteImagePath;
        // }

        return collection[0];
    }

}

export default CollectionDaoImp;