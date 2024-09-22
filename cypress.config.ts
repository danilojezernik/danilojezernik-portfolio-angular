import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    chromeWebSecurity: false, // Try disabling web security if it's blocking tests
  },
  projectId: "h8tgs1",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
