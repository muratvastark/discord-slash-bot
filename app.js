const Discord = require("discord.js");
const fs = require("fs");
const Bot = new Discord.Client();
const Config = (Bot.Config = require("./config"));

Bot.once("ready", () => {
	let CommandFiles = fs.readdirSync("./commands").filter((_file) => _file.endsWith(".js"));
	for (let CommandFile of CommandFiles) {
		const File = require(`./commands/${CommandFile}`);
		Bot.api.applications(Bot.user.id).commands.post({
			data: {
				name: File.name,
				description: File.description,
				options: File.options
			}
		});
		Bot.ws.on("INTERACTION_CREATE", (interaction) => {
			if (interaction.data.name.toLowerCase() === File.name.toLowerCase()) File.execute(Bot, interaction, interaction.data.options);
		});
	}
});

Bot.login(Config.Token).catch(console.error);

Bot.say = async function (interaction, content) {
	return Bot.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 4,
			data: await createAPIMessage(interaction, content)
		}
	});
};

async function createAPIMessage(interaction, content) {
	const apiMessage = await Discord.APIMessage.create(Bot.channels.resolve(interaction.channel_id), content).resolveData().resolveFiles();
	return { ...apiMessage.data, files: apiMessage.files };
}
