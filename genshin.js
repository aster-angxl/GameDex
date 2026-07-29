const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("build")
        .setDescription("Affiche un build Genshin")
        .addStringOption(option =>
            option
                .setName("personnage")
                .setDescription("Nom du personnage")
                .setRequired(true)
        ),

    async execute(interaction) {

        const personnage = interaction.options.getString("personnage").toLowerCase();

        const builds = {

            venti: {
                nom: "Venti",
                texte: `
🌪️ **Venti**

⭐ **Global Rating:** S
---------------------
⚔️ **Main DPS:** S
🔹 **Sub-DPS:** S
🛡️ **Support:** -
🗺️ **Exploration:** SS
---------------------
**Hexrei Main DPS**

🏹 **Best Weapon**
The Daybreak Chronicles

🔄 **Replacement Weapons**
1. Astral Vulture's Crimson Plumage
2. Aqua Simulacra
3. Compound Bow

📖 **Best Artifacts**
A Day Carved from Rising Winds (4pcs)

📊 **Artifact Main Stats**
• Sands: ATK %
• Goblet: Anemo DMG Bonus
• Circlet: CRIT Rate ou CRIT DMG

📈 **Artifact Sub Stats**
• Elemental Mastery
• Energy Recharge
• ATK %
• CRIT Rate
• CRIT DMG

👥 **Sample Team**
Venti - Bennett - Faruzan - Durin
---------------------
**Sub-DPS Builds**
----------------
**Elemental Mastery Swirl**

🏹**Best Weapon** → Elegy for the End

🔄**Replacement Weapon** : 1 : The Stringless
                           2 : Fading Twilight
                           3 : Favonius Warbow

📖**Best Artifacts** : Viridescent Venerer (4pcs)

📊**Artifact Main Stats** : Sands : Elemental Mastery
                            Goblet : Elemental Mastery
                            Circlet : Elemental Mastery  

📈**Artifact Sub Stats** : Elemental Mastery, Energy Recharge, ATK %, CRIT Rate, CRIT DMG

👥**Sample Team** : Freeze : Venti, Ayaka, Mona, Diona
                    Hyperbloom : Venti, Raiden, Nahida, Kokomi
-------------------------------------------------------------
**Crit Burst DPS**

🏹**Best Weapon** → Aqua Simulacra

🔄**Replacement Weapon** : 1 : Elegy for the End
                           2 : Skyward Harp
                           3 : The Stringless

📖**Best Artifacts** : Viridescent Venerer (4pcs)

📊**Artifact Main Stats** : Sands : ATK %
                            Goblet : Anemo DMG Bonus
                            Circlet : CRIT Rate or CRIT DMG

📈**Artifact Sub Stats** : CRIT Rate, CRIT DMG, Elemental Mastery, Energy Recharge 

👥**Sample Team** : Freeze : Venti, Ayaka, Mona, Diona
                    Hyperbloom : Venti, Raiden, Nahida, Kokomi
`
            }

        };


        if (builds[personnage]) {

            await interaction.reply({
                content: builds[personnage].texte,
                flags: MessageFlags.Ephemeral,
            });

        } else {

            await interaction.reply({
                content: `La fiche de build de **${personnage}** est en préparation !`,
                flags: MessageFlags.Ephemeral,
            });

        }
    }
};
