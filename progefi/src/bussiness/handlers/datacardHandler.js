"use strict";

import "regenerator-runtime/runtime";
import * as bmp from "@vingle/bmp-js";
import Jimp from "jimp";
const path = require("path");
const fs = require("fs");
import Datacard from "../models/Datacard.js";
import DatacardDao from "../../persistence/dao/DatacardDao";

class DatacardHandler {
  constructor() {
    this.datacard = new Datacard();
    this.datacardDao = new DatacardDao();

    this.imageFormat = null;
    this.folderPathName = null;
  }
  //Método usando durante la creación de la fotocolecta, se guarda la foto original el formato
  //original así como un duplicado en png para su manipulación.
  async savePhotoCollect(photoCollect) {
    const sharp = require("sharp");
    var datacardsFolderPath =
      path.resolve(".") + "/src/bussiness/photocollects/";

    const image = sharp(photoCollect.filePath);
    let metadata = await image.metadata();
    let imageFormat = metadata.format;
    this.imageFormat = imageFormat;

    try {
      //verify if image file is supported
      if (
        imageFormat == "jpeg" ||
        imageFormat == "png" ||
        imageFormat == "bmp" ||
        imageFormat == "tiff"
      ) {
        //save original file
        await this.deleteFolderContent(datacardsFolderPath);
        let originalPath = this.saveFile(
          photoCollect.filePath,
          datacardsFolderPath,
          imageFormat
        );
        let duplicatePath = this.saveDuplicatedFile(image, datacardsFolderPath);
        return duplicatePath;
      } else {
        console.log("formato no soportado");
        return "not-supported-format";
      }
    } catch (error) {
      console.info(error);
      return "not-supported-format";
    }
  }
  createFolder(datacardsFolderPath) {
    this.folderPathName =
      "/resources/datacards/" + "datacard_" + new Date().getTime();
    let folderName = datacardsFolderPath + "datacard_" + new Date().getTime();
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    return folderName;
  }
  saveFile(filePath, datacardsFolderPath, imageFormat) {
    // console.info(filePath)
    var originalPath = datacardsFolderPath + "/original." + "png";
    try {
      fs.copyFileSync(filePath, originalPath);

      //assign attribute to datacard object
      this.datacard.setPhotoCollectPath(originalPath);
      return originalPath;
    } catch (error) {
      return error;
    }
  }

  async saveDuplicatedFile(image, photocollectsFolderPath) {
    try {
      var duplicatePath =
        photocollectsFolderPath +
        "/duplicate_" +
        +new Date().getTime() +
        ".png";

      //await image.webp({ lossless: true, quality: 100 }).rotate().toFile(duplicatePath)
      await image
        .rotate()
        .png()
        .toFile(duplicatePath);

      //assign attribute to datacard object
      this.datacard.setPhotoCollectDuplicatePath(duplicatePath);

      return duplicatePath;
    } catch (error) {
      return error;
    }
  }
  deleteFolderContent(photocollectsFolderPath) {
    return new Promise((resolve, reject) => {
      try {
        var directory = photocollectsFolderPath;
        console.info(directory);
        fs.readdir(directory, (err, files) => {
          if (err) reject(err);
          for (let i = 0; i < files.length; i++) {
            const element = files[i];
            fs.unlinkSync(directory + "/" + element);
          }
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  formatDate(fullCollectDate) {
    fullCollectDate = fullCollectDate.split(" ", 2);
    fullCollectDate[0] = fullCollectDate[0].replace(/:/g, "-");
    return fullCollectDate;
  }
  convertGPSCoordinatesToDecimals(DMSCoordinate, reference) {
    var degrees = DMSCoordinate[0];
    var minutes = DMSCoordinate[1];
    var seconds = DMSCoordinate[2];

    var decimalCoordinate = degrees + minutes / 60 + seconds / 3600;
    decimalCoordinate = decimalCoordinate.toFixed(6);

    if (reference == "W" || reference == "S") {
      return -decimalCoordinate;
    } else {
      return decimalCoordinate;
    }
  }
  base64Decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, "base64");
    // write buffer to file
    try {
      fs.writeFileSync(file, bitmap, {encoding: "base64"});
      console.log("******** File created from base64 encoded string ********");
    } catch (error) {
      console.log("ERROR EN GUARDAR LA DATACARD: " + error);
    }
  }
  async createDatacard(datacard, result) {
    var datacardsFolderPath =
      path.resolve(".") + "/src/persistence/resources/datacards/";
    datacardsFolderPath = this.createFolder(datacardsFolderPath);
    // console.log('saving datacard')
    // console.info(datacard)

    let filePath = await this.saveFile(
      datacard.photocollectPath,
      datacardsFolderPath,
      this.imageFormat
    );
    // console.log(filePath)

    if (datacard.validated) {
      let base64String = datacard.base64; // Not a real image
      // Remove header
      let base64Image = base64String.split(";base64,").pop();

      let datacardPath = datacardsFolderPath + "/datacard.png";

      this.base64Decode(base64Image, datacardPath);
    }

    datacard.datacardPath = datacardsFolderPath;
    let createdDatacard = await this.datacardDao.createDatacard(datacard);
    result(createdDatacard);
  }
  getThumbnails(datacard) {
    return new Promise(async resolve => {
      const sharp = require("sharp");
      // console.info(datacards[0])
      // console.log('datacardPath: ' + datacard.datacardPath)
      sharp(datacard.datacardPath + "/original.png")
        .resize({ height: 50 })
        .toBuffer()
        .then(data => {
          // console.info(data)
          resolve(data);
        });
    });
  }
  async getDatacardsInCatalogue(catalogueId, searchString) {
    try {
      let datacards = await this.datacardDao.getDatacardsInCatalogue(
        catalogueId,
        searchString
      );
      // for (let i = 0; i < datacards.length; i++) {
      //   datacards[i].thumbnail = await this.getThumbnails(datacards[i])
      // }
      return datacards;
    } catch (error) {
      return error;
    }
  }
  async getAllDatacards(result) {
    let datacards = await this.datacardDao.getAllDatacards();
    // for (let i = 0; i < datacards.length; i++) {
    //   datacards[i].thumbnail = await this.getThumbnails(datacards[i])
    // }
    result(datacards);
  }
  async getSortedDatacards(catalogueId, field, order, limit, offset, result) {
    let datacards = await this.datacardDao.getSortedDatacards(
      catalogueId,
      field,
      order,
      limit,
      offset
    );
    // for (let i = 0; i < datacards.length; i++) {
    //   datacards[i].thumbnail = await this.getThumbnails(datacards[i])
    // }
    result(datacards);
  }
  async deleteDatacard(datacardId, result) {
    let deletedDatacard = await this.datacardDao.deleteDatacard(datacardId);
    let deletedDatacardPath = deletedDatacard.datacardPath;
    await this.deleteFolderContent(deletedDatacardPath);
    fs.rmdirSync(deletedDatacardPath);
    result(deletedDatacardPath);
  }
  async updateDatacard(datacard, result) {
    //Cuando la fotocolecta no haya cambiado, no tiene sentdio volver a guardarla
    if (datacard.photocollectPath != "do-not-save") {
      let filePath = await this.saveFile(
        datacard.photocollectPath,
        datacard.datacardPath,
        this.imageFormat
      );
      // console.log(filePath)
    }
    //Solo si la ficha se va a validar, se guarda la ficha
    if (datacard.validated) {
      let base64String = datacard.base64; // Not a real image
      // Remove header
      let base64Image = base64String.split(";base64,").pop();

      let datacardPath = datacard.datacardPath + "/datacard.png";

      this.base64Decode(base64Image, datacardPath);
    }

    let updatedDatacard = await this.datacardDao.updateDatacard(datacard);
    result(updatedDatacard);
  }
  getImageMetadata() {
    var datacardWithMetadata = this.extractMetadata()
      .then(result => {
        //obtener y darle formato a la fecha
        var fullCollectDate = result.exif.CreateDate;
        var fullSplitCollectDate = this.formatDate(fullCollectDate);
        var longitude = null;
        var latitude = null;
        var altitude = null;

        if (
          (result.gps.hasOwnProperty("GPSLongitudeRef") &&
            result.gps.hasOwnProperty("GPSLatitudeRef")) ||
          result.gps.hasOwnProperty("GPSAltitudeRef")
        ) {
          //obtener y darle formato a la latitud
          var longitudeReference = result.gps.GPSLongitudeRef;
          var DMSLongitude = result.gps.GPSLongitude;
          var longitude = this.convertGPSCoordinatesToDecimals(
            DMSLongitude,
            longitudeReference
          );

          //obtener y darle formato a la longitud
          var latitudeReference = result.gps.GPSLatitudeRef;
          var DMSLatitude = result.gps.GPSLatitude;
          var latitude = this.convertGPSCoordinatesToDecimals(
            DMSLatitude,
            latitudeReference
          );

          var altitude = result.gps.GPSAltitude.toFixed(6);
        }

        //obtener los demas parametros
        var collectDate = fullSplitCollectDate[0];
        var collectHour = fullSplitCollectDate[1];
        var device = result.image.Make;
        var model = result.image.Model;

        this.datacard.setMetadata(
          device,
          model,
          latitude,
          altitude,
          longitude,
          collectDate,
          collectDate + " " + collectHour
        );
        console.info(result);
        return this.datacard;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
    return datacardWithMetadata;
  }
  extractMetadata() {
    //se usa la biblioteca exif para extraer los metadatos de la fotocolecta
    var exifImage = require("exif").ExifImage;
    var path = this.datacard.getPhotoCollectPath();
    return new Promise(function(resolve, reject) {
      new exifImage(
        {
          image: path
        },
        function(error, exifData) {
          if (!error) {
            // console.log('metadatos')
            // console.info(exifData)
            resolve(exifData);
          } else {
            console.log("error en extracción de metadatos " + error);
            reject(error);
          }
        }
      );
    });
  }
  generateCSVFile(datacards, destinationFileName) {
    return new Promise(async function(resolve, reject) {
      const {
        Parser,
        transforms: { unwind }
      } = require("json2csv");

      const fields = [
        {
          label: "ID",
          value: "id"
        },
        {
          label: "Species",
          value: "collect.specimen.species.scientificName"
        },
        {
          label: "Collection code",
          value: "catalogue.collection.code"
        },
        {
          label: "Catalogue code",
          value: "catalogue.code"
        },
        {
          label: "Code",
          value: "code"
        },
        {
          label: "Collect date",
          value: "collect.collectDate"
        },
        {
          label: "Creation date",
          value: "creationDate"
        },
        {
          label: "Locality",
          value: "collect.locality"
        },
        {
          label: "Municipality",
          value: "collect.municipality"
        },
        {
          label: "Country State",
          value: "collect.countryState"
        },
        {
          label: "Country",
          value: "collect.country"
        },
        {
          label: "Latitude",
          value: "collect.latitude"
        },
        {
          label: "Longitude",
          value: "collect.longitude"
        },
        {
          label: "Altitude",
          value: "collect.altitude"
        },
        {
          label: "Collector",
          value: "collect.collector.name"
        },
        {
          label: "Collector Code",
          value: "collectorCode"
        },
        {
          label: "Climate Type",
          value: "collect.climateType.code"
        },
        {
          label: "Vegetation Type",
          value: "collect.vegetationType.name"
        },
        {
          label: "Sex",
          value: "collect.specimen.sex.name"
        },
        {
          label: "Life Stage",
          value: "collect.specimen.lifeStage.name"
        },
        {
          label: "Observations",
          value: "collect.specimen.observations"
        },
        {
          label: "Project",
          value: "project.name"
        },
        {
          label: "Validated",
          value: "validated"
        },
        {
          label: "Curator",
          value: "curators.name"
        }
      ];

      const transforms = [unwind({ paths: ["curators"] })];

      const json2csvParser = new Parser({ fields, transforms, withBOM: true });
      const csv = json2csvParser.parse(datacards);
      console.info(csv);
      fs.writeFileSync(destinationFileName, csv, "utf8");
      resolve();
    });
  }
  async decode(base64){
    let self = this;
    return new Promise(async function(resolve, reject) {
      const steggy = require('steggy');
      base64 = base64.split(';base64,').pop();
      // var bitmap = new Buffer(base64, "base64");
      var tempPath =
          path.resolve(".") + "/src/bussiness/temp.png";
      self.base64Decode(base64, tempPath);
      const image = fs.readFileSync(tempPath)

      try{
      let revealed = steggy.reveal()(image, "utf8");
      fs.unlinkSync(tempPath);
        resolve(revealed);
      } catch (e) {
        fs.unlinkSync(tempPath);
        resolve("DECODE ERROR");
      }
    });
  }
  async generatePNGFile(datacards, destinationDirectory, sharp){
    const steggy = require('steggy');

    for (let i = 0; i < datacards.length; i++) {
      let destinationFileName =
          destinationDirectory + "/" + datacards[i].code + ".png";
      let original = fs.readFileSync(datacards[i].datacardPath + "/datacard.png");
      let code = datacards[i].code;
      let collector = datacards[i].collect.collector.name;
      let creator = "";
      let curator = datacards[i].curators[i].name;
      let collectDate = datacards[i].collect.collectDate;
      let creationDate = datacards[i].creationDate;

      let message = code + "," + collector + "," + creator + "," + curator + "," + collectDate + "," + creationDate;
      // let message = 'IIB-UV MAM0001f, Gerardo Contreras Vega, Christian Alejandro Delfín Alfonso, Christian Alejandro Delfín Alfonso, 27/12/19 17:45:00, 27/12/19 17:45:00';

      let concealed = await steggy.conceal()(original, message);
      fs.writeFileSync(destinationFileName, concealed)
    }
  }
  async export(datacards, format, destinationDirectory) {
    const sharp = require("sharp");

    switch (format) {
      case "JPEG": {
        return new Promise(async function(resolve, reject) {
          for (let i = 0; i < datacards.length; i++) {
            let destinationFileName =
              destinationDirectory + "/" + datacards[i].code;
            await sharp(datacards[i].datacardPath + "/datacard.png")
              .jpeg({
                quality: 100,
                chromaSubsampling: "4:4:4"
              })
              .toFile(destinationFileName + ".jpg");
          }
          resolve();
        });
      }
      case "PNG": {
        let self = this;
        return new Promise(async function(resolve, reject) {
          await self.generatePNGFile(datacards, destinationDirectory, sharp);
          resolve();
        });
      }
      case "TIFF": {
        return new Promise(async function(resolve, reject) {
          for (let i = 0; i < datacards.length; i++) {
            let destinationFileName =
              destinationDirectory + "/" + datacards[i].code;
            let data = await sharp(datacards[i].datacardPath + "/datacard.png")
              .tiff({
                quality: 100,
                compression: "lzw"
              })
              .toFile(destinationFileName + ".tiff");
          }
          resolve();
        });
      }
      case "BMP": {
        return new Promise(async function(resolve, reject) {
          for (let i = 0; i < datacards.length; i++) {
            let destinationFileName =
              destinationDirectory + "/" + datacards[i].code + ".bmp";

            Jimp.read(datacards[i].datacardPath + "/datacard.png")
              .then(datacard => {
                return datacard.write(destinationFileName);
              })
              .catch(err => {
                console.error(err);
              });
          }
          resolve();
        });
      }
      case "PDF": {
        return new Promise(async function(resolve, reject) {
          for (let i = 0; i < datacards.length; i++) {
            try {
              let destinationFileName =
                destinationDirectory + "/" + datacards[i].code + ".pdf";

              const PDFDocument = require("pdfkit");
              const doc = new PDFDocument({ layout: "landscape" });
              doc.pipe(fs.createWriteStream(destinationFileName)); // write to PDF

              doc.image(datacards[i].datacardPath + "/datacard.png", 0, 15, {
                width: 800,
                align: "center",
                valign: "center",
                margins: {
                  top: 20,
                  bottom: 20,
                  left: 20,
                  right: 20
                }
              });

              doc.end();
            } catch (e) {
              return e;
            }
          }
          resolve();
        });
      }
      case "CSV": {
        let self = this;
        return new Promise(async function(resolve, reject) {
          let destinationFileName =
            destinationDirectory + "/" + new Date().getTime() + ".csv";
          await self.generateCSVFile(datacards, destinationFileName);
          resolve();
        });
      }
    }

    //   resolve();
    // });
  }
}
export default DatacardHandler;
