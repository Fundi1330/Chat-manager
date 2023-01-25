const radius = 100; //Radius of local message (in blocks)
const globalPrefix = '[G]'; //Global message prefix
const localPrefix = '[L]'; //Local message prefix

const prefix = true; // prefix plugin


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
	const name = player.name;
	const rname = player.realName;
	const x = player.pos.x;
	const y = player.pos.y;
	const z = player.pos.z;
        let isGlobal = false; 
	const globalSymbol = '!';
	if (msg[0] === globalSymbol) isGlobal = true;
	if (isGlobal){
		msg = msg.replace(globalSymbol,'');
		sendMsgToChat(1, msg, rname, x, y, z);
		return false;
	} else {
		prefix ? sendMsgToChat(0, msg, name, x, y, z) : sendMsgToChat(0, msg, rname, x, y, z); // if u use my prefix plugin send player name else player real name
		return false;
	}
})
