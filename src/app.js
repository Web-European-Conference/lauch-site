var logger = require("./utils/logger");

logger.info("Listening on " + port);

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