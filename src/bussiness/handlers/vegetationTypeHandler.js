"use strict";
import VegetationTypeDao from "../../persistence/dao/VegetationTypeDao";

class VegetationTypeHandler {
  constructor() {
    this.vegetationTypeDao = new VegetationTypeDao();
  }
  async getVegetationTypes(result) {
    let vegetationTypes = await this.vegetationTypeDao.getVegetationTypes();
    result(vegetationTypes);
  }
  async getVegetationType(vegetationTypeId) {
    return new Promise(async resolve => {
      let vegetationType = await this.vegetationTypeDao.getVegetationType(
        vegetationTypeId
      );
      resolve(vegetationType);
    });
  }
  async getVegetalFormations(result) {
      let vegetalFormations = await this.vegetationTypeDao.getVegetalFormations();
    result(vegetalFormations);
  }
}

export default VegetationTypeHandler;
