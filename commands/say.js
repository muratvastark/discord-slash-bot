module.exports = {
	name: "say",
	description: "Say command.",
	options: [
		{
			name: "Text",
			description: "You can print something on the bot.",
			type: 3,
			required: true,
		},
	],
	async execute(_bot, say, interaction, args) {
		await say(interaction, args[0].value);
	},
};
