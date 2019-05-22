const Discord = require('discord.js');
const db = require('quick.db');
module.exports = member => {
    const channel = member.guild.channels.find('name', '');
    if (!channel) return;
   const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
   .setTitle('Üye Sunucuya Katıldı')
   .setDescription(`<a:v3:538057719899357194> Sunucuya Katıldı **${member.guild.memberCount}** Üye !`)
   .setFooter('- BHDR Giriş Sistemi')
   .setTimestamp()
   if(db.has(`girişçıkış_${member.guild.id}`) === true) return member.guild.channels.get(db.fetch(`girişçıkış_${member.guild.id}`)).send(embed);
   //channel.send(embed);
};