'use strict'

import 'regenerator-runtime/runtime'
const path = require('path')
const fs = require('fs')
import Datacard from '../models/Datacard.js'
import DatacardDao from '../../persistence/dao/DatacardDao'
import ClimateTypeDao from '../../persistence/dao/ClimateTypeDao'
import VegetationTypeDao from '../../persistence/dao/VegetationTypeDao'
import CollectorDao from '../../persistence/dao/CollectorDao'
import CollectionDao from '../../persistence/dao/CollectionDao'
import CatalogueDao from '../../persistence/dao/CatalogueDao'
import CuratorDao from '../../persistence/dao/CuratorDao'
import DeviceDao from '../../persistence/dao/DeviceDao'
import ProjectDao from '../../persistence/dao/ProjectDao'
import SexDao from '../../persistence/dao/SexDao'
import LifeStageDao from '../../persistence/dao/LifeStageDao'

class DatacardHandler {
  constructor() {
    this.datacard = new Datacard()
    this.datacardDao = new DatacardDao()
    this.climateTypeDao = new ClimateTypeDao()
    this.vegetationTypeDao = new VegetationTypeDao()
    this.catalogueDao = new CatalogueDao()
    this.collectionDao = new CollectionDao()
    this.curatorDao = new CuratorDao()
    this.collectorDao = new CollectorDao()
    this.deviceDao = new DeviceDao()
    this.projectDao = new ProjectDao()
    this.lifeStageDao = new LifeStageDao()
    this.sexDao = new SexDao()

    this.imageFormat = null
    this.folderPathName = null
  }
  //Método usando durante la creación de la fotocolecta, se guarda la foto original el formato 
  //original así como un duplicado en png para su manipulación.
  async savePhotoCollect(photoCollect) {
    const sharp = require('sharp')
    var datacardsFolderPath =
      path.resolve('.') + '/src/bussiness/photocollects/'

    const image = sharp(photoCollect.filePath)
    let metadata = await image.metadata()
    let imageFormat = metadata.format
    this.imageFormat = imageFormat

    try {
      //verify if image file is supported
      if (
        imageFormat == 'jpeg' ||
        imageFormat == 'png' ||
        imageFormat == 'bmp' ||
        imageFormat == 'tiff'
      ) {
        //save original file
        await this.deleteFolderContent(datacardsFolderPath)
        let originalPath = this.saveFile(
          photoCollect.filePath,
          datacardsFolderPath,
          imageFormat
        )
        let duplicatePath = this.saveDuplicatedFile(image, datacardsFolderPath)
        return duplicatePath
      } else {
        console.log('formato no soportado')
        return 'not-supported-format'
      }
    } catch (error) {
      return 'not-supported-format'
    }
  }
  createFolder(datacardsFolderPath) {
    this.folderPathName =
      '/resources/datacards/' + 'datacard_' + new Date().getTime()
    let folderName = datacardsFolderPath + 'datacard_' + new Date().getTime()
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
    return folderName
  }
  saveFile(filePath, datacardsFolderPath, imageFormat) {
    // console.info(filePath)
    var originalPath = datacardsFolderPath + '/original.' + 'png'
    try {
      fs.copyFileSync(filePath, originalPath)

      //assign attribute to datacard object
      this.datacard.setPhotoCollectPath(originalPath)
      return originalPath
    } catch (error) {
      return error
    }
  }

  async saveDuplicatedFile(image, photocollectsFolderPath) {
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
  deleteFolderContent(photocollectsFolderPath) {
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
  formatDate(fullCollectDate) {
    fullCollectDate = fullCollectDate.split(' ', 2)
    fullCollectDate[0] = fullCollectDate[0].replace(/:/g, '-')
    return fullCollectDate
  }
  convertGPSCoordinatesToDecimals(DMSCoordinate, reference) {
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
  base64Decode(base64str, file) {
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
  async createDatacard(datacard, result) {
    var datacardsFolderPath =
      path.resolve('.') + '/src/persistence/resources/datacards/'
    datacardsFolderPath = this.createFolder(datacardsFolderPath)
    // console.log('saving datacard')
    // console.info(datacard)

    let filePath = await this.saveFile(
      datacard.photocollectPath,
      datacardsFolderPath,
      this.imageFormat
    )
    // console.log(filePath)

    if (datacard.validated) {
      let base64String = datacard.base64 // Not a real image
      // Remove header
      let base64Image = base64String.split(';base64,').pop()

      let datacardPath = datacardsFolderPath + '/datacard.png'

      this.base64Decode(base64Image, datacardPath)
    }

    datacard.datacardPath = datacardsFolderPath
    let createdDatacard = await this.datacardDao.createDatacard(datacard)
    result(createdDatacard)
  }
  getThumbnails(datacard) {
    return new Promise(async (resolve) => {
      const sharp = require('sharp')
      // console.info(datacards[0])
      let image = sharp(datacard.datacardPath + "/original.png")
        .resize({ height: 50 })
        .toBuffer()
        .then(data => {
          // console.info(data)
          resolve(data)
        });
    });
  }
  async getDatacardsInCatalogue(catalogueId, searchString, result) {
    let datacards = await this.datacardDao.getDatacardsInCatalogue(catalogueId, searchString);

    for (let i = 0; i < datacards.length; i++) {
      let datacard = datacards[i];

      if (datacard.vegetationTypeId != null) {
        datacard.vegetationType = await this.vegetationTypeDao.getVegetationType(datacard.vegetationTypeId)
      }
      if (datacard.climateTypeId != null) {
        datacard.climateType = await this.climateTypeDao.getClimateType(datacard.climateTypeId)
      }
      if (datacard.lifeStageId != null) {
        datacard.lifeStage = await this.lifeStageDao.getLifeStage(datacard.lifeStageId)
      }
      if (datacard.sexId != null) {
        datacard.sex = await this.sexDao.getSex(datacard.sexId)
      }
      datacard.project = await this.projectDao.getProject(datacard.projectId)
      datacard.collector = await this.collectorDao.getCollector(datacard.collectorId)
      datacard.curators = await this.curatorDao.getDatacardCurators(datacard.id)
      datacard.model = await this.deviceDao.getModel(datacard.modelId)
      datacard.catalogue = await this.catalogueDao.getCatalogue(datacard.catalogueId)
      datacard.collection = await this.collectionDao.getCollection(datacard.catalogue.collectionId)

      datacards[i].thumbnail = await this.getThumbnails(datacards[i])
    }

    result(datacards);
  }
  async getAllDatacards(result) {
    let datacards = await this.datacardDao.getAllDatacards();

    for (let i = 0; i < datacards.length; i++) {
      let datacard = datacards[i];

      if (datacard.vegetationTypeId != null) {
        datacard.vegetationType = await this.vegetationTypeDao.getVegetationType(datacard.vegetationTypeId)
      }
      if (datacard.climateTypeId != null) {
        datacard.climateType = await this.climateTypeDao.getClimateType(datacard.climateTypeId)
      }
      if (datacard.lifeStageId != null) {
        datacard.lifeStage = await this.lifeStageDao.getLifeStage(datacard.lifeStageId)
      }
      if (datacard.sexId != null) {
        datacard.sex = await this.sexDao.getSex(datacard.sexId)
      }
      datacard.project = await this.projectDao.getProject(datacard.projectId)
      datacard.collector = await this.collectorDao.getCollector(datacard.collectorId)
      datacard.curators = await this.curatorDao.getDatacardCurators(datacard.id)
      datacard.model = await this.deviceDao.getModel(datacard.modelId)
      datacard.catalogue = await this.catalogueDao.getCatalogue(datacard.catalogueId)
      datacard.collection = await this.collectionDao.getCollection(datacard.catalogue.collectionId)

      datacards[i].thumbnail = await this.getThumbnails(datacards[i])
    }

    result(datacards);
  }
  async updateDatacard(datacard, result) {

    //Cuando la fotocolecta no haya cambiado, no tiene sentdio volver a guardarla
    if (datacard.photocollectPath != "do-not-save") {
      let filePath = await this.saveFile(
        datacard.photocollectPath,
        datacard.datacardPath,
        this.imageFormat
      )
      // console.log(filePath)
    }

    //Solo si la ficha se va a validar, se guarda la ficha 
    if (datacard.validated) {
      let base64String = datacard.base64 // Not a real image
      // Remove header
      let base64Image = base64String.split(';base64,').pop()

      let datacardPath = datacard.datacardPath + '/datacard.png'

      this.base64Decode(base64Image, datacardPath)
    }

    let updatedDatacard = await this.datacardDao.updateDatacard(datacard);
    result(updatedDatacard);
  }
  getImageMetadata() {
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
  extractMetadata() {
    //se usa la biblioteca exif para extraer los metadatos de la fotocolecta
    var exifImage = require('exif').ExifImage
    var path = this.datacard.getPhotoCollectPath()
    return new Promise(function (resolve, reject) {
      new exifImage({
        image: path
      },
        function (error, exifData) {
          if (!error) {
            // console.log('metadatos')
            // console.info(exifData)
            resolve(exifData)
          } else {
            console.log('error en extracción de metadatos ' + error)
            reject(error)
          }
        }
      )
    })
  }
}
export default DatacardHandler