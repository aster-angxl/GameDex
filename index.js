const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection();

const genshin = require("./genshin.js");
client.commands.set(genshin.data.name, genshin);

client.once("ready", () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Une erreur est survenue.",
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
