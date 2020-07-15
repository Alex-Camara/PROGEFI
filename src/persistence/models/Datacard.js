const { Model } = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile')
Model.knex(Knex(KnexConfig.development))

class Datacard extends Model {
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
    return 'Datacard'
  }

  static get relationMappings() {
    const Collect = require('./Collect');
    const Template = require('./Template');
    const Catalogue = require('./Catalogue');
    const Curator = require('./Curator');
    const User = require('./User');
    return {
      collect: {
        relation: Model.BelongsToOneRelation,
        modelClass: Collect,
        join: {
          from: 'Datacard.collectId',
          to: 'Collect.id'
        }
      },
      catalogue: {
        relation: Model.BelongsToOneRelation,
        modelClass: Catalogue,
        join: {
          from: 'Datacard.catalogueId',
          to: 'Catalogue.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'Datacard.userId',
          to: 'User.id'
        }
      },
      curator: {
        relation: Model.BelongsToOneRelation,
        modelClass: Curator,
        join: {
          from: 'Datacard.curatorId',
          to: 'Curator.id'
        }
      },
      template: {
        relation: Model.BelongsToOneRelation,
        modelClass: Template,
        join: {
          from: 'Datacard.templateId',
          to: 'Template.id'
        }
      },

    }
  }
}
module.exports = Datacard
