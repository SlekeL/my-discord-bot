const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Show info about this server"),
  async execute(interaction) {
    const { guild } = interaction;
    await interaction.reply({
      content: `Server: ${guild.name}\nMembers: ${guild.memberCount}\nOwner: ${guild.ownerId ? "<@" + guild.ownerId + ">" : "Unknown"}`,
      ephemeral: true,
    });
  },
};