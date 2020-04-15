"use strict";

import Collect from "../models/Collect";

const Collector = require("../models/Collector");
const Datacard = require("../models/Datacard");

class CollectorDaoImp {
  async getCollectors(selectedCollector) {
    return Collector.query()
      .where("name", "like", "%" + selectedCollector + "%")
      .limit(10);
  }
  async getCollector(collectorId) {
    const collector = await Collector.query().where("id", collectorId);
    return collector[0];
  }
  async countDatacardsCreated(collectorId, catalogueId) {
    let query = Datacard.query()
      .where("catalogueId", catalogueId)
      .joinRelation("collect")
      .where("collect.collectorId", collectorId);

    let count = await Promise.resolve(query.resultSize());

    return count;
  }
  async createCollector(collector) {
    // console.log(createdCollector)
    return await Collector.query().insert({
      name: collector.name,
      code: collector.code
    });
  }
  async verifyDuplicateCode(code) {
    const isDuplicated = await Collector.query().where("code", code);
    // console.log(isDuplicated)
    return isDuplicated;
  }
  async getCollectorByName(collectorName) {
    let collector = await Collector.query().where(
      "name", collectorName);

    console.info(collector);
    return collector;
  }
}

export default CollectorDaoImp;
