'use strict'

const Curator = require('../models/Curator')
const Datacard_has_curators = require('../models/Datacard_has_curators')

class CuratorDaoImp {
    async getCurators(selectedCurator) {
        const curators = await Curator.query()
            .where('name', 'like', '%' + selectedCurator + '%')
            .limit(10)
        return curators;
    }
    async getDatacardCurators(datacardId) {
        let datacardCurators = []
        const curators = await Datacard_has_curators.query()
            .where('datacardId', datacardId)

        for (let i = 0; i < curators.length; i++) {
            let curator = await this.getCurator(curators[i].curatorId)
            datacardCurators.push(curator)
        }
        console.info(datacardCurators)
        return datacardCurators
    }
    async getCurator(curatorId) {
        const curator = await Curator.query()
            .where('id', curatorId)
        return curator[0];
    }
    async createCurator(curator) {
        const createdCurator = await Curator.query().insert({
            name: curator
        })
        console.log(createdCurator)
        return createdCurator;
    }
}

export default CuratorDaoImp;