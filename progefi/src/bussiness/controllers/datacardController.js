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

      //read image file with jimp library
      var photoCollectFile = await jimp.read(photoCollect.path)
      var fileExtension = photoCollectFile.getExtension()

      //verify if image file is supported
      if ((fileExtension == 'jpeg') || (fileExtension == 'png') || (fileExtension == 'bmp') || (fileExtension == 'tiff')) {

        //save original file
        this.saveFile(photoCollect, photocollectsFolderPath, fileExtension)

        //console.log('archivo jimp: ' + photoCollectFile)
        var duplicatePath = this.saveDuplicatedFile(photoCollectFile, photocollectsFolderPath)
        //console.log('duplicate path: ' + duplicatePath)

        return duplicatePath;
      } else {
        console.log('formato no soportado')
        return 'not-supported-format'
      }
    } catch (error) {
      return 'not-supported-format'
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
  saveFile(photoCollect, photocollectsFolderPath, imageExtension) {

    var originalPath = photocollectsFolderPath + 'original/' + 'original.' + imageExtension
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