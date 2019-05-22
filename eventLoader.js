const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
};
