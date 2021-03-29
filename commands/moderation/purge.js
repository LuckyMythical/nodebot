const Discord = require('discord.js');

module.exports = {
  name: 'purge',
  description: 'Allows you to purge between 2 and 100 messages',
  usage: 'Purge all: purge [number of messages]\n Purge by user: purge [user mention] [number of messages]',
  category: 'moderation',
  cooldown: 25000,
  run: async (client, message, args) => {
    // Parse args
    let deleteCount = parseInt(args[0], 10)
    // Check if Delete Count is bigger than discord can handle
    if (deleteCount > 100) {
      // Delete only 100 messages
      deleteCount = 100
      // Notify user about this
      message.channel.send('Can handle only 100 messages. Deleting 100 messages').then(e => setTimeout(() => e.delete(), 2000))
    }
    // Delete only one message if not specified how many
    if (Number.isNaN(deleteCount)) deleteCount = 1
    // console.log([deleteCount, typeof (deleteCount)])
    try {
      // Delete user message
      await message.delete()
      // Fetch messages
      const fetched = await message.channel.messages.fetch({ limit: deleteCount })
      // Delete messages
      if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        await message.channel.bulkDelete(fetched)
      }
    } catch (error) {
      // Handle error
      const errorEmbed = new Discord.MessageEmbed()
      .setTitle('Whoops... This is embarassing.')
      .setThumbnail('https://emoji.gg/assets/emoji/6246_redtick.png?t=1615772105')
      .setDescription(`<:delicox:820832909983350825> | It seems like this command has an error, please copy the code below this embed to show us the error. Join the server [here](https://aeiou.luckymythic.repl.co/discord)`)
      message.channel.send(errorEmbed)
      .then(el => setTimeout(() => el.delete(), 15000))
      message.channel.send(`\`\`\`js\n${error}\`\`\``)
        // Delete error message
        .then(el => setTimeout(() => el.delete(), 15000))
      // Exit function
      return 0
    }
    // Notify if success
    message.channel.send(`Successfully deleted ${deleteCount} ${deleteCount === 1 ? 'message' : 'messages'}.`).then(el => setTimeout(() => el.delete(), 3000))
    return 0
  }
}


