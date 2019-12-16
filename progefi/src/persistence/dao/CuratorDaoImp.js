'use strict'

const Curator = require('../models/Curator')

class CuratorDaoImp {
    async getCurators(selectedCurator) {
        const curators = await Curator.query()
        .where('name', 'like', '%' + selectedCurator + '%')
        .limit(10)
        return curators;
    }
    async createCurator(curator){
        const createdCurator = await Curator.query().insert({
            name: curator
        })
        console.log(createdCurator)
        return createdCurator;
    }
}

export default CuratorDaoImp;