"use strict";
import Validator from "../validators/validator";

class Species {
  constructor() {
    this.id = null;
    this.scientificName = null;
    this.scientificNameValid = {};
    this.scientificNameValid.isValid = false;
    this.scientificNameValid.message = "Campo requerido";
    this.genus = null;
    this.order = null;
    this.family = null;
    this.speciesClass = null;
    this.phylum = null;
    this.kingdom = null;
  }
  async setSpecies(species) {
    this.id = species.id;
    await this.setScientificName(species.scientificName);
    this.family = species.family;
    this.genus = species.genus;
    this.speciesClass = species.speciesClass;
    this.order = species.order;
    this.kingdom = species.kingdom;
    this.phylum = species.phylum;
  }
  async setScientificName(scientificName) {
    return new Promise(resolve => {
      var validator = new Validator();
      let regex = "^[a-zA-Z \\u00C0-\\u00FF]*$";
      validator
        .testValidationOne(scientificName, 5, 50, this.required, regex)
        .then(() => {
          this.scientificName = scientificName;
          this.scientificNameValid = { isValid: true, message: null };
          resolve();
        })
        .catch(error => {
          if (error === "Campo requerido" || error === "Campo vacío") {
            this.scientificName = scientificName;
            this.scientificNameValid = { isValid: false, message: error };
            resolve();
          } else if (error === "Longitud mínima inválida") {
            this.scientificName = scientificName;
            this.scientificNameValid = { isValid: false, message: error };
            resolve();
          } else if (this.scientificNameValid.isValid) {
            this.scientificNameValid = {
              isValid: true,
              message: "temporary error"
            };
            resolve();
          } else {
            this.scientificNameValid = { isValid: false, message: error };
            resolve();
          }
        });
    });
  }
  setScientificNameValid(valid) {
    this.scientificNameValid.isValid = valid.isValid;
    this.scientificNameValid.message = valid.message;
  }
  setGenus(genus) {
    this.genus = genus;
  }
  setFamily(family) {
    this.family = family;
  }
  setOrder(order) {
    this.order = order;
  }
  setPhylum(phylum) {
    this.phylum = phylum;
  }
  setSpeciesClass(speciesClass) {
    this.speciesClass = speciesClass;
  }
  setKingdom(kingdom) {
    this.kingdom = kingdom;
  }
  getScientificName() {
    return this.scientificName;
  }
  getGenus() {
    return this.genus;
  }
  getOrder() {
    return this.order;
  }
  getSpeciesClass() {
    return this.speciesClass;
  }
  getKingdom() {
    return this.kingdom;
  }
  getPhylum() {
    return this.phylum;
  }
  getFamily() {
    return this.family;
  }
  isScientificNameValid() {
    return this.scientificNameValid.isValid;
  }
  getScientificNameValid() {
    return this.scientificNameValid;
  }
  getScientificNameValidMessage() {
    return this.scientificNameValid.message;
  }
}

export default Species;
