module.exports = {
	name: "say",
	description: "Say command.",
	options: [
		{
			name: "Text",
			description: "You can print something on the bot.",
			type: 3,
			required: true
		}
	],
	async execute(bot, interaction, args) {
		await bot.say(interaction, args[0].value);
	}
};
