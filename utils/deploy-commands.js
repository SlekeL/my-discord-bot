const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

console.log("Deploying commands...");

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const commandPath = path.join(__dirname, "../commands", file);
  console.log(`Loading: ${commandPath}`);
  const command = require(commandPath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    if (process.env.GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log("✅ Guild commands deployed successfully!");
    } else {
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      console.log("🌍 Global commands deployed successfully!");
    }
  } catch (error) {
    console.error("💥 Deployment failed:", error.message);
  }
})();