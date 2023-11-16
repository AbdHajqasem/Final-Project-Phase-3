import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      return require("./cypress/plugins")(on, config);
    },
    specPattern: "cypress/e2e/*.feature",
  },
});
