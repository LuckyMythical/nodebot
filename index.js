const { DiscordInteractions } = require("slash-commands");
const discord = require ('discord.js');
const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const client = new discord.Client({
  disableEveryone: true
});
const { prefix, mongodbUrl, id, clientSecret, domain, port } = require('./config.json');
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const { config } = require('dotenv');
const express = require('express');
const app = express();
var path = require("path");
var bodyParser = require("body-parser")

const GuildSettings = require("./models/settings");
const Dashboard = require("./dashboard/dashboard");

app.use(bodyParser.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs")
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { client: client });
});

app.get('/commands', (req, res) => {
  res.render('commands', { client: client, prefix: prefix });
});

app.get('/stats', (req, res) => {
  res.render('stats', { client: client });
});

app.get('/wiki', (req, res) => {
  res.render('wiki', { client: client });
});

app.get('/status', (req, res) => {
  res.render('status', { client: client });
});

app.get('/invite', (req, res) => {
  res.render('invite', { client: client });
});

app.get('/invite/thanks', (req, res) => {
  res.render('thanksinvite', { client: client });
});

app.get('/discord', (req, res) => {
  res.render('discord', { client: client });
});

app.get('/dashboard', (req,res) => {
  res.render('dashboard', { client: client });
})

const activities_list = [
  "the game counting",
  "Delico™",
  `${client.guilds.cache.size} servers.`,
  `d.help`
];

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on('ready', () => {
  console.log(`${client.user.tag} is online.`);
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index], { type: "WATCHING" });
  }, 15000);
});

client.on("message", async message => {
   

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});


// We listen for message events.
client.on("message", async (message) => {
  // Declaring a reply function for easier replies - we grab all arguments provided into the function and we pass them to message.channel.send function.
  const reply = (...arguments) => message.channel.send(...arguments);

  // Doing some basic command logic.
  if (message.author.bot) return;
  if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
 
  // Retriving the guild settings from database.
  var storedSettings = await GuildSettings.findOne({ gid: message.guild.id });
  if (!storedSettings) {
    // If there are no settings stored for this guild, we create them and try to retrive them again.
    const newSettings = new GuildSettings({
      gid: message.guild.id
    });
    await newSettings.save().catch(()=>{});
    storedSettings = await GuildSettings.findOne({ gid: message.guild.id });
  }

  // If the message does not start with the prefix stored in database, we ignore the message.
  if (message.content.indexOf(storedSettings.prefix) !== 0) return;

  // We remove the prefix from the message and process the arguments.
  const args = message.content.slice(storedSettings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If command is ping we send a sample and then edit it with the latency.
  if (command === "ping") {
    const roundtripMessage = await reply("Pong!");
    return roundtripMessage.edit(`*${roundtripMessage.createdTimestamp - message.createdTimestamp}ms*`);
  }
});

// Listening for error & warn events.
client.on("error", console.error);
client.on("warn", console.warn);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

client.login(process.env.TOKEN);