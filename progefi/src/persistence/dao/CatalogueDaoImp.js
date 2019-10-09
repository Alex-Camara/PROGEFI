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
                    console.log('resultado en la promesa de la impl del dao: ' + catalogues)
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

        console.log('DAO Implementation: ')
        await this.databaseObject.open();

        this.database = this.databaseObject.getDatabase()

        let sqlStatement = 'SELECT id, name, collection_id FROM catalogues';

        console.log('obteniendo resultados: ')

        this.database.serialize(() => {
            this.database.each(sqlStatement, (err, row) => {
                    console.log('resultados obtenidos ')
                    if (!err) {
                        catalogues.push(row)
                        console.log('columna ' + row)
                        console.log('row: ' + row.name)
                    } else {
                        console.log('error: ' + err)
                        self.databaseObject.close();
                        callback(err)
                    }
                },
                function () {
                    console.log('terminó de obtener las columnas')
                    console.log('columnas: ' + catalogues)
                    self.databaseObject.close();
                    callback(catalogues)
                })
        })
    }
}

export default CatalogueDaoImp;