const { Model } = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile')
Model.knex(Knex(KnexConfig.development))

class Collector extends Model {
  static get tableName () {
    return 'Collector'
  }
}
module.exports = Collector
