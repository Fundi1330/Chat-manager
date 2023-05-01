// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\LenovoG580\Documents\ll/dts/HelperLib-master/src/index.d.ts"/> 

const prefixDB = new KVDatabase('./plugins/chatmanager/prefix');
const config = require('./config.js');
const prefix = config.get('prefix');
const prefixPerm = config.get('prefixPermName');
const changeNoPermMessage = config.get('changeNoPermMessage');
const changePlayerPrefixMessage = config.get('changePlayerPrefixMessage');
const resetNoPermMessage = config.get('resetNoPermMessage');
const resetPlayerPrefixMessage = config.get('resetPlayerPrefixMessage');

mc.listen('onServerStarted', () => {
    if (prefix) {
        let change = mc.newCommand('change', 'add prefix to player');
        let reset = mc.newCommand('reset', 'reset player prefix');

        reset.mandatory('player', ParamType.Player);
        reset.overload(['player']);

        change.mandatory('player', ParamType.Player);
        change.mandatory('prefix', ParamType.String);
        change.mandatory('color', ParamType.String);
        change.overload(['player', 'prefix', 'color']);
        
        reset.setCallback((_change, ori, out, res) => {
            const pl = res.player[0];
            if (res.player != undefined && ori.player.hasTag(prefixPerm)) {
                prefixDB.set(pl.realName, '');
                pl.rename(pl.realName);
                return out.success(resetPlayerPrefixMessage);
            }
            return out.error(resetNoPermMessage);
        });

        change.setCallback((_reset, ori, out, res) => {
            const pl = res.player[0];
            if (res.player != undefined && ori.player.hasTag(prefixPerm)) {
                prefixDB.set(pl.realName, `${res.color}[${res.prefix}]`);
                pl.rename(`${res.color}[${res.prefix}] §r` + pl.realName);
                return out.success(changePlayerPrefixMessage);
            }
            return out.error(changeNoPermMessage);
        });
        reset.setup();
        change.setup();
    }
});

mc.listen('onJoin', (pl) => {
    if (prefix) {
        const prefix = prefixDB.get(pl.realName);
        if (prefix != undefined && pl.name != prefix) {
            pl.rename(`${prefix}§r` + pl.realName)
        }
    }
})

module.exports = prefixDB;