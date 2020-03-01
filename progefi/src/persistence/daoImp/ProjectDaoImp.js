'use strict'

const Project = require('../models/Project')

class ProjectDaoImp {
    async getProjects() {
        const projects = await Project.query();
        return projects;
    }
    async getProject(projectId) {
        const project = await Project.query()
            .where('id', projectId);
        return project[0];
    }
}

export default ProjectDaoImp;