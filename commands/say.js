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
		/*
			Embed Usage:
			const { MessageEmbed } = require("discord.js");
			await bot.say(interaction, new MessageEmbed().setDescription(args[0].value));
		*/
	}
};
