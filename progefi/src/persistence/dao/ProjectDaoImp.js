'use strict'

import Database from '../Database';

class ProjectDaoImp {
    constructor() {
        this.databaseObject = new Database();
        this.database = null;
    }
    getProjects() {
        let projects = new Promise((resolve, reject) => {
            this.getProjectsFromDatabase(function (projects, err) {
                if (!err) {
                    resolve(projects)
                } else {
                    reject(err)
                }
            });
        })
        return projects;
    }
    async getProjectsFromDatabase(callback) {
        var self = this;
        let projects = []

        await this.databaseObject.open();

        this.database = this.databaseObject.getDatabase()

        let sqlStatement = 'SELECT * FROM projects';

        this.database.serialize(() => {
            this.database.each(sqlStatement, (err, row) => {
                    if (!err) {
                        projects.push(row)
                        console.log('proyectos obtenidos: ' + projects)
                    } else {
                        self.databaseObject.close();
                        callback(err)
                    }
                },
                function () {
                    self.databaseObject.close();
                    callback(projects)
                })
        })
    }
}

export default ProjectDaoImp;