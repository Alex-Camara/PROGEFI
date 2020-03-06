const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Catalogue extends Model {
    static get tableName() {
        return 'catalogue';
    }

    static get relationMappings () {
      const Collection = require('./Collection');
        return {
          collection: {
            relation: Model.BelongsToOneRelation,
            modelClass: Collection,
            join: {
              from: 'catalogue.collectionId',
              to: 'collection.id'
            }
          }
        }
      }
}
module.exports = Catalogue;