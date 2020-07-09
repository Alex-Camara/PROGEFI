"use strict";

import Sex from "./sex";
import LifeStage from "./lifeStage";
import Species from "./species";

class Specimen {
  constructor() {
    this.id = null
    this.species = new Species();
    this.sex = new Sex();
    this.lifeStage = new LifeStage();
    this.observations = null;
  }
  setSpecimen(specimen) {
    this.id = specimen.id;
    this.observations = specimen.observations;
    let newSpecies = new Species();
    newSpecies.setSpecies(specimen.species);
    this.species = newSpecies;
    if (specimen.lifeStage !== null) {
      let newLifeStage = new LifeStage();
      newLifeStage.setLifeStage(specimen.lifeStage);
      this.lifeStage = newLifeStage;
    } else {
      let newLifeStage = new LifeStage();
      newLifeStage.setName(specimen.customLifeStageName);
      newLifeStage.setNameValid({isValid: true, message: null});
      this.lifeStage = newLifeStage;
    }
    if (specimen.sex !== null) {
      let newSex = new Sex();
      newSex.setSex(specimen.sex);
      this.sex = newSex;
    } else {
      let newSex = new Sex();
      newSex.setName(specimen.customSexName);
      newSex.setNameValid({isValid: true, message: null});
      this.sex = newSex;
    }
  }
  setObservations(observations) {
    this.observations = observations;
  }
  setSex(sex) {
    if (!sex.hasOwnProperty("id")){
      let newSex = new Sex();
      newSex.setName(sex.name);
      this.sex = newSex
    } else{
      sex.setNameValid({ isValid: true, message: null });
      this.sex = sex;
    }
  }
  setLifeStage(lifeStage) {
    if (!lifeStage.hasOwnProperty("id")) {
      let newLifeStage = new LifeStage();
      newLifeStage.setNameValid({ isValid: true, message: null });
      newLifeStage.setName(lifeStage.name);
      this.lifeStage = newLifeStage;
    } else {
      lifeStage.setNameValid({ isValid: true, message: null });
      this.lifeStage = lifeStage;
    }
  }
  setSpecies(species) {
    this.species = species;
  }
  getObservations() {
    return this.observations;
  }
  getSex() {
    return this.sex;
  }
  getSexName() {
    return this.sex.getName();
  }
  getLifeStage() {
    return this.lifeStage;
  }
  getLifeStageName() {
    return this.lifeStage.getName();
  }
  isSexValid() {
    let valid = this.sex.isValid();
    return valid;
  }
  isLifeStageValid() {
    let valid = this.lifeStage.isValid();
    return valid;
  }
  getSexValid() {
    let valid = this.sex.getNameValid();
    return valid;
  }
  getLifeStageValid() {
    let valid = this.lifeStage.getNameValid();
    return valid;
  }
  getSpecies() {
    return this.species;
  }
}

export default Specimen;
