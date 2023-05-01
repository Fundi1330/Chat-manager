// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\LenovoG580\Documents\ll/dts/HelperLib-master/src/index.d.ts"/> 

const config = new JsonConfigFile('./plugins/chatmanager/config.json');

// auto moderation
config.init('auto-mod', {
    'banwords': true,
    'anti-caps': true,
    'messageLenghtLimit': true,
    'anti-spam': true
});
// banwords
config.init('banwordsList', []);
config.init('banwordMessage', 'your message contains banword');
// caps
config.init('capsPercentage', 0.5);
config.init('capsMessage', 'your message have too many caps');
// spam
config.init('spamRate', 5);
config.init('spamPer', 8);
config.init('spamMessage', "Don't spam!")
// message lenght limit
config.init('messageLenghtLimit', 200);
config.init('messageLenght', "Your message lenght is too high!");
// chat
config.init('localMessageRadius', 100);
config.init('globalPrefix', '[G]');
config.init('globalSymbol', '!');
config.init('localPrefix', '[L]');
// prefixes
config.init('prefix', true);
config.init('prefixPermName', 'admin');
config.init('changeNoPermMessage', "You don't have permission for change this player's prefix");
config.init('changePlayerPrefixMessage', 'You succefully added prefix to player');
config.init('resetNoPermMessage', "You don't have permission for reset this player's prefix");
config.init('resetPlayerPrefixMessage', "You succefully removed player's prefix");
// chat bot
config.init('chatBotPrefix', '[ChatBot]');
config.init('chatBotMessage', 'this is chat bot message');
config.init('chatBotTimeBetweenMessages', 300000); // 5 minutes
// logs
config.init('logs', {
    'chat': false,
    'commands': false
});
// commands
config.init('commands', {
    'mute': true
});
config.init('playerMutedMessage', "You've been muted!");
config.init('mutePlayerMessage', 'Succefully muted player!');
config.init('playerUnmutedMessage', "You've been unmuted!");
config.init('unmutePlayerMessage', 'Succefully unmuted player!');

config.close();

module.exports = config;