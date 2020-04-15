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
    return {
      collect: {
        relation: Model.BelongsToOneRelation,
        modelClass: Collect,
        join: {
          from: 'Datacard.collectId',
          to: 'Collect.id'
        }
      },
      curators: {
        relation: Model.ManyToManyRelation,
        modelClass: Curator,
        join: {
          from: 'Datacard.id',
          through: {
            from: 'Datacard_has_curators.datacardId',
            to: 'Datacard_has_curators.curatorId'
          },
          to: 'Curator.id'
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
