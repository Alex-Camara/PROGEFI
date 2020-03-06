'use strict'

import DatacardDaoImp from '../daoImp/DatacardDaoImp'

class DatacardDao {
    constructor() {
        this.datacardDaoImp = new DatacardDaoImp();
    }
    getDatacardsInCatalogue(catalogueId, searchString) {
        let datacards = Promise.resolve(this.datacardDaoImp.getDatacardsInCatalogue(catalogueId, searchString));
        return datacards;
    }
    createDatacard(datacard) {
        let createdDatacard = Promise.resolve(this.datacardDaoImp.createDatacard(datacard));
        return createdDatacard;
    }
    updateDatacard(datacard) {
        let updatedDatacard = Promise.resolve(this.datacardDaoImp.updateDatacard(datacard));
        return updatedDatacard;
    }
    getAllDatacards() {
        let datacards = Promise.resolve(this.datacardDaoImp.getAllDatacards());
        return datacards;
    }
}

export default DatacardDao;