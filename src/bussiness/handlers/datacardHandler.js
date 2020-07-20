"use strict";

import "regenerator-runtime/runtime";
import Jimp from "jimp";
import Datacard from "../models/Datacard.js";
import DatacardDao from "../../persistence/dao/DatacardDao";

const fs = require("fs");
const log = require("electron-log");
const electron = require("electron");
const sharp = require("sharp");

class DatacardHandler {
  constructor() {
    this.datacard = new Datacard();
    this.datacardDao = new DatacardDao();

    this.imageFormat = null;
    this.imageLoaded = false;
  }
  //Método usando durante la creación de la fotocolecta, se guarda la foto original el formato
  //original así como un duplicado en png para su manipulación.
  async savePhotoCollect(photoCollect) {
    let destinationFolder = electron.app.getPath("userData") + "/photocollects/";

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder)
    }

    const buf = fs.readFileSync(photoCollect.filePath);
    const image = sharp(buf)
    let metadata = await image.metadata();
    let imageFormat = metadata.format;
    this.imageFormat = imageFormat;

    try {
      //verify if image file is supported
      console.info(imageFormat)
      if (
        imageFormat === "jpeg" ||
        imageFormat === "jpg" ||
        imageFormat === "png" ||
        imageFormat === "bmp" ||
          imageFormat === "webp"
      ) {
        //save original file
        await this.deleteFolderContent(destinationFolder);
        return this.saveDuplicatedFile(
          photoCollect.filePath,
            destinationFolder + "" + new Date().getTime() + "." + imageFormat
        );
      } else {
        console.log("formato no soportado");
        return "not-supported-format";
      }
    } catch (error) {
      console.info(error);
      log.error(error)
      return "not-supported-format";
    }
  }
  createFolder(datacardsFolderPath) {
    let folderName = datacardsFolderPath + "datacard_" + new Date().getTime();
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    return folderName;
  }
  async saveDuplicatedFile(filePath, photocollectsFolderPath) {
    try {
      fs.copyFileSync(filePath, photocollectsFolderPath);
      //assign attribute to datacard object
      this.datacard.setPhotoCollectPath(photocollectsFolderPath);

      return photocollectsFolderPath;
    } catch (error) {
      return error;
    }
  }
  deleteFolderContent(photocollectsFolderPath) {
    return new Promise((resolve, reject) => {
      try {
        var directory = photocollectsFolderPath;
        if (!fs.existsSync(directory)) {
          fs.readdir(directory, (err, files) => {
            if (err) reject(err);
            for (let i = 0; i < files.length; i++) {
              const element = files[i];
              fs.unlinkSync(directory + "/" + element);
            }
            resolve();
          });
        } else{
          resolve();
        }
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

    if (reference === "W" || reference === "S") {
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
      fs.writeFileSync(file, bitmap, { encoding: "base64" });
    } catch (error) {
      console.log("ERROR EN GUARDAR LA DATACARD: " + error);
    }
  }
  async createDatacard(datacard, result) {
    let datacardsDestinationFolder = electron.app.getPath("userData") + "/datacards/";
    if (!fs.existsSync(datacardsDestinationFolder)) {
      fs.mkdirSync(datacardsDestinationFolder)
    }
    let photocollectsDestinationFolder = electron.app.getPath("userData") + "/photocollects/";

    datacardsDestinationFolder = this.createFolder(datacardsDestinationFolder);
    this.saveDuplicatedFile(
      datacard.photocollectPath,
        datacardsDestinationFolder + "/original." + datacard.collect.photocollectFormat
    );

    if (datacard.validated) {
      let base64String = datacard.base64; // Not a real image
      // Remove header
      let base64Image = base64String.split(";base64,").pop();
      let datacardPath = datacardsDestinationFolder + "/datacard.webp";
      this.base64Decode(base64Image, datacardPath);
    }
    this.updateCSVCatalogueFile(datacard)
      .then(async () => {
        datacard.datacardPath = datacardsDestinationFolder;
        let createdDatacard = await this.datacardDao.createDatacard(datacard);
        await this.deleteFolderContent(photocollectsDestinationFolder);
        result(createdDatacard);
      })
      .catch(() => {
        console.log("file error");
        result("file-error");
      });
  }
  async updateDatacard(datacard, result) {
    let photocollectsDestinationFolder = electron.app.getPath("userData") + "/photocollects/";
    //Cuando la fotocolecta no haya cambiado, no tiene sentdio volver a guardarla
    if (datacard.photocollectPath !== "do-not-save") {
      this.saveDuplicatedFile(
        datacard.photocollectPath,
        datacard.datacardPath +
          "/original." +
          datacard.collect.photocollectFormat
      );
      // console.log(filePath)
    }
    //Solo si la ficha se va a validar, se guarda la ficha
    if (datacard.validated) {
      let base64String = datacard.base64; // Not a real image
      // Remove header
      let base64Image = base64String.split(";base64,").pop();

      let datacardPath = datacard.datacardPath + "/datacard.webp";

      this.base64Decode(base64Image, datacardPath);
    }

    this.updateCSVCatalogueFile(datacard)
      .then(async () => {
        let updatedDatacard = await this.datacardDao.updateDatacard(datacard);
        await this.deleteFolderContent(photocollectsDestinationFolder);
        result(updatedDatacard);
      })
      .catch(() => {
        console.log("file error");
        result("file-error");
      });
  }
  getThumbnails(datacard) {
    return new Promise(async resolve => {
      sharp(
        datacard.datacardPath +
          "/original." +
          datacard.collect.photocollectFormat
      )
        .resize({ height: 50 })
        .toBuffer()
        .then(data => {
          // console.info(data)
          resolve(data);
        })
        .catch(() => {
          resolve("");
        });
    });
  }
  async getDatacardsInCatalogue(catalogueId, searchString) {
    try {
      let datacards = await this.datacardDao.getDatacardsInCatalogue(
        catalogueId,
        searchString
      );
      for (let i = 0; i < datacards.length; i++) {
        datacards[i].thumbnail = await this.getThumbnails(datacards[i]);
      }
      return datacards;
    } catch (error) {
      return error;
    }
  }
  async getDatacardsByCode(catalogueId, code, result) {
    // try {
    let datacards = await this.datacardDao.getByCode(catalogueId, code);
    for (let i = 0; i < datacards.length; i++) {
      datacards[i].thumbnail = await this.getThumbnails(datacards[i]);
    }
    result(datacards);
  }
  async getAllDatacards(result) {
    let datacards = await this.datacardDao.getAllDatacards();
    for (let i = 0; i < datacards.length; i++) {
      datacards[i].thumbnail = await this.getThumbnails(datacards[i]);
    }
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
    for (let i = 0; i < datacards.length; i++) {
      datacards[i].thumbnail = await this.getThumbnails(datacards[i]);
    }
    result(datacards);
  }
  async getFilteredDatacards(searchCritera, result) {
    let datacards = await this.datacardDao.getFiltered(searchCritera);
    for (let i = 0; i < datacards.length; i++) {
      datacards[i].thumbnail = await this.getThumbnails(datacards[i]);
    }
    result(datacards);
  }
  async deleteDatacard(datacardId, result) {
    let deletedDatacard = await this.datacardDao.deleteDatacard(datacardId);
    let deletedDatacardPath = deletedDatacard.datacardPath;
    await this.deleteFolderContent(deletedDatacardPath);
    fs.rmdirSync(deletedDatacardPath);
    result(deletedDatacardPath);
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
          longitude = this.convertGPSCoordinatesToDecimals(
            DMSLongitude,
            longitudeReference
          );
          //obtener y darle formato a la longitud
          var latitudeReference = result.gps.GPSLatitudeRef;
          var DMSLatitude = result.gps.GPSLatitude;
          latitude = this.convertGPSCoordinatesToDecimals(
            DMSLatitude,
            latitudeReference
          );

          altitude = result.gps.GPSAltitude.toFixed(6);
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
            resolve(exifData);
          } else {
            reject(error);
          }
        }
      );
    });
  }
  generateCSVFile(datacards, destinationFileName) {
    return new Promise(async function(resolve) {
      const { Parser } = require("json2csv");

      let fields = [
        "ID",
        "Especie",
        "Proyecto",
        "Código de colección",
        "Nombre de colección",
        "Instituto",
        "Código de catálogo",
        "Código de la ficha",
        "Fecha de colecta",
        "Fecha de creación",
        "Localidad",
        "Municipio",
        "Estado",
        "País",
        "Longitud",
        "Latitud",
        "Altitud",
        "Dispositvo",
        "Modelo",
        "Colector",
        "Código Colector",
        "Tipo de vegetación",
        "Tipo de clima",
        "Observaciones generales",
        "Creador de la ficha",
        "Curador"
      ];

      let data = [];

      for (let i = 0; i < datacards.length; i++) {
        let datacard = datacards[i];
        let newRow = {
          ID: datacard.id,
          Especie: datacard.collect.specimen.species.scientificName,
          Proyecto: datacard.collect.project.name,
          "Nombre de colección": datacard.catalogue.collection.name,
          Instituto: datacard.catalogue.collection.instituteName,
          "Código de colección": datacard.catalogue.collection.code,
          "Código de catálogo": datacard.catalogue.code,
          "Código de la ficha": datacard.code,
          "Fecha de colecta": datacard.collect.collectDate,
          "Fecha de creación": datacard.creationDate,
          Localidad: datacard.collect.locality,
          Municipio: datacard.collect.municipality,
          Estado: datacard.collect.countryState,
          País: datacard.collect.country,
          Longitud: datacard.collect.longitude,
          Latitud: datacard.collect.latitude,
          Altitud: datacard.collect.altitude,
          Dispositvo: datacard.collect.model.device.name,
          Modelo: datacard.collect.model.name,
          Colector: datacard.collect.collector.name,
          "Código Colector": datacard.collectorCode,
          "Tipo de vegetación": datacard.collect.vegetationType.name,
          "Tipo de clima": datacard.collect.climateType.code,
          "Observaciones generales": datacard.collect.specimen.observations,
          "Creador de la ficha":
            datacard.user.name + " " + datacard.user.lastName,
          Curador: datacard.curator.name
        };

        data.push(newRow);
      }

      const json2csvParser = new Parser({ fields, withBOM: true });
      const csv = json2csvParser.parse(data);
      fs.writeFileSync(destinationFileName, csv, "utf8");
      resolve();
    });
  }
  updateCSVCatalogueFile(datacard) {
    return new Promise(async (resolve, reject) => {
      if (!datacard.validated) {
        console.info("NO ENTRO A ACTUALIZAR CSV");
        resolve();
        return;
      }
      console.info("ENTRO A ACTUALIZAR CSV (flujo normal)");
      let fields = [
        "ID",
        "Especie",
        "Proyecto",
        "Código de colección",
        "Nombre de colección",
        "Instituto",
        "Código de catálogo",
        "Código de la ficha",
        "Fecha de colecta",
        "Fecha de creación",
        "Localidad",
        "Municipio",
        "Estado",
        "País",
        "Longitud",
        "Latitud",
        "Altitud",
        "Dispositvo",
        "Modelo",
        "Colector",
        "Código Colector",
        "Tipo de vegetación",
        "Tipo de clima",
        "Observaciones generales",
        "Creador de la ficha",
        "Curador"
      ];

      let data = {
        ID: datacard.id,
        Especie: datacard.collect.specimen.species.scientificName,
        Proyecto: datacard.collect.project.name,
        "Nombre de colección": datacard.catalogue.collection.name,
        Instituto: datacard.catalogue.collection.instituteName,
        "Código de colección": datacard.catalogue.collection.code,
        "Código de catálogo": datacard.catalogue.code,
        "Código de la ficha": datacard.code,
        "Fecha de colecta": datacard.collect.collectDate,
        "Fecha de creación": datacard.creationDate,
        Localidad: datacard.collect.locality,
        Municipio: datacard.collect.municipality,
        Estado: datacard.collect.countryState,
        País: datacard.collect.country,
        Longitud: datacard.collect.longitude,
        Latitud: datacard.collect.latitude,
        Altitud: datacard.collect.altitude,
        Dispositvo: datacard.collect.model.device.name,
        Modelo: datacard.collect.model.name,
        Colector: datacard.collect.collector.name,
        "Código Colector": datacard.collectorCode,
        "Tipo de vegetación": datacard.collect.vegetationType.name,
        "Tipo de clima": datacard.collect.climateType.code,
        "Observaciones generales": datacard.collect.specimen.observations,
        "Creador de la ficha":
          datacard.user.name + " " + datacard.user.lastName,
        "Curador": datacard.curator.name
      };

      let cataloguesFolderPath =
        datacard.catalogue.collection.cataloguesFolderPath +
        "/" +
        datacard.catalogue.name +
        ".csv";
      const { parse } = require("json2csv");

      try {
        let csv;
        if (!fs.existsSync(cataloguesFolderPath)) {
          csv = parse(data, { fields: fields, withBOM: true });
          fs.writeFileSync(cataloguesFolderPath, csv + "\n", "utf8");
        } else {
          csv = parse(data, { header: false, withBOM: true });
          fs.appendFileSync(cataloguesFolderPath, csv + "\n", "utf8");
        }
        resolve();
      } catch (error) {
        console.info(error);
        reject(error);
      }
    });
  }
  async decode(base64) {
    let self = this;
    return new Promise(async function(resolve) {
      const steggy = require("steggy");
      base64 = base64.split(";base64,").pop();
      // var bitmap = new Buffer(base64, "base64");
      let tempPath = electron.app.getPath("userData") + "/temp/";

      if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath)
      }

      let tempFilePath = tempPath + "temp.webp";
      self.base64Decode(base64, tempFilePath);
      const image = fs.readFileSync(tempFilePath);

      try {
        let revealed = steggy.reveal()(image, "utf8");
        fs.unlinkSync(tempFilePath);
        resolve(revealed);
      } catch (e) {
        fs.unlinkSync(tempFilePath);
        resolve("DECODE ERROR");
      }
    });
  }
  async generatePNGFile(datacards, destinationDirectory) {
    const steggy = require("steggy");

    try {
      for (let i = 0; i < datacards.length; i++) {
        let destinationFileName =
          destinationDirectory + "/" + datacards[i].code + ".png";
        let original = fs.readFileSync(
          datacards[i].datacardPath + "/datacard.webp"
        );
        let code = datacards[i].code;
        let collector = datacards[i].collect.collector.name;
        let creator = datacards[i].user.name + " " + datacards[i].user.lastName;
        let curator = datacards[i].curator.name;
        let collectDate = datacards[i].collect.collectDate;
        let creationDate = datacards[i].creationDate;
        let institute = datacards[i].catalogue.collection.instituteName;

        let message =
          code +
          "," +
          collector +
          "," +
          creator +
          "," +
          curator +
          "," +
          institute +
          "," +
          collectDate +
          "," +
          creationDate;
        // let message = 'IIB-UV MAM0001f, Gerardo Contreras Vega, Christian Alejandro Delfín Alfonso, Christian Alejandro Delfín Alfonso, 27/12/19 17:45:00, 27/12/19 17:45:00';

        let concealed = await steggy.conceal()(original, message);
        fs.writeFileSync(destinationFileName, concealed);
      }
    } catch (e) {
      console.info(e);
    }
  }
  async export(datacards, format, destinationDirectory) {
    switch (format) {
      case "JPEG": {
        return new Promise(async function(resolve) {
          for (let i = 0; i < datacards.length; i++) {
            let destinationFileName =
              destinationDirectory + "/" + datacards[i].code;
            var data = fs.readFileSync(datacards[i].datacardPath + "/datacard.webp");
            await sharp(data)
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
        return new Promise(async function(resolve) {
          await self.generatePNGFile(datacards, destinationDirectory, sharp);
          resolve();
        });
      }
      case "TIFF": {
        return new Promise(async function(resolve) {
          for (let i = 0; i < datacards.length; i++) {
            let destinationFileName =
              destinationDirectory + "/" + datacards[i].code;
            var data = fs.readFileSync(datacards[i].datacardPath + "/datacard.webp");
            await sharp(data)
              .tiff({
                quality: 100,
                compression: "lzw"
              })
              .toFile(destinationFileName + ".tiff").catch(err =>{
                  log.error(datacards[i].datacardPath)
                  log.error(datacards[i].datacardPath + "/datacard.webp")
                log.error(err)
                });
          }
          resolve();
        });
      }
      case "BMP": {
        return new Promise(async function(resolve) {
          for (let i = 0; i < datacards.length; i++) {
            let destinationFileName =
              destinationDirectory + "/" + datacards[i].code + ".bmp";

            Jimp.read(datacards[i].datacardPath + "/datacard.webp")
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
        return new Promise(async function(resolve) {
          for (let i = 0; i < datacards.length; i++) {
            try {
              let destinationFileName =
                destinationDirectory + "/" + datacards[i].code + ".pdf";
              var data = fs.readFileSync(datacards[i].datacardPath + "/datacard.webp");

              const PDFDocument = require("pdfkit");
              const doc = new PDFDocument({ layout: "landscape" });
              doc.pipe(fs.createWriteStream(destinationFileName)); // write to PDF

              doc.image(data, 0, 15, {
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
        return new Promise(async function(resolve) {
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
