const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Project extends Model {
    static get tableName() {
        return 'projects';
    }
}
module.exports = Project;