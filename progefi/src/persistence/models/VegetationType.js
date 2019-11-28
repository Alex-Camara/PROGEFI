const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class VegetationType extends Model {
    static get tableName() {
        return 'vegetationType';
    }

    static get relationMappings () {
      return {
        vegetalFormation: {
          relation: Model.BelongsToOneRelation,
          modelClass: VegetalFormation,
          join: {
            from: 'vegetalFormationId',
            to: 'vegetalFormation.id'
          }
        }
      }
    }
}
module.exports = VegetationType;