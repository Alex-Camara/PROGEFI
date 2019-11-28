'use strict'

const Curator = require('../models/Curator')

class CuratorDaoImp {
    async getCurators(selectedCurator) {
        const curators = await Curator.query()
        .where('name', 'like', '%' + selectedCurator + '%')
        .limit(10)
        return curators;
    }
}

export default CuratorDaoImp;