const path = require("path");

module.exports = {
    chainWebpack: config => {
        config
            .entry("app")
            .clear()
            .add("./src/presentation/main.js")
            .end();
        config.resolve.alias
            .set("@", path.join(__dirname, "./src/presentation"))
    }
};