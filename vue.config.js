const path = require("path");
module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: [
            path.resolve(__dirname, "src/assets/styles/_vars.scss"),
            path.resolve(__dirname, "src/assets/styles/_mixins.scss")
          ]
        })
        .end();
    });
  }
};