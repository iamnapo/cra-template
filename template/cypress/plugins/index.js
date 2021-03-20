/// <reference types="cypress" />

require("dotenv").config();

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
	require("@cypress/code-coverage/task")(on, config);

	config.env.JWT_TOKEN = process.env.JWT_TOKEN;

	return config;
};
