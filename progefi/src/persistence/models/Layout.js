const {
  Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Layout extends Model {
  static get tableName() {
    return 'layout';
  }

  static get relationMappings() {
    return {
      owner: {
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