const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Kime Bok Yedirmemi İstersin? Kurucu, yetkili veya gıcık kaptığın biri he?? :)');
    const embed = new Discord.RichEmbed()
        .setAuthor('')
        .setColor(255, 165, 0)
        .setImage(`https://media.giphy.com/media/26gJzZ42vXY6eimLS/giphy.gif`)
        .setDescription(`${mesaj}` + ',' + message.author.username + ' sana **Bok** Yedirdi Umarım Tadı Kötüdür, Ağla lan veled...')
    return message.channel.sendEmbed(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bok-ye"],
    permLevel: 0
};

exports.help = {
    name: 'bokye',
    description: 'İstediğiniz kişiyi Öpersiniz',
    usage: 'bokye'
};