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
        .setAutocomplete(true)
),

    async execute(interaction) {

        const personnage = interaction.options.getString("personnage").toLowerCase();

        const builds = {

venti: {
    nom: "Venti",

    source: "Game8",
    update: "30/07/2026",

    embeds: [

                    {
                        title: "🌪️ Venti - Informations",
                        description: `
⭐ **Global Rating:** S

⚔️ **Main DPS:** S
🔹 **Sub-DPS:** S
🛡️ **Support:** -
🗺️ **Exploration:** SS

**Rôle :**
Hexerei Main DPS / Sub-DPS
                        `
                    },


                    {
                        title: "🏹 Venti - Builds & Équipements",
                        description: `
## 🌪️ Hexerei Main DPS

🏹 **Best Weapon**
The Daybreak Chronicles

🔄 **Replacement Weapons**
1. Astral Vulture's Crimson Plumage
2. Aqua Simulacra
3. Compound Bow

📖 **Best Artifacts**
A Day Carved from Rising Winds (4pcs)

📊 **Main Stats**
• Sands: ATK %
• Goblet: Anemo DMG Bonus
• Circlet: CRIT Rate / CRIT DMG

📈 **Sub Stats**
• Elemental Mastery
• Energy Recharge
• ATK %
• CRIT Rate
• CRIT DMG


━━━━━━━━━━━━━━━━━━


## 🌪️ Elemental Mastery Swirl

🏹 **Best Weapon**
Elegy for the End

🔄 **Replacement Weapons**
1. The Stringless
2. Fading Twilight
3. Favonius Warbow

📖 **Best Artifacts**
Viridescent Venerer (4pcs)

📊 **Main Stats**
• Sands: Elemental Mastery
• Goblet: Elemental Mastery
• Circlet: Elemental Mastery
                        `
                    },


                    {
                        title: "⚔️ Venti - Crit Burst & Talents",
                        description: `
## 💥 Crit Burst DPS

🏹 **Best Weapon**
Aqua Simulacra

🔄 **Replacement Weapons**
1. Elegy for the End
2. Skyward Harp
3. The Stringless


📖 **Best Artifacts**
Viridescent Venerer (4pcs)


📊 **Main Stats**
• Sands: ATK %
• Goblet: Anemo DMG Bonus
• Circlet: CRIT Rate / CRIT DMG


📈 **Sub Stats**
• CRIT Rate
• CRIT DMG
• Elemental Mastery
• Energy Recharge


━━━━━━━━━━━━━━━━━━


## 📖 Talent Priority

**Main DPS Hexerei**
Normal Attack > Elemental Burst > Elemental Skill

**Sub-DPS**
Elemental Burst > Elemental Skill > Normal Attack
                        `
                    },


                    {
                        title: "👥 Venti - Teams",
                        description: `
## 🤝 Compagnons notables

**⚔️ Main DPS**
• Varka
• Nicole
• Klee
• Ganyu

**🔹 Sub-DPS**
• Durin
• Lisa
• Ineffa

**🛡️ Support**
• Bennett


━━━━━━━━━━━━━━━━━━


## 🌪️ Hexerei Teams

Venti - Faruzan - Durin - Bennett

Venti - Fischl - Xingqiu - Bennett


## ❄️ Freeze Teams

Ayaka - Venti - Mona - Diona

Ganyu - Venti - Shenhe - Kokomi


## 🌱 Hyperbloom Teams

Raiden - Nahida - Venti - Kokomi

Fischl - Xingqiu - Venti - Collei


## ⚡ Electro-Charged Teams

Ayato - Venti - Ororon - Fischl

Neuvillette - Venti - Ororon - Furina
`
                    },


                    {
                        title: "✨ Venti - Best Constellations",
                        description: `
✨ **Best Constellations**

C1  
⭐⭐☆

C2  
⭐⭐⭐

C6  
⭐⭐☆

━━━━━━━━━━━━━━━━━━
                        `
                    }

                ]
            }

        };


        if (builds[personnage]) {

            const embeds = builds[personnage].embeds.map(e =>
                new EmbedBuilder()
                    .setTitle(e.title)
                    .setDescription(e.description)
                   .setFooter({
    text: `GameDex • Source : ${builds[personnage].source} • Update : ${builds[personnage].update}`
})
            );


            await interaction.reply({
                embeds: embeds,
                flags: MessageFlags.Ephemeral
            });


        } else {

            await interaction.reply({
                content: `La fiche de build de **${personnage}** est en préparation !`,
                flags: MessageFlags.Ephemeral
            });

        }
    }
};
