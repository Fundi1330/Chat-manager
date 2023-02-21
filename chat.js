const config = require('./config.js');

const banwords = config.get('banwords');
const radius = config.get('radius');
const globalPrefix = config.get('globalPrefix');
const localPrefix = config.get('localPrefix');
const prefix = config.get('prefix');
const banwordMessage = config.get('bandowrdMessage');
const globalSymbol = config.get('globalSymbol');


function sendMsgToChat(type, msg, name, x, y, z){
	switch(type){
		case 0:
			mc.runcmd(`tellraw @a[x=${x},y=${y},z=${z},r=${radius}] {"rawtext":[{"text":"${localPrefix} ${name} > ${msg}"}]}`);
			break;
		case 1:
			mc.runcmd(`tellraw @a {"rawtext":[{"text":"${globalPrefix} ${name} > ${msg}"}]}`);
			break;
	}
}

mc.listen('onChat', function(player, msg) {
	let name = player.name;
	let rname = player.realName;
	let x = player.pos.x;
	let y = player.pos.y;
	let z = player.pos.z;
    let isGlobal = false;
	
	const words = msg.split();

    words.forEach(word => {
        for(let i = 0; i < words.length; i++) {
            if (!banwords.includes(word)) {
				if (msg[0] === globalSymbol) isGlobal = true;
				if (isGlobal){
					msg = msg.replace(globalSymbol,'');
					sendMsgToChat(1, msg, rname, x, y, z);
				} else {
					prefix ? sendMsgToChat(0, msg, name, x, y, z) : sendMsgToChat(0, msg, rname, x, y, z); // if u use my prefix plugin send player name else player real name
				}
            }
			else {
				player.tell(banwordMessage);
			}
        }
    });
	return false;
	
	
})

module.exports = null;
