module.exports = {
	babel: {
		plugins: [
			["import", { libraryName: "@material-ui/core", libraryDirectory: "", camel2DashComponentName: false }, "core"],
			["import", { libraryName: "@material-ui/icons", libraryDirectory: "", camel2DashComponentName: false }, "icons"],
			["import", { libraryName: "@material-ui/lab", libraryDirectory: "", camel2DashComponentName: false }, "lab"],
		],
	},
	eslint: {
		enable: false,
	},
};
