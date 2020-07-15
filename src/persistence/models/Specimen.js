const {
  Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
// Model.knex(Knex(KnexConfig.development));
var os = require("os");

class Specimen extends Model {
  constructor() {
    super();
    if (process.env.NODE_ENV !== "production") {
      if (os.platform() === "darwin") {
        Model.knex(Knex(KnexConfig.developmentDarwin));
      } else if (os.platform() === "linux") {
        Model.knex(Knex(KnexConfig.developmentLinux));
      } else if (os.platform() === "win32") {
        Model.knex(Knex(KnexConfig.developmentWindows));
      }
    } else {
      if (os.platform() === "darwin") {
        Model.knex(Knex(KnexConfig.productionDarwin));
      } else if (os.platform() === "linux") {
        Model.knex(Knex(KnexConfig.productionLinux));
      } else if (os.platform() === "win32") {
        Model.knex(Knex(KnexConfig.productionWindows));
      }
    }
  }
  static get tableName() {
    return 'Specimen';
  }

  static get relationMappings() {
    const Species = require('./Species');
    const LifeStage = require('./LifeStage');
    const Sex = require('./Sex');
    return {
      species: {
        relation: Model.BelongsToOneRelation,
        modelClass: Species,
        join: {
          from: 'Specimen.speciesId',
          to: 'Species.id'
        }
      },
      lifeStage: {
        relation: Model.BelongsToOneRelation,
        modelClass: LifeStage,
        join: {
          from: 'Specimen.lifeStageId',
          to: 'LifeStage.id'
        }
      },
      sex: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sex,
        join: {
          from: 'Specimen.sexId',
          to: 'Sex.id'
        }
      }
    }
  }
}
module.exports = Specimen;