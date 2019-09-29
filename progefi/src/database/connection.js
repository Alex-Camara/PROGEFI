const sqlite3 = require("sqlite3").verbose();
                       
let db = new sqlite3.Database(
  "./db/testDatabase.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  err => {
    console.log("Connected to the test database.");
  }      
);
