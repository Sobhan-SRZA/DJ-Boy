const
  {
    EmbedBuilder,
    WebhookClient,
    AttachmentBuilder
  } = require("discord.js"),
  post = require("./post"),
  copyright = require("../storage/embed"),
  config = require("../../config");

/**
 *
 * @param {Error} error
 * @returns {void}
 */
module.exports = function (error) {
  try {
    if (config.source.logger && config.discord.support.webhook.url) {
      let data = {
        avatarURL: config.discord.support.webhook.avatar,
        username: config.discord.support.webhook.username
      };
      const webhook = new WebhookClient(
        {
          url: config.discord.support.webhook.url
        }
      );
      const embed = new EmbedBuilder()
        .setAuthor(
          {
            name: `${error.message}`
          }
        )
        .setFooter(
          {
            text: copyright.footer.footerText,
            iconURL: copyright.footer.footerIcon
          }
        )
        .setTitle(`${copyright.emotes.default.error}| An error occurred!!`)
        .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
        .setColor(copyright.color.theme)
        .addFields(
          [
            {
              name: `${copyright.emotes.default.entry}| Name:`,
              value: `${error.name}`
            }
          ]
        );

      if (error.code)
        embed.addFields(
          [
            {
              name: `${copyright.emotes.default.prohibited}| Code:`,
              value: `${error.code}`
            }
          ]
        );

      if (error.status)
        embed.addFields(
          [
            {
              name: `${copyright.emotes.default.globe}| httpStatus:`,
              value: `${error.status}`
            }
          ]
        );

      embed.addFields(
        [
          {
            name: `${copyright.emotes.default.clock}| Timestamp:`,
            value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`
          }
        ]
      );
      if (error.stack.length < 4087)
        data.embeds = [embed];

      else {
        data.content = `**${copyright.emotes.default.entry}| Name: \`${error.name}\`${error.code ?
          `\n${copyright.emotes.default.prohibited}| Code: \`${error.code}\`` : ""
          }${error.status ?
            `\n${copyright.emotes.default.globe}| httpStatus: \`${error.status}\`` : ""
          }\n${copyright.emotes.default.clock}| Timestamp: <t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`;

        data.files = [
          new AttachmentBuilder()
            .setDescription(error.name)
            .setName("error_message.txt")
            .setFile(Buffer.from(error.stack))
        ];
      }

      if (config.discord.support.webhook.threads.bugs)
        data.threadId = config.discord.support.webhook.threads.bugs;

      return webhook.send(data);
    }

    else
      console.log(error);

  } catch (e) {
    post("Error logger to discord webhook have bug!!", "E", "red", "redBright");
    console.log(e);
    post("Main Error:", "E", "red", "redBright");
    console.log(error);
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */