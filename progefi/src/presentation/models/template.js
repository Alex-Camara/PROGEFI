"use strict";
const { ipcRenderer } = require("electron");

class Template {
  constructor() {
    this.id = null;
    this.name = null;
    this.nameValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.height = null;
    this.heightValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.width = null;
    this.widthValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.backgroundColor = "#000000";
    this.backgroundColorValid = {
      isValid: true,
      message: null
    };
    this.fontColor = "#FFFFFF";
    this.fontColorValid = {
      isValid: true,
      message: null
    };
    this.fontFamily = null;
    this.fontFamilyValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.samplePath = null;
    this.tags = [];
    this.layout = [];
    this.fontSizes = [];
    this.tagColors = [];
  }
  async setTemplate(template) {
    this.id = template.id;
    this.name = template.name;
    this.height = template.height;
    this.width = template.width;
    this.samplePath = template.samplePath;
    this.fontColor = template.fontColor;
    this.fontFamily = template.fontFamily;
    this.backgroundColor = template.backgroundColor;
    this.tags = template.tags;
    this.layout = template.layout;
    await this.setFontSize(template.tags);
    await this.setTagColors(template.tags);
  }
  setSamplePath(samplePath) {
    this.samplePath = samplePath;
  }
  setId(id) {
    this.id = id;
  }
  setName(name) {
    this.name = name;
  }
  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
  }
  setFontColor(fontColor) {
    this.fontColor = fontColor;
  }
  setFontFamily(fontFamily) {
    this.fontFamily = fontFamily;
  }
  setNameValid(valid) {
    this.nameValid.isValid = valid.isValid;
    this.nameValid.message = valid.message;
  }
  setBackgroundColorValid(valid) {
    this.backgroundColorValid.isValid = valid.isValid;
    this.backgroundColorValid.message = valid.message;
  }
  setFontColorValid(valid) {
    this.fontColorValid.isValid = valid.isValid;
    this.fontColorValid.message = valid.message;
  }
  setFontFamilyValid(valid) {
    this.fontFamilyValid.isValid = valid.isValid;
    this.fontFamilyValid.message = valid.message;
  }
  setTags(tags) {
    this.tags = tags;
  }
  setLayout(layout) {
    this.layout = layout;
  }
  setFontSize(tags) {
    return new Promise(resolve => {
      for (let i = 0; i < tags.length; i++) {
        this.fontSizes.push(tags[i].style["font-size"]);
      }
      resolve();
    });
  }
  setTagColors(tags) {
    return new Promise(resolve => {
      for (let i = 0; i < tags.length; i++) {
        const element = tags[i].style;
        this.tagColors[i] = element["background-color"];
      }
      resolve();
    });
  }
  getName() {
    return this.name;
  }
  getBackgroundColor() {
    return this.backgroundColor;
  }
  getFontColor() {
    return this.fontColor;
  }
  getFontFamily() {
    return this.fontFamily;
  }
  getNameValid() {
    return this.nameValid;
  }
  isNameValid() {
    return this.nameValid.isValid;
  }
  getBackgroundColorValid() {
    return this.backgroundColorValid;
  }
  isBackgroundColorValid() {
    return this.backgroundColorValid.isValid;
  }
  getFontColorValid() {
    return this.fontColorValid;
  }
  isFontColorValid() {
    return this.fontColorValid.isValid;
  }
  getFontFamilyValid() {
    return this.fontFamilyValid;
  }
  isFontFamilyValid() {
    return this.fontFamilyValid.isValid;
  }
  getId() {
    return this.id;
  }
  getSamplePath() {
    return this.samplePath;
  }
  getTags() {
    return this.tags;
  }
  getTagColors() {
    return this.tagColors;
  }
  getFontSizes() {
    return this.fontSizes;
  }
  get(id) {
    return new Promise(resolve => {
      ipcRenderer.send("getTemplate", id);
      ipcRenderer.once("template", (event, receivedTemplate) => {
        this.setTemplate(receivedTemplate);
        this.setFontSize(receivedTemplate.tags);
        this.setTagColors(receivedTemplate.tags);
        resolve(this);
      });
    });
  }
  static getAll() {
    return new Promise(resolve => {
      ipcRenderer.send("getTemplates");
      ipcRenderer.once("templates", (event, receivedTemplates) => {
        let templates = [];
        for (let i = 0; i < receivedTemplates.length; i++) {
          let template = new Template();
          template.setTemplate(receivedTemplates[i]);
          templates.push(template);
        }
        resolve(templates);
      });
    });
  }
}

export default Template;
