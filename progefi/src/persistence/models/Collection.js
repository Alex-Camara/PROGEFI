const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Collection extends Model {
    static get tableName() {
        return 'collection';
    }

    static get relationMappings () {
        return {
          catalogues: {
            relation: Model.HasManyRelation,
            modelClass: Catalogue,
            join: {
              from: 'collection.id',
              to: 'catalogue.collectionId'
            }
          }
        }
      }
}
module.exports = Collection;