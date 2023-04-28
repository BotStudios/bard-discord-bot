import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "../config.js";
const commands = [
  {
    name: "ask",
    description: "Talk to Bard",
    options: [
      {
        name: "prompt",
        description: "Ask a question",
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "9" }).setToken(config.token);

(async () => {
  const { id, bot } = await rest.get("/oauth2/applications/@me");
  try {
    console.log(`
    [Registering Slash Commands]: ${bot?.username}#${bot?.discriminator}`);
    await rest.put(Routes.applicationCommands(id), { body: commands });
    console.log(`
    [Success]: registered (/ask) application command
    `);
  } catch (error) {
    console.error(error);
  }
})();
