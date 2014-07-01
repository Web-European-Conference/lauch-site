(function(notifyController) {
    var logger = require('../utils/logger');

    notifyController.init = function(app) {
        app.post('/api/notify/join', function(req, res) {

            req.assert('email', 'Field required').notEmpty();
            req.assert('email', 'Invalid email format').isEmail();

            var errors = req.validationErrors();
            var mappedErrors = req.validationErrors(true);

            if (errors) {
                logger.warn("Wrong request: ", errors);
                res.json(400, errors);
            }

            //here need to implement mail-chimp integration
        });


        app.post('/api/contact/', function(req, res) {

            req.assert('name', 'Field required').notEmpty();
            req.assert('message', 'Field required').notEmpty();
            req.assert('email', 'Field required').notEmpty();
            req.assert('email', 'Invalid email format').isEmail();

            var errors = req.validationErrors();
            var mappedErrors = req.validationErrors(true);

            if (errors) {
                logger.warn("Wrong request: ", errors);
                res.json(400, errors);
            }

            app.mailer.send('email/contact', { //Template (it uses the same engine of express)
                to: 'example@example.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
                subject: 'Test Email', // REQUIRED.
                otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
            }, function(err) {
                if (err) {
                    // handle error
                    console.log(err);
                    res.send('There was an error sending the email');
                    return;
                }
                res.send('Email Sent');
            });

            //here the code to send the email, and response with the right status code and info
        });
    };

})(module.exports);
