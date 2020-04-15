const {
  Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class VegetationType extends Model {
  static get tableName() {
    return 'VegetationType';
  }

  static get relationMappings() {
    const VegetalFormation = require('./VegetalFormation');
    return {
      vegetalFormation: {
        relation: Model.BelongsToOneRelation,
        modelClass: VegetalFormation,
        join: {
          from: 'VegetationType.vegetalFormationId',
          to: 'VegetalFormation.id'
        }
      }
    }
  }
}
module.exports = VegetationType;