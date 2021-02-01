const { fixBabelImports, override } = require("customize-cra");

module.exports = override(
	fixBabelImports("@material-ui/core", { libraryDirectory: ".", camel2DashComponentName: false }),
	fixBabelImports("@material-ui/icons", { libraryDirectory: ".", camel2DashComponentName: false }),
	fixBabelImports("@material-ui/lab", { libraryDirectory: ".", camel2DashComponentName: false }),
	(config) => {
		config.plugins = config.plugins.filter((e) => !e.options?.eslintPath);
		return config;
	},
);
