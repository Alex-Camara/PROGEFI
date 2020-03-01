'use strict'

import ProjectDaoImp from '../daoImp/ProjectDaoImp'

class ProjectDao {
    constructor() {
        this.projectDaoImp = new ProjectDaoImp();
    }
    getProjects() {
        let projects = Promise.resolve(this.projectDaoImp.getProjects())
        return projects;
    }
    getProject(projectId) {
        let project = Promise.resolve(this.projectDaoImp.getProject(projectId))
        return project;
    }
}

export default ProjectDao;