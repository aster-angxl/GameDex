const { Client, 
GatewayIntentBits, Collection } 
= require("discord.js");

const client = new Client({
  intents: 
  [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const genshin = require("./genshin.js");
client.commands.set(genshin.data.name, genshin);

client.once("ready", async () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
  const {REST, Routes}=
  require ("discord.js");
  const genshin = require ("./genshin.js");
  const rest = new 
  REST ({version:"10"}).setToken(process.env.DISCORD_TOKEN)

  try {
    await rest.put(
    Routes.applicationCommands(client.user.id),
  {body:
  [genshin.data.toJSON()] }
    );
    console.log("Commande /build enregistrée!");
  } catch (error) {console.error(error);
  }
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

console.log("Token présent:", !!
process.env.DISCORD_TOKEN);

client.on("error", err =>
console.error(err));

client.on("debug", msg =>
console.log("[DEBUG]", msg));

client.on("warn", msg =>
console.log("[WARN]", msg));

client.on("shardError", err =>
console.error(err));

client.on("shardReady", (id) =>
{
console.log("Shard prêt:",
id);
});

client.on("invalidated", () => {console.log("Session invalidée");
});

console.log("Avant login");

client.login(process.env.DISCORD_TOKEN)
.then(()=>
console.log("Login envoyé à Discord"))
.catch(err=>
console.error("Erreur de login;", err));
