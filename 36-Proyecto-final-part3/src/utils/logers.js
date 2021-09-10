const log4js = require("log4js");
log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerWarn: { type: 'file', filename: './logs/warn.log' },
    miLoggerError: { type: 'file', filename: './logs/error.log' },

  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "trace" },
    consola: { appenders: ["miLoggerConsole"], level: "info" },
    fileWarn: { appenders: ["miLoggerWarn", "miLoggerConsole"], level: "warn" },
    fileError: { appenders: ["miLoggerError", "miLoggerConsole"], level: "error" },
  }
});
const loggerConsola = log4js.getLogger('consola');
const loggerWarn = log4js.getLogger('fileWarn');
const loggerError = log4js.getLogger('fileError');

module.exports={loggerConsola,loggerWarn,loggerError}