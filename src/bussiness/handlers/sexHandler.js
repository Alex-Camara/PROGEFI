"use strict";
import SexDao from '../../persistence/dao/SexDao'

class SexHandler {
    constructor() {
        this.sexDao = new SexDao()
    }
    async getSexes(result) {
        let sexes = await this.sexDao.getSexes();
        result(sexes);
    }
    async getSex(sexId) {
        return new Promise(async (resolve) => {
            let sex = await this.sexDao.getSex(sexId);
            resolve(sex);
        });
    }
}

export default SexHandler;