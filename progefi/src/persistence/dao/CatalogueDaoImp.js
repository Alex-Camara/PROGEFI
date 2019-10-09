'use strict'

import Database from '../Database';

class CatalogueDaoImp {
    constructor() {
        this.databaseObject = new Database();
        this.database = null;
    }
    getCatalogues() {
        let catalogues = new Promise((resolve, reject) => {
            this.getCataloguesFromDatabase(function (catalogues, err) {
                if (!err) {
                    resolve(catalogues)
                } else {
                    reject(err)
                }
            });
        })
        return catalogues;
    }
    async getCataloguesFromDatabase(callback, err) {
        var self = this;
        var catalogues = []

        await this.databaseObject.open();

        this.database = this.databaseObject.getDatabase()

        let sqlStatement = 'SELECT id, name, collection_id FROM catalogues';

        this.database.serialize(() => {
            this.database.each(sqlStatement, (err, row) => {
                    if (!err) {
                        catalogues.push(row)
                    } else {
                        self.databaseObject.close();
                        callback(err)
                    }
                },
                function () {
                    self.databaseObject.close();
                    callback(catalogues)
                })
        })
    }
}

export default CatalogueDaoImp;