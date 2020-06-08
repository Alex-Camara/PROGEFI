"use strict";

const Curator = require("../models/Curator");

class CuratorDaoImp {
  async getAll() {
    const curators = await Curator.query()
    return curators;
  }
  async getAllByName(name) {
    const curators = await Curator.query()
        .where("name", "like", "%" + name + "%")
        .limit(10);
    return curators;
  }
  async getCurator(curatorId) {
    const curator = await Curator.query().where("id", curatorId);
    return curator[0];
  }
  async createCurator(curator) {
    const createdCurator = await Curator.query().insert({
      name: curator.name
    });
    return createdCurator;
  }
  async getByName(name) {
    let curator = await Curator.query().where(
        "name", name);

    console.info(curator);
    return curator;
  }
}

export default CuratorDaoImp;
