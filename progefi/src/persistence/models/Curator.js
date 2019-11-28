const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Curator extends Model {
    static get tableName() {
        return 'curator';
    }
}
module.exports = Curator;