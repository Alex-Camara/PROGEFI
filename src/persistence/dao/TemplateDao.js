'use strict'

import TemplateDaoImp from '../daoImp/TemplateDaoImp'

class TemplateDao {
    constructor() {
        this.templateDaoImp = new TemplateDaoImp();
    }
    update(template){
        let updatedTemplate = Promise.resolve(this.templateDaoImp.update(template))
        return updatedTemplate;
    }
    getTemplateNames() {
        let templates = Promise.resolve(this.templateDaoImp.getTemplateNames())
        return templates;
    }
    getTemplate(templateId) {
        let template = Promise.resolve(this.templateDaoImp.getTemplate(templateId))
        return template;
    }
    save(template){
        let createdTemplate = Promise.resolve(this.templateDaoImp.save(template))
        return createdTemplate;
    }
    delete(templateId){
        let directoryToDelete = Promise.resolve(this.templateDaoImp.delete(templateId))
        return directoryToDelete;
    }
}

export default TemplateDao;