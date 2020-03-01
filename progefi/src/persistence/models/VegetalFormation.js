const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class VegetalFormation extends Model {
    static get tableName() {
        return 'vegetalFormation';
    }
}
module.exports = VegetalFormation;