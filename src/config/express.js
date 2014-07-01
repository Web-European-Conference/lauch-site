(function(expressConfig) {

    var logger = require("../utils/logger");

    var path = require('path');

    expressConfig.init = function(app, express) {

	    //setup view engine
	    logger.debug("Setting 'Vash' as view engine");
	    app.set("view engine", "vash");

	    logger.debug("Setting 'Views' folder");
	    var viewsFolder = path.dirname(module.parent.filename) + '/views';
	    app.set('views', viewsFolder);

	    logger.debug("Enabling GZip compression.");
	    var compression = require('compression');
	    app.use(compression({
	      threshold: 512
	    }));

	    logger.debug("Setting 'Public' folder with caching maxAge: 1 Day.");
	    var publicFolder = path.dirname(module.parent.filename)  + "/public";
	    var oneYear = 31557600000;
	    app.use(express.static(publicFolder, { maxAge: oneYear }));

	    logger.debug("Setting parse urlencoded request bodies into req.body.");
	    var bodyParser = require('body-parser');
	    app.use(bodyParser.json());
	    app.use(bodyParser.urlencoded({
		  extended: true
		}));

	    logger.debug("Overriding 'Express' logger");
    	app.use(require('morgan')({ "stream": logger.stream }));

    	require("../controllers/").init(app);
    };

})(module.exports);
