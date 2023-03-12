//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\LenovoG580\Documents\ll/dts/HelperLib-master/src/index.d.ts"/> 
const config = require('./config.js');
const muteDB = require('./commands.js');
const autoMod = config.get('auto-mod');
const banwords = config.get('banwordsList');
const radius = config.get('radius');
const globalPrefix = config.get('globalPrefix');
const localPrefix = config.get('localPrefix');
const prefix = config.get('prefix');
const banwordMessage = config.get('banwordMessage');
const globalSymbol = config.get('globalSymbol');
const caps = config.get('capsPercentage');
const capsMessage = config.get('capsMessage');


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
	let isMute = muteDB.get(rname);

	if (isMute) return false;

	if (autoMod['banwords']) {
		let words = msg.split(' ');
		if (words[0][0] === globalSymbol) words[0] = words[0].replace(globalSymbol, '');
		words.every(word => {
			let capsWords;
			let hasCaps;
			if (autoMod['anti-caps']) {
				hasCaps = true;
				if (word.match(/[A-Z]/g) != undefined) {
					capsWords = word.match(/[A-Z]/g);
					
				} else {
					hasCaps = false;
			}
			}

			if (banwords.includes(word.toLowerCase())) {
				player.tell(banwordMessage);
				return false;
			} else if (hasCaps && capsWords.length >= word.length * caps / 100 && autoMod['anti-caps']) {
				player.tell(capsMessage);
				return false;
			}
			else {
				if (msg[0] === globalSymbol) isGlobal = true;
				if (isGlobal) {
					msg = msg.replace(globalSymbol,'');
					sendMsgToChat(1, msg, rname, x, y, z);
				} else {
					prefix ? sendMsgToChat(0, msg, name, x, y, z) : sendMsgToChat(0, msg, rname, x, y, z); // if u use my prefix plugin send player name else player real name
				}
			}
		});
	}
	
	return false;
	
	
})

module.exports = null;