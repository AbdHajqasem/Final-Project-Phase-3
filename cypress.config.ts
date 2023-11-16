const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on:any, config:any) {
      // implement node event listeners here
      on("task", { downloadFile });
      return require("./cypress/plugins")(on, config);
    },
    specPattern: "cypress/e2e/*.feature",
  },
  env: {
    download_dir: "./cypress/downloads",
  },
});
