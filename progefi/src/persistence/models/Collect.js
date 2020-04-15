const { Model } = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile')
Model.knex(Knex(KnexConfig.development))

class Collect extends Model {
    static get tableName() {
        return 'Collect'
    }

    static get relationMappings() {
        const Collector = require('./Collector');
        const ClimateType = require('./ClimateType');
        const VegetationType = require('./VegetationType');
        const Project = require('./Project');
        const DeviceModel = require('./DeviceModel');
        const Specimen = require('./Specimen');
        return {
            collector: {
                relation: Model.BelongsToOneRelation,
                modelClass: Collector,
                join: {
                    from: 'Collect.collectorId',
                    to: 'Collector.id'
                }
            },
            climateType: {
                relation: Model.BelongsToOneRelation,
                modelClass: ClimateType,
                join: {
                    from: 'Collect.climateTypeId',
                    to: 'ClimateType.id'
                }
            },
            vegetationType: {
                relation: Model.BelongsToOneRelation,
                modelClass: VegetationType,
                join: {
                    from: 'Collect.vegetationTypeId',
                    to: 'VegetationType.id'
                }
            },
            project: {
                relation: Model.BelongsToOneRelation,
                modelClass: Project,
                join: {
                    from: 'Collect.projectId',
                    to: 'Project.id'
                }
            },
            model: {
                relation: Model.BelongsToOneRelation,
                modelClass: DeviceModel,
                join: {
                    from: 'Collect.modelId',
                    to: 'Model.id'
                }
            },
            specimen: {
                relation: Model.BelongsToOneRelation,
                modelClass: Specimen,
                join: {
                    from: 'Collect.specimenId',
                    to: 'Specimen.id'
                }
            }
        }
    }
}
module.exports = Collect
