# [Bard](https://bard.google.com) on [Discord](https://discord.com/) <img src="https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg" width="35px" />
A discord.js bot with **Google's Bard** integration 

> This project is made possible by [PawanOsman's GoogleBard library](https://github.com/PawanOsman/GoogleBard)

## About
- Supports reply by `Message Content` or `Interaction Reply`
- Uses `discord.js@v13` (not LTS)
- Supports continuous conversation (DM only)
- Easy to setup (need an access to Bard)

<table>
  <tr>
    <td align="center" style="padding=0;width=50%;">
      <img src="https://user-images.githubusercontent.com/81070048/235217555-daf918db-cfcf-49c2-b1cc-36ff15cadbb8.gif" width="400">
    </td>
    <td align="center" style="padding=0;width=50%;">
      <img src="https://user-images.githubusercontent.com/81070048/235220367-3cbac016-70b6-4056-a670-ad77accb8015.gif" width="425">
    </td>
  </tr>
</table>

## How to setup
**Grab cookie**
1. Visit [bard.google.com](https://bard.google.com) 
2. Press F12 (open developer console)
3. Go to Application → Cookies → `__Secure-1PSID`. Copy the value of that cookie.

**Setup the bot**
1. Edit [`config.js`](/config.js), replace `COOKIE` with the cookie you've just copied & `TOKEN` with your Discord bot's token
2. Run the following commands to start the bot
```sh
$ npm install # install dependencies 
$ npm run register # to register a slash command (you only have to run once)
$ npm start # start the bot
```

**Ways to use**
- Use `/ask prompt:<YOUR_QUESTION>` to ask a question (after registering the slash command)
- DM the bot with your question (for continuous conversation)

> **Note** 
> For **MessageCommand Support**
> 1. Enable the **Message Content Intent** in your [Discord Bot Portal](https://discord.com/developers) - place where you obtain your bot token
> 2. Set the value of `messageCommand` in [config.js](/config.js) to `true`
> 
> You may now send `!ask <PROMPT>` in a server/guild, this is tantamount to the `/ask` slash command

## License
This project is available as an open source under the terms of the [MIT License](/LICENSE)
