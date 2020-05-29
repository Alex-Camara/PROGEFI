"use strict";

import "regenerator-runtime/runtime";
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
    this.imageLoaded = false;
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
        let copyFilePath = this.saveDuplicatedFile(
          photoCollect.filePath,
          datacardsFolderPath + "" + new Date().getTime() + "." + imageFormat
        );
        return copyFilePath;
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
  async saveFile(filePath, datacardsFolderPath) {
    var originalPath = datacardsFolderPath + "/original." + "webp";
    try {
      const sharp = require("sharp");
      sharp(filePath)
        .webp({
          nearLossless: true,
          quality: 80,
          reductionEffort: 5
        })
        .toFile(originalPath);
      this.imageLoaded = true;
      // this.datacard.setPhotoCollectPath(originalPath);
      // return originalPath;
    } catch (error) {
      console.info(error);
      return error;
    }
  }

  async saveDuplicatedFile(filePath, photocollectsFolderPath) {
    try {
      // var duplicatePath = photocollectsFolderPath + "/original." + imageFormat;

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
      fs.writeFileSync(file, bitmap, { encoding: "base64" });
    } catch (error) {
      console.log("ERROR EN GUARDAR LA DATACARD: " + error);
    }
  }
  async createDatacard(datacard, result) {
    var datacardsFolderPath =
      path.resolve(".") + "/src/persistence/resources/datacards/";
    var photocollectFolderPath =
      path.resolve(".") + "/src/bussiness/photocollects/";
    datacardsFolderPath = this.createFolder(datacardsFolderPath);
    // console.log('saving datacard')
    // console.info(datacard)
    this.saveDuplicatedFile(
      datacard.photocollectPath,
      datacardsFolderPath + "/original." + datacard.collect.photocollectFormat
    );
    // console.log(filePath)

    if (datacard.validated) {
      let base64String = datacard.base64; // Not a real image
      // Remove header
      let base64Image = base64String.split(";base64,").pop();

      let datacardPath = datacardsFolderPath + "/datacard.webp";

      this.base64Decode(base64Image, datacardPath);
    }
    this.updateCSVCatalogueFile(datacard)
      .then(async () => {
        datacard.datacardPath = datacardsFolderPath;
        let createdDatacard = await this.datacardDao.createDatacard(datacard);
        await this.deleteFolderContent(photocollectFolderPath);
        result(createdDatacard);
      })
      .catch(() => {
        console.log("file error");
        result("file-error");
      });
  }
  async updateDatacard(datacard, result) {
    var photocollectFolderPath =
      path.resolve(".") + "/src/bussiness/photocollects/";
    //Cuando la fotocolecta no haya cambiado, no tiene sentdio volver a guardarla
    if (datacard.photocollectPath != "do-not-save") {
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
        await this.deleteFolderContent(photocollectFolderPath);
        result(updatedDatacard);
      })
      .catch(() => {
        console.log("file error");
        result("file-error");
      });
  }
  getThumbnails(datacard) {
    return new Promise(async resolve => {
      const sharp = require("sharp");
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
    // } catch (error) {
    //   result(error);
    // }
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
      fs.writeFileSync(destinationFileName, csv, "utf8");
      resolve();
    });
  }
  updateCSVCatalogueFile(datacard) {
    return new Promise(async (resolve, reject) => {
      if (!datacard.validated) {
        console.info("NO ENTRO A ACTUALIZAR CSV");
        resolve();
        return
      }
      console.info("ENTRO A ACTUALIZAR CSV (flujo normal)");
      let fields = [
        "ID",
        "Especie",
        "Proyecto",
        "Código de colección",
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
        "Curador 1",
        "Curador 2"
      ];
      let curator2 = "";
      if (datacard.curators[1] !== undefined) {
        curator2 = datacard.curators[1].name;
      }

      let data = {
        ID: datacard.id,
        Especie: datacard.collect.specimen.species.scientificName,
        Proyecto: datacard.collect.project.name,
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
        "Curador 1": datacard.curators[0].name,
        "Curador 2": curator2
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
    return new Promise(async function(resolve, reject) {
      const steggy = require("steggy");
      base64 = base64.split(";base64,").pop();
      // var bitmap = new Buffer(base64, "base64");
      var tempPath = path.resolve(".") + "/src/bussiness/temp.webp";
      self.base64Decode(base64, tempPath);
      const image = fs.readFileSync(tempPath);

      try {
        let revealed = steggy.reveal()(image, "utf8");
        fs.unlinkSync(tempPath);
        resolve(revealed);
      } catch (e) {
        fs.unlinkSync(tempPath);
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
        let creator = "";
        let curator = datacards[i].curators[0].name;
        let collectDate = datacards[i].collect.collectDate;
        let creationDate = datacards[i].creationDate;

        let message =
          code +
          "," +
          collector +
          "," +
          creator +
          "," +
          curator +
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
    const sharp = require("sharp");

    switch (format) {
      case "JPEG": {
        return new Promise(async function(resolve, reject) {
          for (let i = 0; i < datacards.length; i++) {
            let destinationFileName =
              destinationDirectory + "/" + datacards[i].code;
            await sharp(datacards[i].datacardPath + "/datacard.webp")
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
            let data = await sharp(datacards[i].datacardPath + "/datacard.webp")
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
        return new Promise(async function(resolve, reject) {
          for (let i = 0; i < datacards.length; i++) {
            try {
              let destinationFileName =
                destinationDirectory + "/" + datacards[i].code + ".pdf";

              const PDFDocument = require("pdfkit");
              const doc = new PDFDocument({ layout: "landscape" });
              doc.pipe(fs.createWriteStream(destinationFileName)); // write to PDF

              doc.image(datacards[i].datacardPath + "/datacard.webp", 0, 15, {
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
