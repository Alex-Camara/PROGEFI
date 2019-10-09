"use strict";
const path = require("path");

class Database {
  constructor() {
    this.database = null;
    this.databasePath = path.resolve('.') + '/src/persistence/testDatabase.db'
  }
  open() {
    
    console.log(this.databasePath)
    let open = new Promise((resolve, reject) => {
      const sqlite3 = require("sqlite3").verbose();

      this.database = new sqlite3.Database(
        this.databasePath,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
          if (!err) {
            console.log("Connected to the test database.");
            resolve('database-open')
          } else {
            console.log("error: " + err);
            reject(err)
          }
        }
      );
    });

    return open;
  }
  getDatabase() {
    console.log('regresando database...' + this.database)
    return this.database;
  }
  close() {
    console.log("database closed");
    this.database.close();
  }
}

export default Database;