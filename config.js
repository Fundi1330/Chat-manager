const config = new JsonConfigFile('./plugins/chatmanager/config.json');

config.init('banwords', []);
config.init('bandowrdMessage', 'your message contains banword');
config.init('radius', 100);
config.init('globalPrefix', '[G]');
config.init('globalSymbol', '!');
config.init('localPrefix', '[L]');
config.init('prefix', true);
config.init('chatBotPrefix', '[ChatBot]');
config.init('chatBotMessage', 'this is chat bot message');
config.init('chatBotTimeBetweenMessages', 300000); // 5 minutes

config.close();

module.exports = config;
