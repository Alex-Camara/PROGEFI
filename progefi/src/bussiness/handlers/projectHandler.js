"use strict";
import ProjectDAO from '../dao/ProjectDAO.js'

class ProjectHandler {
    constructor() {
        this.projectDAO = new ProjectDAO()
    }
    async getProjects(result) {
        let projects = await this.projectDAO.getProjects();
        result(projects);
    }
}

export default ProjectHandler;