module.exports = {
	testFunction: () => {
		return 'Welcome to Barefoot Nomad!';
	},
	testBabel: () => {
		// testing the object destructuring
		const obj = { prop: 'babel test property' };
		const { prop } = obj;

		return prop;
	},
};
