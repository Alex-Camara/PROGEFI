const {
  Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Layout extends Model {
  static get tableName() {
    return 'Layout';
  }

  static get relationMappings() {
    const Template = require('./Template');
    return {
      template: {
        relation: Model.BelongsToOneRelation,
        modelClass: Template,
        join: {
          from: 'layout.templateId',
          to: 'template.id'
        }
      }
    }
  }
}
module.exports = Layout;