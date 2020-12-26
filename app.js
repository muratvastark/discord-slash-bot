const { Client, APIMessage } = require("discord.js");
const { readdirSync } = require("fs");
const Bot = new Client();
const Config = require("./config");
const Commands = [];
const cmdFiles = readdirSync("./commands").filter((file) =>
	file.endsWith(".js"),
);

Bot.on("ready", async () => {
	for (const fileName of cmdFiles) {
		const File = require(`./commands/${fileName}`);
		Commands.push(File);
		await Bot.api.applications(Bot.user.id).commands.post({
			data: {
				name: File.name,
				description: File.description,
				options: File.options,
			},
		});
	}
	console.info(`Logged in as ${Bot.user.username}`);
});

Bot.ws.on("INTERACTION_CREATE", (interaction) => {
	const CMDFile = Commands.find(
		(cmd) => cmd.name.toLowerCase() === interaction.data.name.toLowerCase(),
	);
	if (CMDFile)
		CMDFile.execute(Bot, say, interaction, interaction.data.options);
});

Bot.login(Config.token);

async function say(interaction, content) {
	return Bot.api
		.interactions(interaction.id, interaction.token)
		.callback.post({
			data: {
				type: 4,
				data: await createAPIMessage(interaction, content),
			},
		});
}

async function createAPIMessage(interaction, content) {
	const apiMessage = await APIMessage.create(
		Bot.channels.resolve(interaction.channel_id),
		content,
	)
		.resolveData()
		.resolveFiles();
	return { ...apiMessage.data, files: apiMessage.files };
}
