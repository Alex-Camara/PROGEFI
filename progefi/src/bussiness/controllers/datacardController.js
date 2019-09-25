"use strict";

import jimp from 'jimp';
const path = require("path");
const fs = require('fs');

class datacardController {
  constructor(datacard) {
    this.datacard = datacard;
  }
  async savePhotoCollect(photoCollect) {
    var photocollectsFolderPath = path.resolve(".") + '/src/bussiness/photocollects/';

    try {
      var originalPath = this.saveFile(photoCollect, photocollectsFolderPath)
      console.log('original: ' + originalPath)
      var duplicatePath = this.saveDuplicatedFile(originalPath, photocollectsFolderPath)

      var photoCollectFile = await jimp.read(originalPath)
      var fileExtension = photoCollectFile.getExtension()

      if ((fileExtension == 'jpeg') || (fileExtension == 'png') || (fileExtension == 'bmp')) {
        return duplicatePath;
      } else {
        return 'not supported format'
      }
    } catch (error) {
      return error
    }
  }
  saveDuplicatedFile(originalPath, photocollectsFolderPath) {
    try {
      var duplicatePath = photocollectsFolderPath + 'duplicate/' + 'duplicate.' + 'png'
      fs.copyFileSync(originalPath, duplicatePath)
      this.datacard.photoCollectDuplicatePath = duplicatePath;
      console.log('copia guardada')
      return duplicatePath;
    } catch (error) {
      return error
    }
  }
  saveFile(photoCollect, photocollectsFolderPath) {
    var fileName = photoCollect.name
    var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    var originalPath = photocollectsFolderPath + 'original/' + 'original.' + fileExtension
    try {
      fs.copyFileSync(photoCollect.path, originalPath)
      this.datacard.photoCollectPath = originalPath;
      console.log('archivo guardado')
      return originalPath;
    } catch (error) {
      return error
    }

  }
}
export default datacardController;