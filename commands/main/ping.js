module.exports = {
  name: "ping",
  description: "Get Delico's Ping.",
  usage: "d.ping",
  category: "main",
  run: (client, message) => {
    message.channel.send(`🏓 Pong! - \`${client.ws.ping}ms\``);
  }
}