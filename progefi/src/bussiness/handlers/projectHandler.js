"use strict";
import ProjectDAO from '../../persistence/dao/ProjectDao'

class ProjectHandler {
    constructor() {
        this.projectDAO = new ProjectDAO()
    }
    async getProjects(result) {
        let projects = await this.projectDAO.getProjects();
        result(projects);
    }
    async getProject(projectId) {
        return new Promise(async (resolve) => {
            let project = await this.projectDAO.getProject(projectId);
            resolve(project);
        });
    }
}

export default ProjectHandler;