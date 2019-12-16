const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Datacard_has_curators extends Model {
    static get tableName() {
        return 'datacard_has_curators';
    }
}
module.exports = Datacard_has_curators;