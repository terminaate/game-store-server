const capitalize = (str) => {
	return str[0].toUpperCase() + str.slice(1);
};

module.exports = {
	prompt: ({ inquirer }) => {
		const questions = [
			{
				type: 'input',
				name: 'moduleName',
				message: 'What is the module name?',
			},
		];
		return inquirer.prompt(questions).then((answers) => {
			const { moduleName } = answers;

			const path = `src/${moduleName}`;
			return { moduleName, cModuleName: capitalize(moduleName), path };
		});
	},
};
