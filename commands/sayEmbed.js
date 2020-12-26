const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "sayembed",
	description: "Say command with embed.",
	options: [
		{
			name: "Text",
			description: "You can print something on the bot.",
			type: 3,
			required: true,
		},
	],
	async execute(bot, say, interaction, args) {
		const embed = new MessageEmbed()
			.setDescription(args[0].value)
			.setColor("RANDOM")
			.setTimestamp()
			.setFooter(bot.user.username);
		await say(interaction, embed);
	},
};
