const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require("discord.js");

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

⚔️ **Main DPS:** S
🔹 **Sub-DPS:** S
🛡️ **Support:** -
🗺️ **Exploration:** SS

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
`
            }

        };


        if (builds[personnage]) {

            const embed = new EmbedBuilder()
                .setTitle(`🌪️ ${builds[personnage].nom}`)
                .setDescription(builds[personnage].texte)
                .setFooter({
                    text: "GameDex • Genshin Impact Builds"
                });

            await interaction.reply({
                embeds: [embed],
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
