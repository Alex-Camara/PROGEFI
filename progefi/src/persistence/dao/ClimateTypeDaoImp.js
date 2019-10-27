'use strict'

const ClimateType = require('../models/ClimateType')

class ClimateTypeDaoImp {
    async getClimateTypes() {
        const climateTypes = await ClimateType.query()
        return climateTypes;
    }
}

export default ClimateTypeDaoImp;