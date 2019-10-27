const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class ClimateType extends Model {
    static get tableName() {
        return 'climateTypes';
    }
}
module.exports = ClimateType;