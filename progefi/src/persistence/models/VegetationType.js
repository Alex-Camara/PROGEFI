const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class VegetationType extends Model {
    static get tableName() {
        return 'vegetationTypes';
    }

    static get relationMappings () {
      return {
        vegetalFormation: {
          relation: Model.BelongsToOneRelation,
          modelClass: VegetalFormations,
          join: {
            from: 'catalogue.vegetalFormation_id',
            to: 'vegetalFormation.id'
          }
        }
      }
    }
}
module.exports = VegetationType;