const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Template extends Model {
    static get tableName() {
        return 'template';
    }
}
module.exports = Template;