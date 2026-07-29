const { SlashCommandBuilder } = require("discord.js");

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
    const personnage = interaction.options.getString("personnage");

    await interaction.reply(
      `La fiche de build de **${personnage}** est en préparation !`,
      ephemeral: true
    );
  }
};
