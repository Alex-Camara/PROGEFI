"use strict";

import "regenerator-runtime/runtime";
import jimp from 'jimp';
const path = require("path");
const fs = require('fs');
import Datacard from '../models/Datacard.js';

class DatacardHandler {
  constructor() {
    this.datacard = new Datacard();
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
    var datacardWithMetadata = this.extractMetadata().then(result => {
      //obtener y darle formato a la fecha
      var fullCollectDate = result.exif.CreateDate;
      var fullSplitCollectDate = this.formatDate(fullCollectDate);

      //obtener y darle formato a la latitud
      var longitudeReference = result.gps.GPSLongitudeRef;
      var DMSLongitude = result.gps.GPSLongitude;
      var longitude = this.convertGPSCoordinatesToDecimals(DMSLongitude, longitudeReference)

      //obtener y darle formato a la longitud
      var latitudeReference = result.gps.GPSLatitudeRef;
      var DMSLatitude = result.gps.GPSLatitude;
      var latitude = this.convertGPSCoordinatesToDecimals(DMSLatitude, latitudeReference)

      //obtener los demas parametros
      var collectDate = fullSplitCollectDate[0]
      var collectHour = fullSplitCollectDate[1]
      var device = result.image.Make;
      var model = result.image.Model;
      var altitude = result.gps.GPSAltitude;

      this.datacard.setMetadata(device, model, latitude, altitude, longitude, collectDate, collectDate + ' ' + collectHour);
      return this.datacard
    }).catch(error =>{
      throw error;
    })
    return datacardWithMetadata
  }
  extractMetadata() {
    //se usa la biblioteca exif para extraer los metadatos de la fotocolecta
    var exifImage = require('exif').ExifImage;
    var path = this.datacard.getPhotoCollectPath()
    return new Promise(function (resolve, reject) {

      new exifImage({
        image: path
      }, function (error, exifData) {
        if (!error) {
          console.log('metadatos')
          console.info(exifData)
          resolve(exifData)
        } else {
          reject(error)
        }
      });
    })
  }
  formatDate(fullCollectDate) {
    fullCollectDate = fullCollectDate.split(' ', 2);
    fullCollectDate[0] = fullCollectDate[0].replace(/:/g, '/');
    return fullCollectDate;
  }
  convertGPSCoordinatesToDecimals(DMSCoordinate, reference) {
    var degrees = DMSCoordinate[0];
    var minutes = DMSCoordinate[1];
    var seconds = DMSCoordinate[2];
    
    var decimalCoordinate = degrees + (minutes / 60) + (seconds / 3600);

    if(reference == 'W' || reference == 'S'){
      return -(decimalCoordinate)
    } else{
      return decimalCoordinate;
    }
  }
}
export default DatacardHandler;