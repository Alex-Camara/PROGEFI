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
      //save original file
      var originalPath = this.saveFile(photoCollect, photocollectsFolderPath)

      //save a duplicate to avoid altering the original file
      //console.log('leyendo archivo con jimp')
      //console.log('ruta al archivo original: ' + originalPath)
      var photoCollectFile = await jimp.read(originalPath)
      //console.log('archivo jimp: ' + photoCollectFile)
      var duplicatePath = this.saveDuplicatedFile(photoCollectFile, photocollectsFolderPath)
      //console.log('duplicate path: ' + duplicatePath)
      var fileExtension = photoCollectFile.getExtension()

      //verify if image file is supported
      if ((fileExtension == 'jpeg') || (fileExtension == 'png') || (fileExtension == 'bmp') || (fileExtension == 'tiff')) {
        return duplicatePath;
      } else {
        return 'not supported format'
      }
    } catch (error) {
      return error
    }
  }
  async saveDuplicatedFile(photoCollectFile, photocollectsFolderPath) {
    try {
      var duplicatePath = photocollectsFolderPath + 'duplicate/' + 'duplicate.' + 'png'
      //console.log('entró a saveduplicate, ruta duplicada : ' + photoCollectFile)

      await photoCollectFile.write(duplicatePath)
      //console.log('copio archivo : ')

      //assign attribute to datacard object
      this.datacard.setPhotoCollectDuplicatePath(duplicatePath);
      //console.log('duplicada guardada')
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

      //assign attribute to datacard object
      this.datacard.setPhotoCollectPath(originalPath);
      console.log('imagen guardada')
      return originalPath;
    } catch (error) {
      return error
    }
  }
  getImageMetadata() {
    var metadata = this.extractMetadata().then(result => {
      var device = result.image.Make;
      var model = result.image.Model;
      var collectDate = result.exif.CreateDate;
      var latitude = result.gps.GPSLatitude;
      var altitude = result.gps.GPSAltitude;
      var longitude = result.gps.GPSLongitude;

      this.datacard.setMetadata(device, model, latitude, altitude, longitude, collectDate);
      return this.datacard
    })
    return metadata
  }
  extractMetadata() {
    var exifImage = require('exif').ExifImage;
    var path = this.datacard.getPhotoCollectPath()
    return new Promise(function (resolve, reject) {

      new exifImage({
        image: path
      }, function (error, exifData) {
        if (!error) {
          resolve(exifData)
        } else {
          reject(error)
        }
      });
    })
  }
}
export default datacardController;