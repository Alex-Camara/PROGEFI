const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Collection extends Model {
    static get tableName() {
        return 'Collection';
    }

    static get relationMappings () {
      const Catalogue = require('./Catalogue');
        return {
          catalogues: {
            relation: Model.HasManyRelation,
            modelClass: Catalogue,
            join: {
              from: 'Collection.id',
              to: 'Catalogue.collectionId'
            }
          }
        }
      }
}
module.exports = Collection;