const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class VegetalFormation extends Model {
    static get tableName() {
        return 'VegetalFormation';
    }

    static get relationMappings() {
        const VegetationType = require('./VegetationType');
        return {
            vegetationTypes: {
                relation: Model.HasManyRelation,
                modelClass: VegetationType,
                join: {
                    from: 'VegetalFormation.id',
                    to: 'VegetationType.vegetalFormationId'
                }
            }
        }
    }
}
module.exports = VegetalFormation;