"use strict";

import Template from "./template";

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
    this.fontSize = 12;
    this.fontSizeValid = {
      isValid: true,
      message: null
    };
    this.bold = false;
    this.italics = false;
    this.textAlignment = "left";
    this.model = null;
    this.retrieveMethod = null;
    this.style = null;
    this.template = new Template();
  }
  setTagName(tagName) {
    this.tagName = tagName;
  }
  setTagBefore(tagBefore) {
    this.tagBefore = tagBefore;
  }
  setTagAfter(tagAfter) {
    this.tagAfter = tagAfter;
  }
  setModel(model) {
    this.model = model;
  }
  setRetrieveMethod(retrieveMethod) {
    this.retrieveMethod = retrieveMethod;
  }
  setTemplate(template) {
    this.template = template;
  }
  setFontSize(fontSize) {
    this.fontSize = fontSize;
  }
  setBold(bold) {
    this.bold = bold;
  }
  setItalics(italics) {
    this.italics = italics;
  }
  setTextAlignment(textAlignment) {
    this.textAlignment = textAlignment;
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
  getTagBefore() {
    return this.tagBefore;
  }
  getTagAfter() {
    return this.tagAfter;
  }
  getFontSize() {
    return this.fontSize;
  }
  isBold() {
    return this.bold;
  }
  isItalics() {
    return this.italics;
  }
  getTextAlignment() {
    return this.textAlignment;
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
}

export default Tag;
