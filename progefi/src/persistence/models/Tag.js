const {
  Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Tag extends Model {
  static get tableName() {
    return 'Tag';
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation, 
        modelClass: Template,
        join: {
          from: 'tag.templateId',
          to: 'template.id'
        }
      }
    }
  }
}
module.exports = Tag;