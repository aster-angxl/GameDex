const {
    Client,
    GatewayIntentBits,
    Collection,
    REST,
    Routes
} = require("discord.js");

const http = require("http");


// Serveur Render
http.createServer((req, res) => {

    res.writeHead(200);
    res.end("Bot en ligne !");

}).listen(process.env.PORT || 3000, () => {

    console.log("Serveur web démarré pour Render");

});




// Client Discord

const client = new Client({

    intents: [
        GatewayIntentBits.Guilds
    ]

});



client.commands = new Collection();




// Chargement commandes

const build = require("./commands/build.js");

client.commands.set(
    build.data.name,
    build
);





// Quand le bot est prêt

client.once("ready", async () => {


    console.log(
        `Connecté en tant que ${client.user.tag}`
    );



    const rest = new REST({

        version: "10"

    }).setToken(
        process.env.DISCORD_TOKEN
    );



    try {


        await rest.put(

            Routes.applicationCommands(
                client.user.id
            ),

            {

                body: [
                    build.data.toJSON()
                ]

            }

        );


        console.log(
            "Commande /build enregistrée !"
        );



    } catch(error) {


        console.error(
            "Erreur enregistrement commandes :",
            error
        );


    }


});







// Interactions Discord

client.on(
    "interactionCreate",
    async interaction => {


        console.log(
            "INTERACTION RECUE :",
            interaction.type,
            interaction.commandName,
            new Date().toISOString()
        );




        // Autocomplete

        if (interaction.isAutocomplete()) {


            const command =
                client.commands.get(
                    interaction.commandName
                );


            if (
                !command ||
                !command.autocomplete
            ) return;



            try {

                await command.autocomplete(
                    interaction
                );


            } catch(error) {

                console.error(
                    "Erreur autocomplete :",
                    error
                );

            }


            return;

        }







        // Commandes slash

        if (!interaction.isChatInputCommand()) return;



        const command =
            client.commands.get(
                interaction.commandName
            );



        if (!command) return;




        try {


            console.log(
                "Lancement execute()"
            );



            await command.execute(
                interaction
            );



            console.log(
                "Execute terminé"
            );



        } catch(error) {



            console.error(
                "Erreur interaction :",
                error
            );



            try {


                if (
                    interaction.replied ||
                    interaction.deferred
                ) {


                    await interaction.followUp({

                        content:
                            "Une erreur est survenue.",

                        ephemeral:
                            true

                    });


                } else {


                    await interaction.reply({

                        content:
                            "Une erreur est survenue.",

                        ephemeral:
                            true

                    });


                }


            } catch(err) {


                console.error(
                    "Erreur réponse Discord :",
                    err
                );


            }


        }


    }

);






// Logs

console.log(
    "Token présent :",
    !!process.env.DISCORD_TOKEN
);


client.on(
    "error",
    err => console.error(err)
);


client.on(
    "debug",
    msg => console.log("[DEBUG]", msg)
);


client.on(
    "warn",
    msg => console.log("[WARN]", msg)
);


client.on(
    "shardReady",
    id => console.log(
        "Shard prêt :",
        id
    )
);





console.log(
    "Avant login"
);



client.login(
    process.env.DISCORD_TOKEN
)

.then(() => {

    console.log(
        "Login envoyé à Discord"
    );

})

.catch(err => {


    console.error(
        "Erreur login :",
        err
    );


});
