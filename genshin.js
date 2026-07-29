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
---------------------------------------------------
**Talent Priority**

**Main DPS Hexerei** :
Normal Attack > Elemental Burst > Elemental Skill

**Sub-DPS** :
Elemental Burst > Elemental Skill > Normal Attack (Can be ignored or saved for last)
------------------------------------------------------
📖**Best Hexerei Artifacts** :
1. A Day Carved from Rising Winds
2. Viridescent Venerer
3. Desert Pavillon Chronicle

📖**Best Artifacts** :
1. Viridescent Venerer
2. Emblem of Severed Fate
3. Nobless Oblige

📖**Best 4-Star Artifact** :
The Exile
-------------------------------------------------------
🏹**Best Hexerei Weapons** :
1. The Daybreak Chronicles
2. Astral Vulture’s Crimson Plumage
3. Aqua Simulacra

🏹**Best F2P** :
The Stringless
----------------------------------
🏹**Best Weapons** :
1. The Daybreak Chronicles
2. Elegy for the End
3. The Stringless

🏹**Best F2P** :
The Stringless
-------------------------------------------------------------
**Notable Teammates** :
**Main DPS** : 
Varka, Nicole, Klee, Ganyu

**Sub-DPS** : 
Durin, Lisa, Ineffa

**Support** :
Bennett

**Hexerei Teams** :
**Main DPS - Sub-DPS – Sub-DPS - Sub-DPS/Support**
    Varka  -  Venti  -  Durin  -     Nicole
    Venti  - Faruzan -  Durin  -     Bennett
    Venti  -  Fischl - Xingqiu -     Bennett

**Freeze Teams** : 
**Main DPS – Sub-DPS – Support – Support**
    Ayaka  -  Venti  -   Mona  -  Diona
    Ganyu  -  Venti  -  Shenhe -  Kokomi

**Electro-Charged Teams** :
**Main DPS – Sub-DPS – Sub-DPS/Support – Sub-DPS/Support**
    Ayato  -  Venti  -      Ororon     -      Fischl
Neuvillette - Venti  -      Ororon     -      Furina

**Hyperbloom Teams** : 
**Main DPS – Sub-DPS – Support – Support**
   Raiden  –  Nahida –  Venti  -  Kokomi
    Fischl - Xingqiu -  Venti  -  Collei

**Rainbow Teams** :
**Main DPS – Sub-DPS – Sub-DPS – Sub-DPS/Support**
   Mizuki  -  Venti  –  Fischl -    Xiangling
    Ayato  -  Venti  -  Fischl -    Bennett

**Air Fryer Teams** :
**Main DPS – Sub-DPS – Sub-DPS – Sub-DPS/Support**
   Nahida  -  Venti  -  Kazuha -    Bennett
   Emilie  -  Venti  -  Sucrose -   Bennett
-----------------------------------------------------------------------------------
  '              
            }

        };


        if (builds[personnage]) {

           const { EmbedBuilder } = require("discord.js");

        } else {

            await interaction.reply({
                content: `La fiche de build de **${personnage}** est en préparation !`,
                flags: MessageFlags.Ephemeral,
            });

        }
    }
};
