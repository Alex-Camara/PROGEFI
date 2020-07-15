const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));
var os = require('os');

class User extends Model {
    constructor() {
        super();
        if (os.platform() === "darwin"){
            Model.knex(Knex(KnexConfig.development));
        } else{
            Model.knex(Knex(KnexConfig.developmentLinux));
        }
    }
    static get tableName() {
        return 'User';
    }
}
module.exports = User;