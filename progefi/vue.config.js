const path = require("path");
const fs = require('fs');

/*var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });*/

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config
            .entry("app")
            .clear()
            .add("./src/presentation/main.js")
            .end()
        config.resolve.alias
            .set("@", path.join(__dirname, "./src/presentation"))
        config
            .target('electron-main')
            .externals({
                'canvas-prebuilt': 'undefined',
                'canvas': 'undefined',
                'jsdom/lib/jsdom/utils': JSON.stringify({
                    Canvas: null
                }),
                'jsdom/lib/jsdom/living/generated/utils': JSON.stringify({
                    implForWrapper: null
                }),
                'jsdom': 'null',
                'xmldom': JSON.stringify({
                    DOMParser: null
                })
            })
    },
    pluginOptions: {
        electronBuilder: {
            externals: ['sharp', 'objection', 'knex', 'collections', 'Collection'],
        }
    }
    /*
        configureWebpack: {
            devtool: 'source-map',
            externals: nodeModules
        }*/
};