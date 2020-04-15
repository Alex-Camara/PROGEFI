const {
  Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Specimen extends Model {
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