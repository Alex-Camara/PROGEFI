'use strict'

import 'regenerator-runtime/runtime'
import jimp from 'jimp'
const path = require('path')
const fs = require('fs')
import Datacard from '../models/Datacard.js'
import DatacardDao from '../dao/DatacardDao.js'

class DatacardHandler {
  constructor () {
    this.datacard = new Datacard()
    this.datacardDao = new DatacardDao()
    this.imageFormat = null
    this.folderPathName = null
  }
  async savePhotoCollect (photoCollect) {
    const sharp = require('sharp')
    /*var datacardsFolderPath =
      path.resolve('.') + '/src/persistence/resources/datacards/'*/
    var datacardsFolderPath =
      path.resolve('.') + '/src/bussiness/photocollects/'

    // sharp(photoCollect.filePath).toFile('output.png', function (err) {})
    const image = sharp(photoCollect.filePath)
    let metadata = await image.metadata()
    let imageFormat = metadata.format
    this.imageFormat = imageFormat

    try {
      //read image file with jimp library
      //var photoCollectFile = await jimp.read(photoCollect.filePath)
      //var fileExtension = photoCollectFile.getExtension()

      //verify if image file is supported
      if (
        imageFormat == 'jpeg' ||
        imageFormat == 'png' ||
        imageFormat == 'bmp' ||
        imageFormat == 'tiff'
      ) {
        //datacardsFolderPath = this.createFolder(datacardsFolderPath)

        //datacardsFolderPath = datacardsFolderPath + folderName
        console.log('folderName: ' + datacardsFolderPath)
        //save original file
        await this.deleteFolderContent(datacardsFolderPath)
        let originalPath = this.saveFile(
          photoCollect.filePath,
          datacardsFolderPath,
          imageFormat
        )
        let duplicatePath = this.saveDuplicatedFile(image, datacardsFolderPath)
        console.log('path duplicado: ' + duplicatePath)
        //this.deleteDuplicates(photocollectsFolderPath)

        //let duplicatePath = null
        //console.log('archivo jimp: ' + photoCollectFile)
        /*var duplicatePath = this.saveDuplicatedFile(
          photoCollectFile,
          photocollectsFolderPath
        )*/
        //console.log('duplicate path: ' + duplicatePath)

        return duplicatePath
      } else {
        console.log('formato no soportado')
        return 'not-supported-format'
      }
    } catch (error) {
      return 'not-supported-format'
    }
  }
  createFolder (datacardsFolderPath) {
    this.folderPathName =
      '/resources/datacards/' + 'datacard_' + new Date().getTime()
    let folderName = datacardsFolderPath + 'datacard_' + new Date().getTime()
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
    return folderName
  }
  saveFile (filePath, datacardsFolderPath, imageFormat) {
    var originalPath = datacardsFolderPath + '/original.' + imageFormat
    try {
      fs.copyFileSync(filePath, originalPath)

      //assign attribute to datacard object
      this.datacard.setPhotoCollectPath(originalPath)
      return originalPath
    } catch (error) {
      return error
    }
  }
  async saveDuplicatedFile (image, photocollectsFolderPath) {
    try {
      var duplicatePath =
        photocollectsFolderPath + '/duplicate_' + +new Date().getTime() + '.png'

      //await image.webp({ lossless: true, quality: 100 }).rotate().toFile(duplicatePath)
      await image
        .rotate()
        .png()
        .toFile(duplicatePath)

      //assign attribute to datacard object
      this.datacard.setPhotoCollectDuplicatePath(duplicatePath)

      return duplicatePath
    } catch (error) {
      return error
    }
  }
  deleteFolderContent (photocollectsFolderPath) {
    return new Promise((resolve, reject) => {
      try {
        var directory = photocollectsFolderPath
        fs.readdir(directory, (err, files) => {
          if (err) reject(err)
          for (let i = 0; i < files.length; i++) {
            const element = files[i]
            fs.unlinkSync(directory + '/' + element)
          }
          resolve()
        })
      } catch (err) {
        reject(err)
      }
    })
  }
  getImageMetadata () {
    var datacardWithMetadata = this.extractMetadata()
      .then(result => {
        //obtener y darle formato a la fecha
        var fullCollectDate = result.exif.CreateDate
        var fullSplitCollectDate = this.formatDate(fullCollectDate)
        var longitude = null
        var latitude = null
        var altitude = null

        if (
          (result.gps.hasOwnProperty('GPSLongitudeRef') &&
            result.gps.hasOwnProperty('GPSLatitudeRef')) ||
          result.gps.hasOwnProperty('GPSAltitudeRef')
        ) {
          //obtener y darle formato a la latitud
          var longitudeReference = result.gps.GPSLongitudeRef
          var DMSLongitude = result.gps.GPSLongitude
          var longitude = this.convertGPSCoordinatesToDecimals(
            DMSLongitude,
            longitudeReference
          )

          //obtener y darle formato a la longitud
          var latitudeReference = result.gps.GPSLatitudeRef
          var DMSLatitude = result.gps.GPSLatitude
          var latitude = this.convertGPSCoordinatesToDecimals(
            DMSLatitude,
            latitudeReference
          )

          var altitude = result.gps.GPSAltitude.toFixed(6)
        }

        //obtener los demas parametros
        var collectDate = fullSplitCollectDate[0]
        var collectHour = fullSplitCollectDate[1]
        var device = result.image.Make
        var model = result.image.Model

        this.datacard.setMetadata(
          device,
          model,
          latitude,
          altitude,
          longitude,
          collectDate,
          collectDate + ' ' + collectHour
        )
        return this.datacard
      })
      .catch(error => {
        console.log(error)
        throw error
      })
    return datacardWithMetadata
  }
  extractMetadata () {
    //se usa la biblioteca exif para extraer los metadatos de la fotocolecta
    var exifImage = require('exif').ExifImage
    var path = this.datacard.getPhotoCollectPath()
    return new Promise(function (resolve, reject) {
      new exifImage(
        {
          image: path
        },
        function (error, exifData) {
          if (!error) {
            console.log('metadatos')
            console.info(exifData)
            resolve(exifData)
          } else {
            console.log('error en extracción de metadatos ' + error)
            reject(error)
          }
        }
      )
    })
  }
  formatDate (fullCollectDate) {
    fullCollectDate = fullCollectDate.split(' ', 2)
    fullCollectDate[0] = fullCollectDate[0].replace(/:/g, '-')
    return fullCollectDate
  }
  convertGPSCoordinatesToDecimals (DMSCoordinate, reference) {
    var degrees = DMSCoordinate[0]
    var minutes = DMSCoordinate[1]
    var seconds = DMSCoordinate[2]

    var decimalCoordinate = degrees + minutes / 60 + seconds / 3600
    decimalCoordinate = decimalCoordinate.toFixed(6)

    if (reference == 'W' || reference == 'S') {
      return -decimalCoordinate
    } else {
      return decimalCoordinate
    }
  }
  base64Decode (base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64')
    // write buffer to file
    try {
      fs.writeFileSync(file, bitmap)
      console.log('******** File created from base64 encoded string ********')
    } catch (error) {
      console.log('ERROR EN GUARDAR LA DATACARD: ' + error)
    }
  }
  async createDatacard (datacard, result) {
    var datacardsFolderPath =
      path.resolve('.') + '/src/persistence/resources/datacards/'
    datacardsFolderPath = this.createFolder(datacardsFolderPath)

    let filePath = await this.saveFile(
      this.datacard.photoCollectPath,
      datacardsFolderPath,
      this.imageFormat
    )
    console.log(filePath)

    let base64String = datacard.base64 // Not a real image
    // Remove header
    let base64Image = base64String.split(';base64,').pop()

    let datacardPath = datacardsFolderPath + '/datacard.png'

    this.base64Decode(base64Image, datacardPath)

    datacard.datacardPath = datacardsFolderPath
    let createdDatacard = await this.datacardDao.createDatacard(datacard)
    result(createdDatacard)
  }
}
export default DatacardHandler
