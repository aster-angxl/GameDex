const {
    SlashCommandBuilder,
    EmbedBuilder,
    MessageFlags
} = require("discord.js");


const genshin = require("../data/genshin.js");
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
            interaction.options.getString("jeu") || "genshin";


        const texte =
            interaction.options
                .getFocused()
                .toLowerCase();



        const liste =
            builds[jeu] || {};



        const personnages =
            Object.keys(liste);



        console.log("Jeu :", jeu);
        console.log("Personnages :", personnages);



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
                    personnage.charAt(0).toUpperCase()
                    + personnage.slice(1),

                value:
                    personnage

            }))

        );

    },




    async execute(interaction) {


        const jeu =
            interaction.options.getString("jeu");


        const personnage =
            interaction.options
                .getString("personnage")
                .toLowerCase();



        const build =
            builds[jeu]?.[personnage];



        if (!build) {

            return interaction.reply({

                content:
                    "Ce build n'existe pas encore.",

                flags:
                    MessageFlags.Ephemeral

            });

        }




        const embeds =
            build.embeds.map(e =>

                new EmbedBuilder()

                    .setTitle(e.title)

                    .setDescription(e.description)

                    .setFooter({

                        text:
                            `GameDex • Source : ${build.source} • Update : ${build.update}`

                    })

            );




        await interaction.reply({

            embeds,

            flags:
                MessageFlags.Ephemeral

        });

    }

};
