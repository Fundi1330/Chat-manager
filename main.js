const chat = require('./chat.js');
const prefix = require('./prefixes.js');
const bot = require('./bot.js')
const config = require('./config.js');
const logs = require('./logger.js');
const commands = require('./commands.js')

ll.registerPlugin(
	"Chat manager",
	"port of java chat manager plugin",
	[1, 0, 0],
	{'Author': 'Fundi1330'}
);

