const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class DeviceModel extends Model {
    static get tableName() {
        return 'model';
    }
}
module.exports = DeviceModel;