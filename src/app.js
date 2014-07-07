var cluster = require('cluster');
var logger;
var _ = require('underscore');

var env = _.find(process.argv.slice(2), function(arg) {
    if (arg.indexOf('env') === 0) {
        return true;
    }
});

GLOBAL.env = (env !== undefined) ? env.substr(4, 3) : 'prod';

// if (GLOBAL.env == 'dev') {
    logger = require("./utils/logger");
    logger.debug("Initializing development configuration.");

    var express = require("express");
    var app = express();

    var expressConfig = require("./config/express");

    logger.info("configuring express....");
    expressConfig.init(app, express);
    logger.info("Express configured");

    var port = Number(process.env.PORT || 5000);

    app.listen(port, function() {
        logger.info("Listening on " + port);
    });

// } else {
//     logger = require("./utils/logger");
//     logger.debug("Initializing production configuration.");
//     if (cluster.isMaster) {
//         var numCPUs = require('os').cpus().length;
//         for (var i = 0; i < numCPUs; i++) {
//             cluster.fork();
//         }

//         Object.keys(cluster.workers).forEach(function(id) {
//             //Getting worker online
//             cluster.workers[id].on('online', function online() {
//                 logger.info("Worker pid: " + cluster.workers[id].process.pid + " is online");
//             });
//         });



//     } else {
//         var express = require("express");
//         var app = express();

//         var expressConfig = require("./config/express");

//         logger.info("configuring express....");
//         expressConfig.init(app, express);
//         logger.info("Express configured");

//         var port = Number(process.env.PORT || 5000);

//         app.listen(port, function() {
//             logger.info("Listening on " + port);
//         });
//     }
// }
