'use strict'

import TemplateDaoImp from '../../persistence/dao/TemplateDaoImp'

class TemplateDao {
    constructor() {
        this.templateDaoImp = new TemplateDaoImp();
    }
    getTemplateNames() {
        let templates = Promise.resolve(this.templateDaoImp.getTemplateNames())
        return templates;
    }
    getTemplate(templateId) {
        let template = Promise.resolve(this.templateDaoImp.getTemplate(templateId))
        return template;
    } 
}

export default TemplateDao;