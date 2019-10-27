const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Collection extends Model {
    static get tableName() {
        return 'collections';
    }

    static get relationMappings () {
        return {
          catalogues: {
            relation: Model.HasManyRelation,
            modelClass: Catalogues,
            join: {
              from: 'collection.id',
              to: 'catalogue.collection_id'
            }
          }
        }
      }
}
module.exports = Collection;