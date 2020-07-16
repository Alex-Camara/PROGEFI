const { Model } = require("objection");
const Knex = require("knex");
const KnexConfig = require("../knexfile");
// Model.knex(Knex(KnexConfig.development));
const log = require('electron-log');
var os = require("os");

class User extends Model {
  constructor() {
    super();

    if (process.env.NODE_ENV !== "production") {
      if (os.platform() === "darwin") {
        Model.knex(Knex(KnexConfig.developmentDarwin));
      } else if (os.platform() === "linux") {
        Model.knex(Knex(KnexConfig.developmentLinux));
      } else if (os.platform() === "win32") {
        console.info("entré a windows!!")
        Model.knex(Knex(KnexConfig.developmentWindows));
        log.info("knex path wwindows: ")
        log.info(Knex)
        log.info(KnexConfig.developmentWindows)
      }
    } else {
      if (os.platform() === "darwin") {
        Model.knex(Knex(KnexConfig.productionDarwin));
      } else if (os.platform() === "linux") {
        Model.knex(Knex(KnexConfig.productionLinux));
      } else if (os.platform() === "win32") {
        Model.knex(Knex(KnexConfig.productionWindows));
      }
    }
  }
  static get tableName() {
    return "User";
  }
}
module.exports = User;
