const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Catalogue extends Model {
    static get tableName() {
        return 'catalogues';
    }

    static get relationMappings () {
        return {
          collection: {
            relation: Model.BelongsToOneRelation,
            modelClass: Collections,
            join: {
              from: 'catalogue.collection_id',
              to: 'collection.id'
            }
          }
        }
      }
}
module.exports = Catalogue;