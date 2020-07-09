"use strict";
import Validator from "../validators/validator";
import { ipcRenderer } from "electron";


class Tag {
  constructor() {
    this.id = null;
    this.tagName = "";
    this.tagNameValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.tagBefore = "";
    this.tagBeforeValid = {
      isValid: true,
      message: null
    };
    this.tagAfter = "";
    this.tagAfterValid = {
      isValid: true,
      message: null
    };
    this.fontSize = "";
    this.fontSizeValid = {
      isValid: true,
      message: null
    };
    this.fontWeight = "normal";
    this.fontStyle = "normal";
    this.textAlignment = "left";
    this.model = null;
    this.modelAttribute = null;
    this.style = null;
    this.backgroundColor = "";
    this.exampleValue = "";
    this.draggable = true;
    this.resizable = true;
    this.isStatic = false;
    this.h = "";
    this.w = "";
    this.x = 0;
    this.y = 0;
    this.i = "";

    this.templateId = null;
  }
  setTag(tag) {
    this.id = tag.id;
    this.tagName = tag.tagName;
    this.i = tag.tagName;
    this.tagBefore = tag.tagBefore;
    this.tagAfter = tag.tagAfter;
    this.templateId = tag.templateId;
    this.model = tag.model;
    this.modelAttribute = tag.modelAttribute;
    this.backgroundColor = tag.backgroundColor;
    this.fontSize = tag.fontSize;
    this.fontWeight = tag.fontWeight;
    this.textAlignment = tag.textAlignment;
    this.exampleValue = tag.exampleValue;
    this.fontStyle = tag.fontStyle;
    this.draggable = Boolean(Number(tag.draggable));
    this.resizable = Boolean(Number(tag.resizable));
    this.isStatic = tag.isStatic;
    this.w = tag.w;
    this.h = tag.h;
    this.x = tag.x;
    this.y = tag.y;
  }
  setTagName(tagName) {
    if (tagName !== "" && tagName !== null) {
      this.tagNameValid = { isValid: true, message: null };
      this.tagName = tagName;
      this.i = tagName;
    }
  }
  async setTagBefore(tagBefore) {
    let regex = "[\\s\\S]*";
    await this.validate(tagBefore, "tagBefore", 0, 60, regex, false);
  }
  async setTagAfter(tagAfter) {
    let regex = "[\\s\\S]*";
    await this.validate(tagAfter, "tagAfter", 0, 60, regex, false);
  }
  setModel(model) {
    this.model = model;
  }
  setModelAttribute(modelAttribute) {
    this.modelAttribute = modelAttribute;
  }
  setWidth(width) {
    this.w = width;
  }
  setHeight(height) {
    this.h = height;
  }
  setTemplate(template) {
    this.template = template;
  }
  async setFontSize(fontSize) {
    await this.validateDimension(fontSize, "fontSize", 1, 80, 9);
  }
  setFontWeight(fontWeight) {
    this.fontWeight = fontWeight;
  }
  setFontStyle(fontStyle) {
    this.fontStyle = fontStyle;
  }
  setTextAlignment(textAlignment) {
    this.textAlignment = textAlignment;
  }
  setExampleValue(exampleValue) {
    this.exampleValue = exampleValue;
  }
  setBackgroundColor(color) {
    this.backgroundColor = color;
  }
  setDraggable(draggable) {
    this.draggable = draggable;
  }
  setResizable(resizable) {
    this.resizable = resizable;
  }
  setStatic(isStatic) {
    this.static = isStatic;
  }
  setTemplateId(templateId) {
    this.templateId = templateId;
  }
  setTagNameValid(valid) {
    this.tagNameValid.isValid = valid.isValid;
    this.tagNameValid.message = valid.message;
  }
  setTagBeforeValid(valid) {
    this.tagBeforeValid.isValid = valid.isValid;
    this.tagBeforeValid.message = valid.message;
  }
  setTagAfterValid(valid) {
    this.tagAfterValid.isValid = valid.isValid;
    this.tagAfterValid.message = valid.message;
  }
  setFontSizeValid(valid) {
    this.fontSizeValid.isValid = valid.isValid;
    this.fontSizeValid.message = valid.message;
  }
  getTagName() {
    return this.tagName;
  }
  getExampleValue() {
    return this.exampleValue;
  }
  getTagBefore() {
    return this.tagBefore;
  }
  getTagAfter() {
    return this.tagAfter;
  }
  getFullTag() {
    return this.tagBefore + this.tagName + this.tagAfter;
  }
  getFullExampleTag() {
    return this.tagBefore + this.exampleValue + this.tagAfter;
  }
  getFontSize() {
    return this.fontSize;
  }
  getFontWeight() {
    return this.fontWeight;
  }
  getFontStyle() {
    return this.fontStyle;
  }
  getTextAlignment() {
    return this.textAlignment;
  }
  getBackgroundColor() {
    return this.backgroundColor;
  }
  isResizable() {
    return this.resizable;
  }
  isDraggable() {
    return this.draggable;
  }
  isStatic() {
    return this.isStatic;
  }
  getTagNameValid() {
    return this.tagNameValid;
  }
  isTagNameValid() {
    return this.tagNameValid.isValid;
  }
  getTagBeforeValid() {
    return this.tagBeforeValid;
  }
  isTagBeforeValid() {
    return this.tagBeforeValid.isValid;
  }
  getTagAfterValid() {
    return this.tagAfterValid;
  }
  isTagAfterValid() {
    return this.tagAfterValid.isValid;
  }
  getFontSizeValid() {
    return this.fontSizeValid;
  }
  isFontSizeValid() {
    return this.fontSizeValid.isValid;
  }
  getStyle(fontFamily) {
    let flexAlignment = "";
    switch (this.textAlignment) {
      case "left": {
        flexAlignment = "flex-start";
        break;
      }
      case "right": {
        flexAlignment = "flex-end";
        break;
      }
      case "center": {
        flexAlignment = "center";
        break;
      }
    }
    let finalStatement = {
      display: "flex",
      fontSize: this.fontSize + "px",
      alignContent: "flex-start",
      flexWrap: "wrap",
      alignSelf: "flex-start",
      alignItems: "flex-start",
      textAlign: this.textAlignment,
      justifyContent: flexAlignment,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      backgroundColor: this.backgroundColor,
      fontFamily: fontFamily
    };
    return finalStatement;
  }
  save(templateId) {
    return new Promise((resolve, reject) => {
      this.templateId = templateId;
      ipcRenderer.send("createTag", this);

      ipcRenderer.once("tagCreated", (event, createdTag) => {
        if (
          createdTag.hasOwnProperty("nativeError") &&
          createdTag.nativeError.code === "SQLITE_ERROR"
        ) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }
  validate(testValue, testValueName, minLimit, maxLimit, regex, isRequired) {
    return new Promise(async resolve => {
      // debugger;
      var validator = new Validator();
      validator
        .testValidationOne(testValue, minLimit, maxLimit, isRequired, regex)
        .then(() => {
          this[testValueName] = testValue;
          this[testValueName + "Valid"] = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (
            error === "Campo requerido" ||
            error === "Longitud mínima inválida"
          ) {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          } else if (error === "Campo vacío") {
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
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          }
        });
    });
  }
}

export default Tag;
