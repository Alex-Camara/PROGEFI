const { Model } = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile')
Model.knex(Knex(KnexConfig.development))

class Datacard extends Model {
  static get tableName () {
    return 'datacard'
  }
}
module.exports = Datacard
