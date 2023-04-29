//LiteLoaderScript Dev Helper
/// <reference path="c:\Users\LenovoG580\Documents\ll\dts/dts/HelperLib-master/src/index.d.ts"/> 

const config = require('./config.js');
const prefixDB = require('./prefixes.js');

const fs = require('fs');

const logs = config.get('logs')['chat'];
const commands = config.get('logs')['commands'];

const path = './plugins/chatmanager/logs/';


let chat_file;
let command_file;

mc.listen('onServerStarted', () => {
    if (logs) {
        File.mkdir(path);
        const chat_path = `${path}chat-latest.txt`;
        const command_path = `${path}command-latest.txt`;
        chat_file = fs.createWriteStream(chat_path);
        command_file = fs.createWriteStream(command_path);
        chat_file.write('Server started!\n');
        command_file.write('Server started!\n');
        log('Log files created succefully!');
    }
    
});

mc.listen('onChat', (pl, msg) => {
    if (logs) {
        let prefix = prefixDB.get(pl.realName);
        let text;
        if (prefix == '' || prefix == ' ' || prefix == undefined) {
            text = `${pl.realName} > ${msg}\n`;
        } else {
            text = `[${prefix}]${pl.realName} > ${msg}\n`
        }
        chat_file.write(text);
    }
});

mc.listen('onPlayerCmd', (pl, cmd) => {
    if (commands) {
        const text = `${pl.realName} > /${cmd}\n`;
        command_file.write(text);
    }
});

module.exports = null;