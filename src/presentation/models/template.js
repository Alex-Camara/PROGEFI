"use strict";
import Tag from "./tag";
import Validator from "../validators/validator";

const { ipcRenderer } = require("electron");

class Template {
  constructor() {
    this.id = null;
    this.name = null;
    this.nameValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.height = 800;
    this.heightValid = {
      isValid: true,
      message: null
    };
    this.width = 1250;
    this.widthValid = {
      isValid: true,
      message: null
    };
    this.marginX = 0;
    this.marginXValid = {
      isValid: true,
      message: null
    };
    this.marginY = 0;
    this.marginYValid = {
      isValid: true,
      message: null
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
    this.fontSize = 20;
    this.fontSizeValid = {
      isValid: true,
      message: null
    };
    this.samplePath = null;
    this.tags = [];
    this.layout = [];
    this.fontSizes = [];
    this.tagColors = [];
    this.fonts = [];
    this.fontFamilies = [];
    this.notValidatedDatacards = 0
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
    this.layout = template.layout;
    this.fontSize = template.fontSize;
    this.marginX = template.marginX;
    this.marginY = template.marginY;
    this.notValidatedDatacards = template.notValidatedDatacards;

    for (let i = 0; i < template.tags.length; i++) {
      let newTag = new Tag();

      newTag.setTag(template.tags[i]);
      this.tags.push(newTag);
    }

    await this.setFontsSize(template.tags);
    await this.setTagColors(template.tags);

    this.nameValid = { isValid: true, message: null };
    this.fontFamilyValid = { isValid: true, message: null };
    this.heightValid = { isValid: true, message: null };
    this.widthValid = { isValid: true, message: null };
    this.backgroundColorValid = { isValid: true, message: null };
    this.fontColorValid = { isValid: true, message: null };
    this.marginXValid = { isValid: true, message: null };
    this.marginYValid = { isValid: true, message: null };
  }
  setSamplePath(samplePath) {
    this.samplePath = samplePath;
  }
  setId(id) {
    this.id = id;
  }
  async setName(name) {
    let templates = [];
    try {
      templates = await Template.getAll();
    } catch (error) {
      return "error";
    }
    let foundTemplateName = templates.find(
      x => x.name === name.toString().trim()
    );
    if (foundTemplateName) {
      if (this.id === foundTemplateName.id) {
        this.name = name;
        this.nameValid = {
          isValid: true,
          message: null
        };
      } else {
        this.name = name;
        this.nameValid = {
          isValid: false,
          message: "Nombre ya en uso"
        };
      }
    } else {
      let regex = "^[a-zA-Z0-9 \\u00C0-\\u00FF /():_-]*$";
      await this.validateString(name, "name", 5, 30, regex);
    }
  }
  async setBackgroundColor(backgroundColor) {
    let regex = "^[a-zA-Z0-9 #]*$";
    await this.validateString(backgroundColor, "backgroundColor", 7, 7, regex);
  }
  async setHeight(height) {
    await this.validateDimension(height, "height", 1, 34015, 99);
  }
  async setWidth(width) {
    await this.validateDimension(width, "width", 1, 34015, 99);
  }
  async setMarginX(marginX) {
    await this.validateDimension(marginX, "marginX", 0, this.width / 3, 0);
  }
  async setMarginY(marginY) {
    await this.validateDimension(marginY, "marginY", 0, this.height / 3, 0);
  }
  async setFontSize(fontSize) {
    await this.validateDimension(fontSize, "fontSize", 1, 80, 9);
  }
  async setFontColor(fontColor) {
    let regex = "^[a-zA-Z0-9 #]*$";
    await this.validateString(fontColor, "fontColor", 7, 7, regex);
  }
  setFontFamily(fontFamily) {
    let foundFamily = this.fontFamilies.find(x => x == fontFamily);
    if (foundFamily) {
      this.fontFamily = fontFamily;
      this.fontFamilyValid = { isValid: true, message: null };
    } else {
      if (fontFamily == "") {
        this.fontFamily = fontFamily;
        this.fontFamilyValid = { isValid: false, message: "Campo requerido" };
      } else {
        this.fontFamily = fontFamily;
        this.fontFamilyValid = { isValid: false, message: "Fuente no válida" };
      }
    }
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
  setHeightValid(valid) {
    this.heightValid.isValid = valid.isValid;
    this.heightValid.message = valid.message;
  }
  setWidthValid(valid) {
    this.widthValid.isValid = valid.isValid;
    this.widthValid.message = valid.message;
  }
  setTags(tags) {
    this.tags = tags;
  }
  addTag(tag) {
    this.tags.push(tag);
  }
  setLayout(layout) {
    this.layout = layout;
  }
  setFontsSize(tags) {
    return new Promise(resolve => {
      for (let i = 0; i < tags.length; i++) {
        this.fontSizes.push(tags[i].fontSize);
      }
      resolve();
    });
  }
  setTagColors(tags) {
    return new Promise(resolve => {
      for (let i = 0; i < tags.length; i++) {
        this.tagColors[i] = tags[i].backgroundColor;
      }
      resolve();
    });
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getHeight() {
    return this.height;
  }
  getHeightInMilimeters() {
    let mm = this.height/3.7795275591;
    mm = mm.toFixed(0);
    return mm;
  }
  getWidth() {
    return this.width;
  }
  getWidthInMilimeters() {
    let mm = this.width/3.7795275591;
    mm = Math.round(mm);
    return mm;
  }
  getMarginX() {
    return this.marginX;
  }
  getMarginXInMilimeters() {
    let mm = this.marginX/3.7795275591;
    mm = Math.round(mm);
    return mm;
  }
  getMarginY() {
    return this.marginY;
  }
  getMarginYInMilimeters() {
    let mm = this.marginY/3.7795275591;
    mm = Math.round(mm);
    return mm;
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
  getFontFamilies() {
    return this.fontFamilies;
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
  getHeightValid() {
    return this.heightValid;
  }
  getMarginXValid() {
    return this.marginXValid;
  }
  getMarginYValid() {
    return this.marginYValid;
  }
  getFontSize() {
    return this.fontSize;
  }
  getFontSizeValid() {
    return this.fontSizeValid;
  }
  getWidthValid() {
    return this.widthValid;
  }
  isFontFamilyValid() {
    return this.fontFamilyValid.isValid;
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
  getNotValidatedDatacards(){
    return this.notValidatedDatacards;
  }
  delete() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("deleteTemplate", this.id);
      ipcRenderer.once("templateDeleted", (templateDeleted) => {
        if (
            templateDeleted.hasOwnProperty("nativeError") &&
            templateDeleted.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else{
          resolve();
        }
      });
    });
  }
  save() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("createTemplate", this);
      ipcRenderer.once("templateCreated", async (event, createdTemplate) => {
        if (
          createdTemplate.hasOwnProperty("nativeError") &&
          createdTemplate.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          try {
            for (let i = 0; i < this.tags.length; i++) {
              await this.tags[i].save(createdTemplate.id);
            }
          } catch (e) {
            reject();
          }
          resolve();
        }
      });
    });
  }
  update() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("updateTemplate", this);
      ipcRenderer.once("templateUpdated", async (event, updatedTemplate) => {
        if (
            updatedTemplate.hasOwnProperty("nativeError") &&
            updatedTemplate.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }
  validateString(testValue, testValueName, minLimit, maxLimit, regex) {
    return new Promise(resolve => {
      var validator = new Validator();
      validator
        .testValidationOne(testValue, minLimit, maxLimit, true, regex)
        .then(() => {
          this[testValueName] = testValue;
          this[testValueName + "Valid"] = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (
            error == "Campo requerido" ||
            error == "Longitud mínima inválida"
          ) {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          } else if (error == "Campo vacío") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else if (this[testValueName + "Valid"].isValid) {
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else {
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          }
        });
    });
  }
  validateDimension(
    testValue,
    testValueName,
    minLimit,
    maxLimit,
    decimalMaxLimit
  ) {
    return new Promise(resolve => {
      var validator = new Validator();
      validator
        .testValidationTwo(testValue, minLimit, maxLimit, decimalMaxLimit, true)
        .then(() => {
          this[testValueName] = testValue;
          this[testValueName + "Valid"] = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          // cuando el campo es requerido y esta vacío
          if (error == "Campo requerido") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
            // cuando el campo esta vacío, pero no es error porque el campo no es requerido
          } else if (error == "Campo vacío") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
            // cuando solo se ha ingresado un - para un número negativo
          } else if (error == "Ingresa un número") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else if (this[testValueName] == "" || this[testValueName] == "-") {
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else {
            debugger
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          }
        });
    });
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
  getFonts() {
    return new Promise(resolve => {
      ipcRenderer.send("getFonts");
      ipcRenderer.once("fonts", (event, receivedFonts) => {
        this.fonts = receivedFonts;
        let fontFamilies = [];
        for (let i = 0; i < receivedFonts.length; i++) {
          let family = receivedFonts[i].family;
          let foundFamily = fontFamilies.find(x => x == family);
          if (!foundFamily) {
            fontFamilies.push(family);
          }
        }
        this.fontFamilies = fontFamilies;
        resolve(fontFamilies);
      });
    });
  }
  static getAll() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getTemplates");
      ipcRenderer.once("templates", async (event, receivedTemplates) => {
        if (
          receivedTemplates.hasOwnProperty("nativeError") &&
          receivedTemplates.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          let templates = [];
          for (let i = 0; i < receivedTemplates.length; i++) {
            let template = new Template();
            await template.setTemplate(receivedTemplates[i]);
            templates.push(template);
          }
          resolve(templates);
        }
      });
    });
  }
}

export default Template;
