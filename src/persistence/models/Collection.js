const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
// Model.knex(Knex(KnexConfig.development));
var os = require("os");

class Collection extends Model {
    constructor() {
        super();
        if (process.env.NODE_ENV !== "production") {
            if (os.platform() === "darwin") {
                Model.knex(Knex(KnexConfig.developmentDarwin));
            } else if (os.platform() === "linux") {
                Model.knex(Knex(KnexConfig.developmentLinux));
            } else if (os.platform() === "win32") {
                Model.knex(Knex(KnexConfig.developmentWindows));
            }
        } else {
            if (os.platform() === "darwin") {
                Model.knex(Knex(KnexConfig.productionDarwin));
            } else if (os.platform() === "linux") {
                Model.knex(Knex(KnexConfig.productionLinux));
            } else if (os.platform() === "win32") {
                Model.knex(Knex(KnexConfig.productionWindows));
            }
        }
    }
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