// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\LenovoG580\Documents\ll/dts/HelperLib-master/src/index.d.ts"/> 

const config = new JsonConfigFile('./plugins/chatmanager/config.json');

config.init('auto-mod', {
    'banwords': true,
    'anti-caps': true,
    'messageLenghtLimit': true,
    'anti-spam': true
})
config.init('banwordsList', []);
config.init('banwordMessage', 'your message contains banword');
config.init('capsPercentage', 0.5);
config.init('spamRate', 5);
config.init('spamPer', 8);
config.init('capsMessage', 'your message have too many caps');
config.init('radius', 100);
config.init('globalPrefix', '[G]');
config.init('globalSymbol', '!');
config.init('localPrefix', '[L]');
config.init('prefix', true);
config.init('chatBotPrefix', '[ChatBot]');
config.init('chatBotMessage', 'this is chat bot message');
config.init('chatBotTimeBetweenMessages', 300000); // 5 minutes
config.init('logs', {
    'chat': false,
    'commands': false
});
config.init('commands', {
    'mute': true
});
config.init('messageLenghtLimit', 200);
config.init('playerMutedMessage', "You've been muted!");
config.init('mutePlayerMessage', 'Succefully muted player!');
config.init('playerUnmutedMessage', "You've been unmuted!");
config.init('unmutePlayerMessage', 'Succefully unmuted player!');
config.init('messageLenght', "Your message lenght is too high!");
config.init('spamMessage', "Don't spam!")

config.close();

module.exports = config;