'use strict'

import ProjectDaoImp from '../../persistence/dao/ProjectDaoImp'

class ProjectDao {
    constructor() {
        this.projectDaoImp = new ProjectDaoImp();
    }
    getProjects() {
        let projects = Promise.resolve(this.projectDaoImp.getProjects())
        return projects;
    }
}

export default ProjectDao;