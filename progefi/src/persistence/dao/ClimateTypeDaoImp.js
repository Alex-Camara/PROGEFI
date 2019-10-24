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
    getVegetationTypes() {
        let vegetationTypes = new Promise((resolve, reject) => {
            this.getVegetationTypesFromDatabase(function (vegetationTypes, err) {
                if (!err) {
                    resolve(vegetationTypes)
                } else {
                    reject(err)
                }
            });
        })
        return vegetationTypes;
    }
    async getVegetationTypesFromDatabase(callback) {
        var self = this;
        let vegetationTypes = [];
        let vegetalFormations = [];

        await this.databaseObject.open();

        this.database = this.databaseObject.getDatabase()

        let sqlStatement1 = 'SELECT * FROM vegetationTypes';
        let sqlStatement2 = 'SELECT * FROM vegetalFormations';

        this.database.serialize(() => {
            this.database.each(sqlStatement1, (err, row) => {
                if (!err) {
                    vegetationTypes.push(row)
                    //console.info(row)
                } else {
                    self.databaseObject.close();
                    callback(err)
                }
            });
            this.database.each(sqlStatement2, (err, row) => {
                    if (!err) {
                        vegetalFormations.push(row)
                        //console.info(row)
                    } else {
                        self.databaseObject.close();
                        callback(err)
                    }
                },
                function () {
                    callback([vegetationTypes, vegetalFormations])
                })
        });
        //this.databaseObject.close();

    }
}

export default ClimateTypeDaoImp;