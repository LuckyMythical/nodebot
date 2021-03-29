const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  category: "info",
  usage: "help",
  description: "Delico's help command.",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Delico Help')
    .setAuthor(`Server: ${message.guild.name}`)
    .setDescription('The Prefix For this server is \`d.\`.')
    .addFields(
        { name: 'Help And Support', value: '[Guides](https://aeiou.luckymythic.repl.co/wiki)\n[Commands List](https://aeiou.luckymythic.repl.co/commands)\n[Delico Status](https://aeiou.luckymythic.repl.co/status)' },
        { name: 'Get Delico', value: '[Add Delico to your Server](https://aeiou.luckymythic.repl.co/invite)\n' },
        { name: '\u200B', value : '\u200B'},
     )
     .setFooter(`ID: ${message.author.id} | Pro2 | C28;S28`);

message.author.send(embed);
  }
}