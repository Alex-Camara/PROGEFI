// Update with your config settings.

import * as electron from "electron";

const path = require('path')
const app = electron.app;

module.exports = {
  developmentWindows: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      filename: path.resolve(__dirname, '../../src/persistence/progefiDB.db')
    },
    migrations: {
      directory: path.resolve(__dirname, '../../src/persistence/migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, '../../src/persistence/productionSeeds')
    }
  },
  developmentLinux: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      filename: path.resolve(__dirname, '../src/persistence/progefiDB.db')
    },
    migrations: {
      directory: path.resolve(__dirname, '../src/persistence/migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, '../src/persistence/productionSeeds')
    }
  },
  developmentDarwin: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      // filename: path.resolve('.') + '/progefiDB.db'
      // filename: path.resolve(__dirname, "progefiDB.db")
      // filename: path.resolve('.') + '/src/persistence/progefiDB.db'
      filename: path.resolve(__dirname, '../../src/persistence/progefiDB.db')
      // filename: path.join(__dirname, "src", "persistence", "progefiDB.db")
      // filename: path.resolve('.') + '/src/persistence/progefiDB.db'
    },
    migrations: {
      directory: path.resolve(__dirname, '../../src/persistence/migrations')
    },
    seeds: {
      // directory: path.resolve('.') + '/testSeeds'
      // directory: path.resolve('.') + '/src/persistence/productionSeeds'
      // directory: path.join(__dirname, "src", "persistence", "productionSeeds")
      directory: path.resolve(__dirname, '../../src/persistence/productionSeeds')
    }
  },
  productionWindows: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      filename: path.resolve(__dirname, '../../src/persistence/progefiDB.db')
    },
    migrations: {
      directory: path.resolve(__dirname, '../../src/persistence/migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, '../../src/persistence/productionSeeds')
    }
  },
  productionLinux: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      filename: path.resolve(__dirname, '../../src/persistence/progefiDB.db')
    },
    migrations: {
      directory: path.resolve(__dirname, '../../src/persistence/progefiDB.db')
    },
    seeds: {
      directory: path.resolve(__dirname, '../../src/persistence/progefiDB.db')
    }
  },
  productionDarwin: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection:{
      filename: path.resolve(__dirname, 'src/persistence/progefiDB.db')
    },
    migrations: {
      directory: path.resolve(__dirname, 'src/persistence/migrations')
    },
    seeds: {
      // directory: path.resolve('.') + '/testSeeds'
      // directory: path.resolve('.') + '/src/persistence/productionSeeds'
      // directory: path.join(__dirname, "src", "persistence", "productionSeeds")
      directory: path.resolve(__dirname, 'src/persistence/productionSeeds')
    }
  }
}
