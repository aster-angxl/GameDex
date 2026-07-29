const {
    Client,
    GatewayIntentBits,
    Collection,
    REST,
    Routes
} = require("discord.js");

const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot en ligne !");
}).listen(process.env.PORT || 3000, () => {
    console.log("Serveur web démarré pour Render");
});


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


client.commands = new Collection();


// Chargement de la commande
const build = require("./commands/build.js");
client.commands.set(build.data.name, build);



client.once("ready", async () => {

    console.log(`Connecté en tant que ${client.user.tag}`);

    const rest = new REST({
        version: "10"
    }).setToken(process.env.DISCORD_TOKEN);

    try {

        await rest.put(
            Routes.applicationCommands(client.user.id),
            {
                body: [
                    build.data.toJSON()
                ]
            }
        );

        console.log("Commande /build enregistrée !");

    } catch (error) {

        console.error(error);

    }

});



// INTERACTIONS

client.on("interactionCreate", async interaction => {


    // AUTOCOMPLÉTION

    if (interaction.isAutocomplete()) {

        const command = client.commands.get(interaction.commandName);

        if (!command || !command.autocomplete) return;

        return command.autocomplete(interaction);

    }



    // COMMANDES

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (error) {

        console.error(error);

        if (interaction.replied || interaction.deferred) {

            await interaction.followUp({
                content: "Une erreur est survenue.",
                ephemeral: true
            });

        } else {

            await interaction.reply({
                content: "Une erreur est survenue.",
                ephemeral: true
            });

        }

    }

});



console.log(
    "Token présent:",
    !!process.env.DISCORD_TOKEN
);



client.on("error", err =>
    console.error(err)
);

client.on("debug", msg =>
    console.log("[DEBUG]", msg)
);

client.on("warn", msg =>
    console.log("[WARN]", msg)
);

client.on("shardError", err =>
    console.error(err)
);

client.on("shardReady", id => {

    console.log("Shard prêt:", id);

});

client.on("invalidated", () => {

    console.log("Session invalidée");

});



console.log("Avant login");

client.login(process.env.DISCORD_TOKEN)

.then(() =>
    console.log("Login envoyé à Discord")
)

.catch(err =>
    console.error("Erreur de login :", err)
);
