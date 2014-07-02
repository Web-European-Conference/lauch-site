var winston = require("winston");

winston.emitErrs = true;

if(GLOBAL.env != 'dev')
{
  var logger = new winston.Logger({
      transports: [
          new winston.transports.File({
              level: 'info',
              filename: './public/logs/all-logs.log',
              handleExceptions: true,
              json: true,
              maxsize: 5242880, //5MB
              maxFiles: 5,
              colorize: false
          })
      ],
      exitOnError: false
  });
} else{
  var logger = new winston.Logger({
      transports: [
          new winston.transports.Console({
              level: 'error',
              handleExceptions: false,
              json: false,
              colorize: true
          }),

      ],
      exitOnError: false
  });
}

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};