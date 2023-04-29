//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\LenovoG580\Documents\ll\dts/dts/HelperLib-master/src/index.d.ts"/> 


const config = new JsonConfigFile('./plugins/chatmanager/config.json');

config.init('auto-mod', {
    'banwords': true,
    'anti-caps': true
})
config.init('banwordsList', []);
config.init('banwordMessage', 'your message contains banword');
config.init('capsPercentage', 50);
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
config.init('playerMutedMessage', "You've been muted!");
config.init('mutePlayerMessage', 'Succefully muted player!');
config.init('playerUnmutedMessage', "You've been unmuted!");
config.init('unmutePlayerMessage', 'Succefully unmuted player!');

config.close();

module.exports = config;