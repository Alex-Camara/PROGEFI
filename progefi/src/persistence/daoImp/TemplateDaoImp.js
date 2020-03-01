'use strict'

const Template = require('../models/Template')
const Layout = require('../models/Layout')
const Tag = require('../models/Tag')

class TemplateDaoImp {
    async getTemplateNames() {
        const templates = await Template.query()

        var resourcesPath = "/src/persistence/resources/";
        var fullPath = require('path').resolve(__dirname, '..') + resourcesPath;

        for (let i = 0; i < templates.length; i++) {
            templates[i].samplePath = fullPath + templates[i].samplePath
        }
        return templates;
    }
    async getTemplate(templateId) {

        const template = await Template.query().findById(templateId)

        var resourcesPath = "/src/persistence/resources/";
        var fullPath = require('path').resolve(__dirname, '..') + resourcesPath;

        template.samplePath = fullPath + template.samplePath

        const tags = await Tag.query().where('templateId', templateId)
        const layout = await Layout.query().where('templateId', templateId)
        
        for (let i = 0; i < layout.length; i++) {
            var jsonElement = JSON.parse(layout[i].style);
            layout[i].style = jsonElement;
        }
        template.tags = tags;
        template.layout = layout;

        return template;
    }
}

export default TemplateDaoImp;