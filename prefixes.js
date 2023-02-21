
const db = new KVDatabase('./plugins/prefix');

mc.listen('onServerStarted', () => {
    let cmd = mc.newCommand('change', 'add prefix to player');
    let reset = mc.newCommand('reset', 'reset player prefix');

    reset.mandatory('player', ParamType.Player);
    reset.overload(['player']);

    cmd.mandatory('player', ParamType.Player);
    cmd.mandatory('prefix', ParamType.String);
    cmd.mandatory('color', ParamType.String);
    cmd.overload(['player', 'prefix', 'color']);
    
    reset.setCallback((_cmd, ori, out, res) => {
        const pl = res.player[0];
        if (res.player != undefined && ori.player.hasTag('king')) {
            db.set(pl.realName, '');
            pl.rename(pl.realName);
            return out.success('You succefully removed player prefix');
        }
        return out.error("You don't have permission for this");
    });

    cmd.setCallback((_cmd, ori, out, res) => {
        const pl = res.player[0];
        if (res.player != undefined && ori.player.hasTag('king')) {
            db.set(pl.realName, `${res.color}[${res.prefix}]`);
            pl.rename(`${res.color}[${res.prefix}] §r` + pl.realName);
            return out.success('You succefully added prefix to player');
        }
        return out.error("You don't have permission for this");
    });
    reset.setup();
    cmd.setup();
});

mc.listen('onJoin', (pl) => {
    const prefix = db.get(pl.realName);
    if (prefix != undefined && pl.name != prefix) {
        pl.rename(`${prefix} §r` + pl.realName)
    }
})

module.exports = null;
