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





// Connexion du bot

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








// Gestion interactions

client.on(
    "interactionCreate",
    async interaction => {

console.log(
    "INTERACTION RECUE:",
    interaction.commandName,
    Date.now()
);
        
        try {



            // Autocomplete

            if (
                interaction.isAutocomplete()
            ) {


                const command =
                    client.commands.get(
                        interaction.commandName
                    );



                if (
                    !command ||
                    !command.autocomplete
                ) return;



                await command.autocomplete(
                    interaction
                );


                return;

            }






            // Slash commandes

            if (
                !interaction.isChatInputCommand()
            ) return;



            const command =
                client.commands.get(
                    interaction.commandName
                );



            if (!command) return;




            await command.execute(
                interaction
            );



        } catch(error) {



            console.error(
                "Erreur interaction :",
                error
            );



            if (
                interaction.deferred &&
                !interaction.replied
            ) {


                await interaction.editReply({

                    content:
                    "Une erreur est survenue."

                });


            }


            else if (
                !interaction.replied &&
                !interaction.deferred
            ) {


                await interaction.reply({

                    content:
                    "Une erreur est survenue.",

                    ephemeral:
                    true

                });


            }



        }


    }

);








// Logs

console.log(
    "Token présent:",
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
    "shardError",
    err => console.error(err)
);


client.on(
    "shardReady",
    id => console.log(
        "Shard prêt:",
        id
    )
);


client.on(
    "invalidated",
    () => console.log(
        "Session invalidée"
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
        "Erreur de login :",
        err
    );

});
