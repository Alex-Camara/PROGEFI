"use strict";

const VegetationType = require("../models/VegetationType");
const VegetalFormation = require("../models/VegetalFormation");

class VegetationTypeDaoImp {
  async getVegetationTypes() {
    const vegetationTypes = await VegetationType.query()
      .select(
        "vegetationType.*",
        "vegetalFormation.name as vegetalFormationName",
        "vegetalFormation.imagePath as vegetalFormationImagePath"
      )
      .join(
        "vegetalFormation",
        "vegetationType.vegetalFormationId",
        "vegetalFormation.id"
      );

    return vegetationTypes;
  }
  async getVegetationType(vegetationTypeId) {
    let vegetationType = await VegetationType.query().where(
      "id",
      vegetationTypeId
    );

    let vegetalFormation = await VegetalFormation.query().where(
      "id",
      vegetationType[0].vegetalFormationId
    );

    vegetationType[0].vegetalFormation = vegetalFormation;

    return vegetationType[0];
  }
  async getVegetalFormations() {
    let vegetalFormations = await VegetalFormation.query().eager("[vegetationTypes]");

    return vegetalFormations;
  }
}

export default VegetationTypeDaoImp;
