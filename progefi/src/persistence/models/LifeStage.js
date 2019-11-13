import { Model } from 'objection';
import Knex from 'knex';
import { development } from '../knexfile';
Model.knex(Knex(development));

class LifeStage extends Model {
    static get tableName() {
        return 'lifeStage';
    }
}
export default LifeStage;