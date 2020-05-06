"use strict";

import DatacardDaoImp from "./DatacardDaoImp";

const Template = require("../models/Template");

class TemplateDaoImp {
  async save(template) {
    console.log("template daoimp");
    console.info(template);
    let createdTemplate = await Template.query()
      .insert({
        name: template.name,
        height: template.height,
        width: template.width,
        marginX: template.marginX,
        marginY: template.marginY,
        fontFamily: template.fontFamily,
        backgroundColor: template.backgroundColor,
        fontColor: template.fontColor,
        samplePath: template.samplePath,
          active: true
      })
      .catch(error => {
        return error;
      });
    console.log("template created daoimp");
    console.info(createdTemplate);
    return createdTemplate;
  }
  async update(template) {
    const updatedTemplate = await Template.query()
      .patchAndFetchById(template.id, {
        name: template.name,
        height: template.height,
        width: template.width,
        marginX: template.marginX,
        marginY: template.marginY,
        fontColor: template.fontColor,
        backgroundColor: template.backgroundColor,
        fontFamily: template.fontFamily
      })
      .catch(error => {
        return error;
      });

    return updatedTemplate;
  }
  async getTemplateNames() {
    let templates = await Template.query()
        .where("active", true)
      .eager("[tags]")
      .catch(error => {
        return error;
      });

    for (let i = 0; i < templates.length; i++) {
      templates[
        i
      ].notValidatedDatacards = await DatacardDaoImp.getNotValidatedByTemplateId(
        templates[i].id
      );
      console.info(templates[i].notValidatedDatacards);
    }
    return templates;
  }
  async delete(templateId) {
    let template = await Template.query().findById(templateId);
    let directoryToDelete = template.samplePath;
    // await template.$query().delete().catch(error => {
    //     return error;
    // });;
    await template
      .$query()
      .updateAndFetch({
        active: false
      })
      .catch(error => {
        return error;
      });
    console.log("directorio a borrar:");
    console.info(directoryToDelete);
    return directoryToDelete;
  }
  async getTemplate(templateId) {
    let template = await Template.query()
        .where("active", true)
      .eager("[tags]")
      .findById(templateId);
    return template;
  }
}

export default TemplateDaoImp;
