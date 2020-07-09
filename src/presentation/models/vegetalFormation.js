"use strict";
import VegetationType from "./vegetationType";
const { ipcRenderer } = require("electron");

class VegetalFormation {
  constructor() {
    this.id = null;
    this.name = null;
    this.imagePath = null;
    this.vegetationTypes = [];
  }
  setVegetalFormation(vegetalFormation) {
    if (vegetalFormation.hasOwnProperty("vegetationTypes")) {
      let vegetationTypes = vegetalFormation.vegetationTypes;
      for (let i = 0; i < vegetationTypes.length; i++){
        let newVegetationType = new VegetationType();
        newVegetationType.setVegetationType(vegetationTypes[i]);
        this.vegetationTypes.push(newVegetationType);
      }
    }
    this.id = vegetalFormation.id;
    this.name = vegetalFormation.name;
    this.imagePath = vegetalFormation.imagePath;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getImagePath() {
    return this.imagePath;
  }
  getVegetationTypes(){
    return this.vegetationTypes;
  }
  static getAll() {
    return new Promise(resolve => {
      ipcRenderer.send("getVegetalFormations");
      ipcRenderer.once(
        "vegetalFormations",
        (event, receivedVegetalFormations) => {
          let vegetalFormations = [];
          for (let i = 0; i < receivedVegetalFormations.length; i++) {
            let newVegetalFormation = new VegetalFormation();
            newVegetalFormation.setVegetalFormation(
              receivedVegetalFormations[i]
            );
            vegetalFormations.push(newVegetalFormation);
          }
          resolve(vegetalFormations);
        }
      );
    });
  }
}

export default VegetalFormation;
