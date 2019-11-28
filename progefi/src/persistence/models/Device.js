const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Device extends Model {
    static get tableName() {
        return 'device';
    }
}
module.exports = Device;