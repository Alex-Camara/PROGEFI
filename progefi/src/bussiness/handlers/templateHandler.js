"use strict";
import TemplateDAO from '../../persistence/dao/TemplateDao'

class TemplateHandler {
    constructor() {
        this.templateDAO = new TemplateDAO()
    }
    async getTemplateNames(result) {
        let templates = await this.templateDAO.getTemplateNames();
        result(templates);
    }
    async getTemplate(templateId, result) {
        let template = await this.templateDAO.getTemplate(templateId);
        result(template);
    }
}

export default TemplateHandler;