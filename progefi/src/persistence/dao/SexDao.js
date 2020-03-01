'use strict'

import SexDaoImp from '../daoImp/SexDaoImp'

class SexDao {
    constructor() {
        this.sexDaoImp = new SexDaoImp();
    }
    getSexes() {
        let sexes = Promise.resolve(this.sexDaoImp.getSexes())
        return sexes;
    }
    getSex(sexId){
        let sex = Promise.resolve(this.sexDaoImp.getSex(sexId))
        return sex;
    }
}

export default SexDao;