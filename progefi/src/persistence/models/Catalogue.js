const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Catalogue extends Model {
    static get tableName() {
        return 'Catalogue';
    }

    static get relationMappings () {
      const Collection = require('./Collection');
        return {
          collection: {
            relation: Model.BelongsToOneRelation,
            modelClass: Collection,
            join: {
              from: 'Catalogue.collectionId',
              to: 'Collection.id'
            }
          }
        }
      }
}
module.exports = Catalogue;