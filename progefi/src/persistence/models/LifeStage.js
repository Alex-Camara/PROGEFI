const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class LifeStage extends Model {
    static get tableName() {
        return 'LifeStage';
    }
}
module.exports = LifeStage;