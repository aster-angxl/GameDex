const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


const genshin = require("../data/Genshin");
const hsr = require("../data/hsr.js");
const wuwa = require("../data/wuwa.js");
const arknights = require("../data/arknights.js");



const builds = {

    genshin,
    hsr,
    wuwa,
    arknights

};





module.exports = {


    data: new SlashCommandBuilder()

        .setName("build")

        .setDescription("Affiche un build de personnage")



        .addStringOption(option =>

            option

                .setName("jeu")

                .setDescription("Choisis un jeu")

                .setRequired(true)

                .addChoices(

                    {
                        name: "Genshin Impact",
                        value: "genshin"
                    },

                    {
                        name: "Honkai: Star Rail",
                        value: "hsr"
                    },

                    {
                        name: "Wuthering Waves",
                        value: "wuwa"
                    },

                    {
                        name: "Arknights: Endfield",
                        value: "arknights"
                    }

                )

        )



        .addStringOption(option =>

            option

                .setName("personnage")

                .setDescription("Choisis un personnage")

                .setRequired(true)

                .setAutocomplete(true)

        ),






    async autocomplete(interaction) {


        const jeu =

            interaction.options.getString("jeu")
            || "genshin";



        const texte =

            interaction.options
                .getFocused()
                .toLowerCase();



        const liste =

            builds[jeu]
            || {};



        const personnages =

            Object.keys(liste);



        const resultats =

            personnages

                .filter(personnage =>

                    personnage
                        .toLowerCase()
                        .startsWith(texte)

                )

                .slice(0, 25);





        await interaction.respond(

            resultats.map(personnage => ({

                name:

                    personnage

                        .split(" ")

                        .map(mot =>

                            mot.charAt(0).toUpperCase()
                            + mot.slice(1)

                        )

                        .join(" "),



                value:

                    personnage

            }))

        );


    },








    async execute(interaction) {


        console.log(
            "Commande /build reçue"
        );



        // Réponse immédiate à Discord

        await interaction.deferReply({

            ephemeral: true

        });




        try {



            const jeu =

                interaction.options
                    .getString("jeu");




            const personnage =

                interaction.options

                    .getString("personnage")

                    .toLowerCase();




            console.log(
                "Jeu :",
                jeu
            );


            console.log(
                "Personnage :",
                personnage
            );




            console.log(
                "Disponibles :",
                Object.keys(builds[jeu] || {})
            );






            const build =

                builds[jeu]?.[personnage];






            if (!build) {


                return interaction.editReply({

                    content:

                        "Ce build n'existe pas encore."

                });


            }







            const embeds =

                build.embeds.map(e =>


                    new EmbedBuilder()

                        .setTitle(
                            e.title
                        )

                        .setDescription(
                            e.description
                        )

                        .setFooter({

                            text:

                                `GameDex • Source : ${build.source} • Update : ${build.update}`

                        })


                );






            await interaction.editReply({

                embeds

            });




            console.log(
                "Build envoyé"
            );




        } catch(error) {



            console.error(
                "Erreur /build :",
                error
            );



            await interaction.editReply({

                content:

                    "Une erreur est survenue pendant le chargement du build."

            });



        }


    }


};
