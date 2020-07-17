"use strict";
import TemplateDAO from "../../persistence/dao/TemplateDao";
import TagDao from "../../persistence/dao/TagDao";
const path = require("path");
const fs = require("fs");
const log = require("electron-log");

class TemplateHandler {
  constructor() {
    this.templateDAO = new TemplateDAO();
    this.tagDAO = new TagDao();
  }
  async save(template, result) {

    log.info("Guardando template...")
    var templatesFolderPath =
        path.resolve(__dirname, "..") + "/src/persistence/resources/template_samples/";
    log.info("template folder path: " + templatesFolderPath)
    let base64String = template.base64; // Not a real image
    // Remove header
    let base64Image = base64String.split(";base64,").pop();

    let templateName = "template" + new Date().getTime() + ".png";

    let templatePath =
      templatesFolderPath + templateName;

    this.base64Decode(base64Image, templatePath);

    template.samplePath = templateName;
    let createdTemplate = await this.templateDAO.save(template);
    result(createdTemplate);
  }
  async getTemplateNames(result) {
    let templates = await this.templateDAO.getTemplateNames();
    result(templates);
  }
  async getTemplate(templateId, result) {
    let template = await this.templateDAO.getTemplate(templateId);
    result(template);
  }
  async saveTag(tag, result) {
    let createdTag = await this.tagDAO.save(tag);
    result(createdTag);
  }
  async update(template, result){
    let updatedTemplate = await this.templateDAO.update(template);
    result(updatedTemplate);
  }
  async delete(templateId, result){
    var templatesFolderPath =
        path.resolve(".") + "/src/persistence/resources/template_samples/";
    let directoryToDelete = await this.templateDAO.delete(templateId);
    directoryToDelete = templatesFolderPath + directoryToDelete;
    fs.unlinkSync(directoryToDelete);
    result(directoryToDelete);
  }
  base64Decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, "base64");
    // write buffer to file
    try {
      fs.writeFileSync(file, bitmap);
      console.log("******** File created from base64 encoded string ********");
    } catch (error) {
      console.log("ERROR EN GUARDAR LA DATACARD: " + error);
    }
  }
}

export default TemplateHandler;
