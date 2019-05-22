const Discord = require('discord.js');
const db = require('quick.db');

module.exports = member => {
    const channel = member.guild.channels.find('name', '');
    if (!channel) return;
   const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
   .setTitle('Üye Sunucudan Ayrıldı')
   .setDescription(`<a:v4:538057718913826826> Sunucudan Ayrıldı **${member.guild.memberCount}** Üye !`)
   .setFooter('- BHDR Çıkış Sistemi')
   .setTimestamp()
   if(db.has(`girişçıkış_${member.guild.id}`) === true) return member.guild.channels.get(db.fetch(`girişçıkış_${member.guild.id}`)).send(embed);
   //channel.send(embed);
};
