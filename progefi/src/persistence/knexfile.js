const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.resolve('.') + '/src/persistence/testDatabase.db'
    }
  }

};