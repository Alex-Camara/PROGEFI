const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Sex extends Model {
    static get tableName() {
        return 'Sex';
    }
}
module.exports = Sex;