const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class User extends Model {
    static get tableName() {
        return 'User';
    }
}
module.exports = User;