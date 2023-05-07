// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\LenovoG580\Documents\ll/dts/HelperLib-master/src/index.d.ts"/> 

const config = require('./config.js');
const muteDB = require('./commands.js');
const autoMod = config.get('auto-mod');
const banwords = config.get('banwordsList');
const radius = config.get('localMessageRadius');
const globalPrefix = config.get('globalPrefix');
const localPrefix = config.get('localPrefix');
const prefix = config.get('prefix');
const banwordMessage = config.get('banwordMessage');
const globalSymbol = config.get('globalSymbol');
const caps = config.get('capsPercentage');
const capsMessage = config.get('capsMessage');
const lenghtMessage = config.get('messageLenght');
const messageLenght = config.get('messageLenghtLimit');
const rate = config.get('spamRate');
const spamMessage = config.get('spamMessage');
const muteTime = config.get('muteTime');
const playerUnmutedMessage = config.get('playerUnmutedMessage');
const autoMuteMessage = config.get('autoMuteMessage');

const spamDatabase = new KVDatabase('./plugins/chatmanager/spam');

function sendMsgToChat(type, msg, name, x, y, z) {
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
	let hasBanwords = false;
	let hasCaps = false;
	let hasSpam = false;
	let normalLenght = false;
	
	let words = msg.split(' ');
	if (words[0][0] === globalSymbol) words[0] = words[0].replace(globalSymbol, '');

	if (isMute) return false;

	if (autoMod['messageLenghtLimit']) {
		if (msg.length >= messageLenght) {
			player.tell(lenghtMessage);
			normalLenght = true;
			return false;
		}
	}

	if (autoMod['anti-spam']) {
		
        if (spamDatabase.get(player.realName) == undefined || spamDatabase.get(player.realName) == '' || spamDatabase.get(player.realName) == ' ' 
		|| spamDatabase.get(player.realName) == null || typeof spamDatabase.get(player.realName) == 'number' || 
		spamDatabase.get(player.realName) == []) {
			let getPl = spamDatabase.get(player.realName);
			spamDatabase.set(player.realName, getPl.concat(msg));
        }
		if (spamDatabase.get(player.realName).includes(msg)) {
			let getPl = spamDatabase.get(player.realName);
			spamDatabase.set(player.realName, getPl.concat(msg));
		}
		if (spamDatabase.get(player.realName).length >= rate) {
			player.tell(spamMessage);
			hasSpam = true;
			spamDatabase.set(player.realName, []);
			muteDB.set(player.realName, true);
			player.tell(autoMuteMessage, 5);
			setTimeout(() => {
				muteDB.set(player.realName, false);
				player.tell(playerUnmutedMessage, 5);
			}, muteTime);
			return false;
		}
	}

	if (autoMod['banwords']) {
		for (const word of words) {
			if (banwords.includes(word.toLowerCase())) {
				player.tell(banwordMessage);
				hasBanwords = true;
				return false;
			}
		}
	}
	if (autoMod['anti-caps']) {
		let capsWords = 0;
		let isCapsMsg = false;
		if (msg.match(/[A-Z]/g) != undefined) {
			isCapsMsg = true;
			capsWords += msg.match(/[A-Z]/g).length;
		} if (msg.match(/[А-ЯҐЄІЇ]/g) != undefined) {
			isCapsMsg = true;
			capsWords += msg.match(/[А-ЯҐЄІЇ]/g).length;
		} if (msg.match(/[А-Я]/g) != undefined) {
			isCapsMsg = true;
			capsWords += msg.match(/[А-Я]/g).length;
		}
		if (isCapsMsg && (capsWords / msg.replace(/\s/g, '').length) >= caps ) {
			player.tell(capsMessage);
			hasCaps = true;
			return false;
		}
	}

	if(!hasBanwords && !hasCaps && !normalLenght) {
		if (msg[0] === globalSymbol) isGlobal = true;
		if (isGlobal) {
			msg = msg.replace(globalSymbol,'');
			sendMsgToChat(1, msg, rname, x, y, z);
		} else {
			prefix ? sendMsgToChat(0, msg, name, x, y, z) : sendMsgToChat(0, msg, rname, x, y, z); // if u use my prefix plugin send player name else player real name
		}
	}
	
	return false;
	
	
})

module.exports = null;