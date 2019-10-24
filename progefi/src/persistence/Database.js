"use strict";
const path = require("path");

class Database {
  constructor() {
    this.database = null;
    this.databasePath = path.resolve('.') + '/src/persistence/testDatabase.db'
  }
  open() {
    let open = new Promise((resolve, reject) => {
      const sqlite3 = require("sqlite3").verbose();

      this.database = new sqlite3.Database(
        this.databasePath,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
          if (!err) {
            resolve('database-open')
          } else {
            //console.log("error: " + err);
            reject(err)
          }
        }
      );
    });

    return open;
  }
  getDatabase() {
    return this.database;
  }
  close() {
    //console.log('database closed')
    this.database.close();
  }
}

export default Database;