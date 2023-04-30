// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\LenovoG580\Documents\ll/dts/HelperLib-master/src/index.d.ts"/> 

const config = require('./config.js');

const mute = config.get('commands');
const playerMutedMessage = config.get('playerMutedMessage');
const mutePlayerMessage = config.get('mutePlayerMessage');
const playerUnmutedMessage = config.get('playerUnmutedMessage');
const unmutePlayerMessage = config.get('unmutePlayerMessage');

const  muteDB = new KVDatabase('./plugins/chatmanager/mutes');

mc.listen('onServerStarted', () => {
    if (mute) {
        const muteCmd = mc.newCommand('mute', 'mute player', PermType.GameMasters);
        const unMuteCmd = mc.newCommand('unmute', 'unmute the player', PermType.GameMasters);

        unMuteCmd.mandatory('player', ParamType.Player);
        unMuteCmd.overload(['player']);
        unMuteCmd.setCallback((_cmd, ori, out, res) => {
            const player = res.player[0];
            if (ori.player == undefined || player == undefined) return out.error('choosen player is not on the server');
            muteDB.set(player.realName, false);
            player.tell(playerUnmutedMessage, 5);
            return out.success(unmutePlayerMessage);
        })

        muteCmd.mandatory('player', ParamType.Player);
        muteCmd.overload(['player']);
        muteCmd.setCallback((_cmd, ori, out, res) => {
            const player = res.player[0];
            if (ori.player == undefined || player == undefined) return out.error('choosen player is not on the server');
            muteDB.set(player.realName, true);
            player.tell(playerMutedMessage, 5);
            return out.success(mutePlayerMessage );
        });
        muteCmd.setup();
        unMuteCmd.setup();
    }
})

module.exports = muteDB;