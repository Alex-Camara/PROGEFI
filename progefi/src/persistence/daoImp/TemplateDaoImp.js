"use strict";

const Template = require("../models/Template");
const Layout = require("../models/Layout");
const Tag = require("../models/Tag");

class TemplateDaoImp {
  async getTemplateNames() {
    const templates = await Template.query().eager("[tags, layout]");

    var resourcesPath = "/src/persistence/resources/";
    var fullPath = require("path").resolve(__dirname, "..") + resourcesPath;

    for (let i = 0; i < templates.length; i++) {
      templates[i].samplePath = fullPath + templates[i].samplePath;

      for (let j = 0; j < templates[i].tags.length; j++) {
        var jsonElement = JSON.parse(templates[i].tags[j].style);
        templates[i].tags[j].style = jsonElement;
      }
    }
    return templates;
  }
  async getTemplate(templateId) {
    let recoveredTemplate = await Template.query()
      .eager("[tags, layout]")
      .findById(templateId);

    // console.info(recoveredTemplate)

    let template = recoveredTemplate;

    var resourcesPath = "/src/persistence/resources/";
    var fullPath = require("path").resolve(__dirname, "..") + resourcesPath;

    template.samplePath = fullPath + template.samplePath;

    for (let i = 0; i < template.tags.length; i++) {
      var jsonElement = JSON.parse(template.tags[i].style);
      template.tags[i].style = jsonElement;
    }

    // console.info(template)

    return template;
  }
}

export default TemplateDaoImp;
