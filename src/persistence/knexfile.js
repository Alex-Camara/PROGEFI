// Update with your config settings.

const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      // filename: path.resolve('.') + '/progefiDB.db'
      // filename: path.resolve(__dirname, "progefiDB.db")
      // filename: path.resolve('.') + '/src/persistence/progefiDB.db'
      filename: path.resolve(__dirname, 'databaseFolder/progefiDB.db')
      // filename: path.join(__dirname, "src", "persistence", "progefiDB.db")
      // filename: path.resolve('.') + '/src/persistence/progefiDB.db'
    },
    migrations: {
      directory: path.join(__dirname, "src", "persistence", "migrations")
      // directory: path.resolve('.') + '/src/persistence/migrations'
    },
    seeds: {
      // directory: path.resolve('.') + '/testSeeds'
      // directory: path.resolve('.') + '/src/persistence/productionSeeds'
      directory: path.join(__dirname, "src", "persistence", "productionSeeds")
    }
  }
}
