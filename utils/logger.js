const path = require('path');
const filename = path.join(__dirname, '../../logs/project.log');
const simpleLogger = require('simple-node-logger')

//you can change format according to you
const log = simpleLogger.createSimpleLogger( {
    logFilePath:filename,
    timestampFormat:'YYYY-MM-DD HH:mm:ss'}
);

module.exports = {log};