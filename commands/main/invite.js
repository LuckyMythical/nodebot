const Discord = require('discord.js');

module.exports = {
  name: "invite",
  description: "Invite Delico to your Discord Server.",
  run: async (client, message) => {
    const embed= new Discord.MessageEmbed()
    .setColor('#940000')
    .setTitle('Invite Delico to Your Discord Server.')
    .setDescription('[Click Here](https://aeiou.luckymythic.repl.co/invite) to invite Delico to your Discord Server!')
    .setTimestamp()
    .setFooter('Copyright © Mythic Support 2021. All Rights Reserved.')
    message.channel.send(embed)
  }
}