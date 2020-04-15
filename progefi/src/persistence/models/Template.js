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
        const Layout = require('./Layout');
        const Tag = require('./Tag');
          return {
            layout: {
              relation: Model.HasManyRelation,
              modelClass: Layout,
              join: {
                from: 'Template.id',
                to: 'Layout.templateId'
              }
            },
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