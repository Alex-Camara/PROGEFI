'use strict'

const Project = require('../models/Project')

class ProjectDaoImp {
    async getProjects() {
        const projects = await Project.query();
        return projects;
    }
}

export default ProjectDaoImp;