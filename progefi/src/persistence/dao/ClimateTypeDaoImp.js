'use strict'

import Database from '../Database';

class ClimateTypeDaoImp {
    constructor() {
        this.databaseObject = new Database();
        this.database = null;
    }
    getClimateTypes() {
        let climateTypes = new Promise((resolve, reject) => {
            this.getClimateTypesFromDatabase(function (climateTypes, err) {
                if (!err) {

                    resolve(climateTypes)
                } else {
                    reject(err)
                }
            });
        })
        return climateTypes;
    }
    async getClimateTypesFromDatabase(callback) {
        var self = this;
        let climateTypes = []

        await this.databaseObject.open();

        this.database = this.databaseObject.getDatabase()

        let sqlStatement = 'SELECT * FROM climateTypes';

        this.database.serialize(() => {
            this.database.each(sqlStatement, (err, row) => {
                    if (!err) {
                        climateTypes.push(row)
                    } else {
                        self.databaseObject.close();
                        callback(err)
                    }
                },
                function () {
                    self.databaseObject.close();
                    callback(climateTypes)
                })
        })
    }
}

export default ClimateTypeDaoImp;