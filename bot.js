const config = require('./config.js');

const chatBotMessage = config.get('chatBotMessage');
const chatBotTimeBetweenMessages = config.get('chatBotTimeBetweenMessages');
const chatBotPrefix = config.get('chatBotPrefix');

interval = setInterval(() => {
    mc.broadcast(`${chatBotPrefix} > ${chatBotMessage}`);
}, chatBotTimeBetweenMessages);

module.exports = null;