//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\LenovoG580\Documents\ll/dts/HelperLib-master/src/index.d.ts"/> 

ll.registerPlugin(
    /* name */ "nicknames",
    /* introduction */ "plugin for change nicknames",
    /* version */ [0,0,1],
    /* otherInformation */ {}
); 


mc.listen('onServerStarted', () => {
    let cmd = mc.newCommand('change', 'change player nickname(add prefix)');
    cmd.mandatory('player', ParamType.Player);
    cmd.mandatory('prefix', ParamType.String);
    cmd.mandatory('color', ParamType.String);
    cmd.mandatory('reset', ParamType.Bool, 'Reset');
    cmd.overload(['player', 'reset', 'prefix', 'color']);
    
    cmd.setCallback((_cmd, ori, out, res) => {
        const pl = res.player[0];
        if (res.player != undefined && ori.player.hasTag('king')) {
            pl.rename(`${res.color}[${res.prefix}] §r` + pl.realName);
            return out.success('You succefully added prefix to player');
        }
        return out.error("You don't have permission for this");
    });

    cmd.setup();
});

