require("dotenv").config();

module.exports = (on, config) => {
	require("@cypress/code-coverage/task")(on, config);

	config.env.JWT_TOKEN = process.env.JWT_TOKEN;

	return config;
};
