const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class DeviceModel extends Model {
    static get tableName() {
        return 'Model';
    }

    static get relationMappings() {
        const Device = require('./Device');
        return {
            device: {
                relation: Model.BelongsToOneRelation,
                modelClass: Device,
                join: {
                    from: 'Model.deviceId',
                    to: 'Device.id'
                }
            }
        }
    }
}
module.exports = DeviceModel;