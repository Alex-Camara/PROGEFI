const { Model } = require('objection')
const Knex = require('knex')
const KnexConfig = require('../knexfile')
Model.knex(Knex(KnexConfig.development))
var os = require("os");

class Collect extends Model {
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
