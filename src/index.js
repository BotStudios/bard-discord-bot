import { Bard } from "googlebard";
import config from "../config.js";
import { Client, Intents, MessageAttachment, MessageEmbed } from "discord.js";
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const bot = new Bard("__Secure-1PSID=" + config.cookie, {
  protocol: "https",
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function send(message, result, interaction) {
  function reply(content) {
    if (interaction) return interaction.editReply(content);
    message.reply(content);
  }
  const embeds = [];
  let tryCount = 3;
  while (result.length > 0 && tryCount > 0) {
    try {
      let end = Math.min(5000, result.length);
      embeds.push(new MessageEmbed().setDescription(`${result.slice(0, end)}`));
      result = result.slice(end, result.length);
    } catch (e) {
      tryCount--;
      console.log(e);
    }
  }
  if (embeds.length > 8) {
    reply({
      files: [
        new MessageAttachment(Buffer.from(result, "utf-8"), "message.txt"),
      ],
    });
  } else {
    reply({
      embeds,
    });
  }
}

if (config.messageCommand) {
  client.on("messageCreate", async (message) => {
    if (!message.content.startsWith("!ask")) return;
    const content = message.content.slice(5);
    try {
      const result = await bot.ask(content);
      await send(message, result);
    } catch (e) {
      console.log(e);
    }
  });
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName != "ask") return;
  const content = interaction?.options?.getString("prompt");
  if (!content) return;
  try {
    await interaction.deferReply();
    const result = await bot.ask(content);
    await send(null, result, interaction);
  } catch (e) {
    console.log(e);
  }
});

client.on("messageCreate", async (message) => {
  if (message.channel.type != "DM") return;
  if (message.author.bot) return;
  try {
    const result = await bot.ask(message.content, message.author.id);
    await send(message, result);
  } catch (e) {
    console.log(e);
  }
});

client.login(config.token);
