const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
	const pingozel = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`İşte Davet Linkim: [Tıkla](https://discordapp.com/oauth2/authorize?client_id=573906927109537792&permissions=2093317311&scope=bot)\nİşte DBL: [Tıkla](https://discordbots.org/bot/535772624039706644)\nİşte Destek Sunucum: [Tıkla](https://discord.gg/wzNAZxU)\nİşte Kod Yazma Sitem: [Tıkla](https://mrgamblerr-code.glitch.me)`)
    return message.channel.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botu ekle', 'botu davet et', 'botuekle', 'invite', 'site', 'link'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Botun davet linkini gönderir.',
  usage: 'davet'
};
