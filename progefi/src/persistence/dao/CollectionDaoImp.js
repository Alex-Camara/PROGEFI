'use strict'

import Database from '../Database';

class CollectionDaoImp {
    constructor() {
        this.databaseObject = new Database();
        this.database = null;
    }
    getCollections() {
        let collections = new Promise((resolve, reject) => {
            this.getCollectionsFromDatabase(function (collections, err) {
                if (!err) {
                    resolve(collections)
                } else {
                    reject(err)
                }
            });
        })
        return collections;
    }
    async getCollectionsFromDatabase(callback) {
        var self = this;
        let collections = []

        await this.databaseObject.open();

        this.database = this.databaseObject.getDatabase()

        let sqlStatement = 'SELECT * FROM collections';

        this.database.serialize(() => {
            this.database.each(sqlStatement, (err, row) => {
                    if (!err) {
                        collections.push(row)
                    } else {
                        self.databaseObject.close();
                        callback(err)
                    }
                },
                function () {
                    self.databaseObject.close();
                    callback(collections)
                })
        })
    }
}

export default CollectionDaoImp;