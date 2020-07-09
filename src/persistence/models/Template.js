const {
    Model
} = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile');
Model.knex(Knex(KnexConfig.development));

class Template extends Model {
    static get tableName() {
        return 'Template';
    }

    static get relationMappings () {
        const Tag = require('./Tag');
          return {
            tags: {
                relation: Model.HasManyRelation,
                modelClass: Tag,
                join: {
                  from: 'Template.id',
                  to: 'Tag.templateId'
                }
              }
          }
        }
}
module.exports = Template;