const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot say something")
    .addStringOption(option =>
      option.setName("message")
        .setDescription("The message to repeat")
        .setRequired(true)),
  async execute(interaction) {
    const msg = interaction.options.getString("message");
    await interaction.reply(`${interaction.user.username} says: ${msg}`);
  },
};