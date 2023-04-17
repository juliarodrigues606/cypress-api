const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'uvim64',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://gorest.co.in/public'
  },
});
