const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Bakman için o kadar yetkin yok...');
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`Davet Eden Kullanıcı: ${invites.inviter.username} \nDavet Ettiği Kullanıcı Sayısı:  ${invites.uses}`)
    })

  var bilgi = "Davet Edenler = Davet Edilen Kullanıcı Sayısı"

    const embed = new Discord.RichEmbed()
        .setTitle(`Davet Listesi`)
        .setColor(0xCB5A5E)
    .setDescription(`**${bilgi}** \n\n${possibleinvites.join('\n\n')}`)
    .setThumbnail(message.guild.iconURL)
        .setTimestamp()
    message.channel.send(embed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davetler',
  description: 'Botun davet linkini gönderir.',
  usage: 'davet'
};
