const path = require('path')

module.exports = {
  // target: 'electron-renderer',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/presentation/style/style.scss";`
      }
    }
  },
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./src/presentation/main.js')
      .end()
    config.resolve.alias.set('@', path.join(__dirname, './src/presentation'))
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background.js',
      nodeIntegration: true,
      externals: ['sharp', 'pdfjs', 'objection', 'knex'],
      builderOptions: {
        "productName": "PROGEFI",
        "appId": "PROGEFI",
        "compression": "store",
        "extraResources": [
          {
            "from": "./build/src",
            "to": "src"
          }
        ],
        win: {
          icon: 'build/icono.ico',
        },
        mac:{
          "target": "dmg",
          "icon": 'build/icono.icns'
        },
        linux:{
          "target": [
            "deb"
          ],
          "category": "Utility"
        }
      }
    }
  }
}
