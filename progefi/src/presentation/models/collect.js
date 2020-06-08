"use strict";

import moment from "moment";
import Model from "./model";
import Collector from "./collector";
import ClimateType from "./climateType";
import VegetationType from "./vegetationType";
import Project from "./project";
import Specimen from "./specimen";
import Validator from "../validators/validator";

class Collect {
  constructor() {
    this.id = null;
    this.collectDate = null;
    this.collectDateValid = {};
    this.collectDateValid.isValid = true;
    this.collectDateValid.message = null;
    this.photocollectFormat = null;
    this.latitude = -181;
    this.latitudeValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.longitude = -181;
    this.longitudeValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.altitude = null;
    this.altitudeValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.country = null;
    this.countryValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.countryState = null;
    this.countryStateValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.municipality = null;
    this.municipalityValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.locality = null;
    this.localityValid = {
      isValid: false,
      message: "Campo requerido"
    };
    this.climateType = new ClimateType();
    this.vegetationType = new VegetationType();
    this.model = new Model();
    this.collector = new Collector();
    this.project = new Project();
    this.specimen = new Specimen();
  }
  async setCollect(collect) {
    // debugger
    this.id = collect.id;
    this.photocollectFormat = collect.photocollectFormat;
    await this.setAltitude(collect.altitude);
    await this.setLongitude(collect.longitude);
    await this.setLatitude(collect.latitude);
    await this.setCountry(collect.country);
    await this.setCountryState(collect.countryState);
    await this.setMunicipality(collect.municipality);
    await this.setLocality(collect.locality);
    this.collectDate = new Date(collect.collectDate);
    let newModel = new Model();
    await newModel.setModel(collect.model);
    this.model = newModel;
    let newCollector = new Collector();
    await newCollector.setCollector(collect.collector);
    this.collector = newCollector;
    let newProject = new Project();
    newProject.setProject(collect.project);
    this.project = newProject;
    let newSpecimen = new Specimen();
    newSpecimen.setSpecimen(collect.specimen);
    this.specimen = newSpecimen;
    if (collect.climateType !== null) {
      let newClimateType = new ClimateType();
      newClimateType.setClimateType(collect.climateType);
      this.climateType = newClimateType;
    } else {
      let newClimateType = new ClimateType();
      await newClimateType.setCode(collect.customClimateTypeCode);
      newClimateType.setValid({isValid: true, message: null});
      this.climateType = newClimateType;
    }
    if (collect.vegetationType !== null) {
      let newVegetationType = new VegetationType();
      newVegetationType.setVegetationType(collect.vegetationType);
      this.vegetationType = newVegetationType;
    } else {
      let newVegetationType = new VegetationType();
      await newVegetationType.setName(collect.customVegetationTypeName);
      newVegetationType.setNameValid({isValid: true, message: null});
      this.vegetationType = newVegetationType;
    }
  }
  setCollectDate(collectDate) {
    this.collectDate = collectDate;
  }
  setCollectDateValid(valid) {
    this.collectDateValid.isValid = valid.isValid;
    this.collectDateValid.message = valid.message;
  }
  async setLatitude(latitude) {
    await this.validateCoordinate(latitude, "latitude", -180, 180, 999999);
  }
  async setLongitude(longitude) {
    await this.validateCoordinate(longitude, "longitude", -180, 180, 999999);
  }
  async setAltitude(altitude) {
    await this.validateCoordinate(altitude, "altitude", -100, 8000, 999999);
  }
  async setCountry(country) {
    await this.validateLocation(country, "country", 3, 56);
  }
  async setCountryState(countryState) {
    await this.validateLocation(countryState, "countryState", 3, 56);
  }
  async setMunicipality(municipality) {
    await this.validateLocation(municipality, "municipality", 3, 80);
  }
  async setLocality(locality) {
    await this.validateLocation(locality, "locality", 3, 80);
  }
  setCountryValid(valid) {
    this.countryValid.isValid = valid.isValid;
    this.countryValid.message = valid.message;
  }
  setCountryStateValid(valid) {
    this.countryStateValid.isValid = valid.isValid;
    this.countryStateValid.message = valid.message;
  }
  setMunicipalityValid(valid) {
    this.municipalityValid.isValid = valid.isValid;
    this.municipalityValid.message = valid.message;
  }
  setLocalityValid(valid) {
    this.localityValid.isValid = valid.isValid;
    this.localityValid.message = valid.message;
  }
  setLatitudeValid(valid) {
    this.latitudeValid.isValid = valid.isValid;
    this.latitudeValid.message = valid.message;
  }
  setLongitudeValid(valid) {
    this.longitudeValid.isValid = valid.isValid;
    this.longitudeValid.message = valid.message;
  }
  setAltitudeValid(valid) {
    this.altitudeValid.isValid = valid.isValid;
    this.altitudeValid.message = valid.message;
  }
  async setModel(model) {
    return new Promise(async resolve => {
      let device = this.model.getDevice();

      if (model != null && model.hasOwnProperty("id")) {
        model.valid = {isValid: true, message: null};
        this.model = model;
      } else {
        let existingModel = await Model.getExisting(
            model, device.getId());
        if (existingModel) {
          existingModel.valid = {isValid: true, message: null};
          this.model = existingModel;
        } else {
          await this.model.setName(model);
        }
      }
      if (device.getName() != null) {
        await this.model.setDevice(device);
        resolve()
      }else{
        resolve()
      }
    })
  }
  setClimateType(climateType) {
    if (!climateType.hasOwnProperty("id")) {
      let newClimateType = new ClimateType();
      newClimateType.setValid({ isValid: true, message: null });
      newClimateType.setCode(climateType.code);
      this.climateType = newClimateType;
    } else {
      climateType.setValid({ isValid: true, message: null });
      this.climateType = climateType;
    }
  }
  async setVegetationType(vegetationType) {
      if (!vegetationType.hasOwnProperty("id")) {
        let newVegetationType = new VegetationType();
        newVegetationType.setNameValid({ isValid: true, message: null });
        await newVegetationType.setName(vegetationType.name);
        newVegetationType.setNameValid({ isValid: true, message: null });
        this.vegetationType = newVegetationType;
      } else {
        vegetationType.setNameValid({ isValid: true, message: null });
        this.vegetationType = vegetationType;
      }
  }
  setCollector(collector) {
    return new Promise(async resolve => {
      if (collector.hasOwnProperty("id")) {
        collector.valid = { isValid: true, message: null };
        this.collector = collector;
        resolve(collector);
      } else{
        let existingCollector = await Collector.getExisting(collector);
        if (existingCollector.length > 0) {
          existingCollector.setValid = { isValid: true, message: null };
          this.collector = existingCollector;
          resolve(existingCollector);
        } else{
          await this.collector.setName(collector);
          await this.collector.generateCode();
          resolve(this.collector);
        }
      }
    })
    // this.collector = collector;
  }
  setProject(project) {
    project.valid = { isValid: true, message: null };
    this.project = project;
  }
  setPhotocollectFormat(photocollectFormat){
    this.photocollectFormat = photocollectFormat;
  }
  getCollectDate() {
    return this.collectDate;
  }
  getPhotocollectFormat(){
    return this.photocollectFormat;
  }
  getCollectDateValid() {
    return this.collectDateValid;
  }
  getFormattedCollectDate() {
    return moment(this.collectDate).format("DD/MM/YYYY");
  }
  getFormattedCollectHour() {
    // debugger
    return moment(this.collectDate).format("HH:mm");
  }
  getLongitude() {
    return this.longitude;
  }
  getLatitude() {
    return this.latitude;
  }
  getDMSLatitude(){
    return this.getDMSCoordinate(this.latitude);
  }
  getDMSLongitude(){
    return this.getDMSCoordinate(this.longitude);
  }
  getAltitude() {
    return this.altitude;
  }
  getCountry() {
    return this.country;
  }
  getCountryState() {
    return this.countryState;
  }
  getMunicipality() {
    return this.municipality;
  }
  getLocality() {
    return this.locality;
  }
  getModel() {
    return this.model;
  }
  getClimateType() {
    return this.climateType;
  }
  getSpecimen() {
    return this.specimen;
  }
  getVegetationType() {
    return this.vegetationType;
  }
  getCollector() {
    return this.collector;
  }
  getProject() {
    return this.project;
  }
  getCountryValid() {
    return this.countryValid;
  }
  getCountryStateValid() {
    return this.countryStateValid;
  }
  getMunicipalityValid() {
    return this.municipalityValid;
  }
  getLocalityValid() {
    return this.localityValid;
  }
  getLatitudeValid() {
    return this.latitudeValid;
  }
  getLatitudeValidMessage() {
    return this.latitudeValid.message;
  }
  getAltitudeValidMessage() {
    return this.altitudeValid.message;
  }
  getAltitudeValid() {
    return this.altitudeValid;
  }
  getLongitudeValid() {
    return this.longitudeValid;
  }
  getLongitudeValidMessage() {
    return this.longitudeValid.message;
  }
  isCollectDateValid() {
    return this.collectDateValid.isValid;
  }
  isCountryValid() {
    return this.countryValid.isValid;
  }
  getCountryValidMessage() {
    return this.countryValid.message;
  }
  isCountryStateValid() {
    return this.countryStateValid.isValid;
  }
  getCountryStateValidMessage() {
    return this.countryStateValid.message;
  }
  isMunicipalityValid() {
    return this.municipalityValid.isValid;
  }
  getMunicipalityValidMessage() {
    return this.municipalityValid.message;
  }
  isLocalityValid() {
    return this.localityValid.isValid;
  }
  getLocalityValidMessage() {
    return this.localityValid.message;
  }
  isAltitudeValid() {
    return this.altitudeValid.isValid;
  }
  isLongitudeValid() {
    return this.longitudeValid.isValid;
  }
  isLatitudeValid() {
    return this.latitudeValid.isValid;
  }
  getDMSCoordinate(coordinate){
    let splitCoordinate = coordinate.toString().split(".");
    let degrees = splitCoordinate[0];

    let degreesRemaining = ('.' + splitCoordinate[1]) * 60;
    degreesRemaining = degreesRemaining.toString().split(".");
    let minutes = degreesRemaining[0];

    let minutesRemaining = ('.' + degreesRemaining[1]) * 60;
    let seconds = Math.round(minutesRemaining);

    return degrees + "° " + minutes + "' " + seconds + "''";
  }
  validateCoordinate(
    testValue,
    testValueName,
    minLimit,
    maxLimit,
    decimalMaxLimit
  ) {
    return new Promise(resolve => {
      var validator = new Validator();
      validator
        .testValidationTwo(testValue, minLimit, maxLimit, decimalMaxLimit, true)
        .then(() => {
          this[testValueName] = testValue;
          this[testValueName + "Valid"] = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          // cuando el campo es requerido y esta vacío
          if (error == "Campo requerido") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
            // cuando el campo esta vacío, pero no es error porque el campo no es requerido
          } else if (error == "Campo vacío") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
            // cuando solo se ha ingresado un - para un número negativo
          } else if (error == "Ingresa un número") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else if (this[testValueName] == "") {
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else {
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          }
        });
    });
  }
  validateLocation(testValue, testValueName, minLimit, maxLimit) {
    return new Promise(resolve => {
      let regex = "^[^_{}+();:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$";

      var validator = new Validator();
      validator
        .testValidationOne(testValue, minLimit, maxLimit, true, regex)
        .then(() => {
          this[testValueName] = testValue;
          this[testValueName + "Valid"] = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (
            error == "Campo requerido" ||
            error == "Longitud mínima inválida"
          ) {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          } else if (error == "Campo vacío") {
            this[testValueName] = testValue;
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else if (this[testValueName + "Valid"].isValid) {
            this[testValueName + "Valid"] = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else {
            this[testValueName + "Valid"] = { isValid: false, message: error };
            resolve();
          }
        });
    });
  }
}

export default Collect;
