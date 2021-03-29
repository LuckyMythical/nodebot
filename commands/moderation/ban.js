const Discord = require('discord.js');

module.exports = {
  name: "ban",
  description: "Ban Someone.",
  run: (client, message, args) => {
    //Find our ban & Reasons
    let banned = message.mentions.users.first() || client.users.resolve(args[0]);
    let reason = args.slice(1).join(" ");

    // MESSAGES
  
    if (!banned) {
      let baninfoembed = new Discord.MessageEmbed()
        .setTitle("Command: ban")
        .setDescription(
          `**Description:** Ban a member, optional time limit. \n` +
            "**Sub Commands:**\n" +
            "-ban save | Ban a user and save their messages in chat. \n" +
            "**Usage:**\n" +
            'ban [user] (limit) (reason) \n' +
            "d.ban save [user] (limit) (reason) \n" +
            "**Examples:** \n" +
            "d.ban <@818284557521911818> 48h spam \n" +
            "d.ban save <@818284557521911818> 48h spam "
        )
        .setColor("#2C2F33");
      message.channel.send(baninfoembed);
  
      return;
    }
    else {
      let banembed = new Discord.Message.Embed()
        .setTitle("<:delicox:820832909983350825> | Error Running this command.")
        .setDescription("There was a problem with this command. Please check the error code below and report it to us as soon as possible.")
        message.channel.send(banembed)
        message.channel.send(`\`\`\`js\nError code 460: No User chosen.\`\`\``)
    }

  }
}
