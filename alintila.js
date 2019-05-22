const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  const id = args[0]
  if (!id) return message.channel.send(`Bu Kanalda Yazılmış Bir Mesaj ID'si Belirtmelisin.`)
  message.channel.fetchMessages({ limit: 1, around: id }).then(messages => {
    const msg = messages.first()
    if (!msg) return message.channel.send(`Silinmiş / bulunamayan mesaj.`)
    let embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setAuthor(msg.author.tag, msg.author.avatarURL)
    .setDescription(`${msg.content}\n\n[[**Mesaja Git**](${msg.url})]`)
    .setFooter(`${message.author.tag} tarafından alıntılandı. | Kanal : #${msg.channel.name}`, message.author.avatarURL)
    message.channel.send(embed)
  })

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['alıntı'],
  permLevel: 0
}

exports.help = {
  name: 'alıntıla',
  description: "ID'sini yazdığınız mesajı alıntılar.",
  usage: 'alıntıla <mesaj id>'
}