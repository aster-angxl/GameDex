const { Client, GatewayIntentBits, Collection, REST, Routes } = require("discord.js");

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


const genshin = require("./genshin.js");
client.commands.set(genshin.data.name, genshin);



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
                    genshin.data.toJSON()
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


        const texte = interaction.options
            .getFocused()
            .toLowerCase();


        let personnages = [];


        // Salon Genshin

        if (interaction.channel.name === "genshin-impact") {


            personnages = [
                "Venti",
                "Furina",
                "Navia",
                "Zhongli",
                "Raiden Shogun"
            ];

        }



        // Salon Honkai Star Rail

        else if (interaction.channel.name === "honkai-star-rail") {


            personnages = [
                "Herta",
                "Kafka",
                "Firefly",
                "Acheron"
            ];

        }



        const resultats = personnages
            .filter(personnage =>
                personnage
                    .toLowerCase()
                    .startsWith(texte)
            )
            .slice(0, 25);



        await interaction.respond(
            resultats.map(personnage => ({
                name: personnage,
                value: personnage
            }))
        );


        return;

    }




    // COMMANDES NORMALES

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

    console.log(
        "Shard prêt:",
        id
    );

});


client.on("invalidated", () => {

    console.log(
        "Session invalidée"
    );

});



console.log("Avant login");



client.login(process.env.DISCORD_TOKEN)

.then(() =>
    console.log("Login envoyé à Discord")
)

.catch(err =>
    console.error("Erreur de login;", err)
);
