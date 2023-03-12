//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\LenovoG580\Documents\ll/dts/HelperLib-master/src/index.d.ts"/> 


const config = new JsonConfigFile('./plugins/chatmanager/config.json');


config.init('banwords', []);
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

config.close();

module.exports = config;