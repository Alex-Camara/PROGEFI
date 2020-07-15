const { Model } = require("objection");
const Knex = require("knex");
const KnexConfig = require("../knexfile");
Model.knex(Knex(KnexConfig.development));
var os = require("os");

class User extends Model {
  constructor() {
    super();
    if (process.env.NODE_ENV !== "production") {
      if (os.platform() === "darwin") {
        Model.knex(Knex(KnexConfig.development));
      } else if (os.platform() === "linux") {
        Model.knex(Knex(KnexConfig.developmentLinux));
      } else if (os.platform() === "linux") {
        Model.knex(Knex(KnexConfig.developmentLinux));
      }
    } else {
      if (os.platform() === "darwin") {
        Model.knex(Knex(KnexConfig.development));
      } else if (os.platform() === "linux") {
        Model.knex(Knex(KnexConfig.developmentLinux));
      } else if (os.platform() === "linux") {
        Model.knex(Knex(KnexConfig.developmentLinux));
      }
    }
  }
  static get tableName() {
    return "User";
  }
}
module.exports = User;
