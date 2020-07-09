const { Model } = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile')
Model.knex(Knex(KnexConfig.development))

class Datacard extends Model {
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
