const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Species extends Model {
    static get tableName() {
        return 'Species';
    }
}
module.exports = Species;